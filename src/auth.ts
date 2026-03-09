import { compare } from "bcryptjs";
import NextAuth, { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifySync } from "otplib";
import { appendAdminAuditLog } from "@/lib/admin-audit-log";
import {
  isAdminIpAllowed,
  parseAdminIpAllowlist,
  resolveRequestIpFromMap,
} from "@/lib/admin-ip";
import {
  clearLoginAttempts,
  getLoginLockStatus,
  registerFailedLoginAttempt,
} from "@/lib/admin-login-rate-limit";
import { findAdminUserByEmail } from "@/lib/admin-users";

if (process.env.NODE_ENV === "production" && !process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is required in production.");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "One-time code", type: "text" },
      },
      authorize: async (credentials, req) => {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        const otp = String(credentials?.otp ?? "").trim();
        const ip = resolveRequestIpFromMap(req.headers ?? {});
        const allowlist = parseAdminIpAllowlist();

        if (!isAdminIpAllowed(ip, allowlist)) {
          await appendAdminAuditLog({
            actor_email: email || "unknown",
            action: "admin_login_failed",
            details: `Blocked by IP allowlist from IP ${ip}`,
          });
          throw new Error("unauthorized");
        }

        const lockStatus = await getLoginLockStatus(ip, email);
        if (lockStatus.locked) {
          throw new Error("locked");
        }

        if (!email || !password) {
          await registerFailedLoginAttempt(ip, email);
          await appendAdminAuditLog({
            actor_email: email || "unknown",
            action: "admin_login_failed",
            details: `Missing credentials from IP ${ip}`,
          });
          return null;
        }

        const user = findAdminUserByEmail(email);
        if (!user) {
          await registerFailedLoginAttempt(ip, email);
          await appendAdminAuditLog({
            actor_email: email,
            action: "admin_login_failed",
            details: `Unknown account from IP ${ip}`,
          });
          return null;
        }

        const passwordMatches = await compare(password, user.passwordHash);
        if (!passwordMatches) {
          await registerFailedLoginAttempt(ip, email);
          await appendAdminAuditLog({
            actor_email: email,
            action: "admin_login_failed",
            details: `Invalid password from IP ${ip}`,
          });
          return null;
        }

        const mfaEnabled = Boolean(user.totpSecret);
        if (
          mfaEnabled &&
          (!otp ||
            !verifySync({
              strategy: "totp",
              token: otp,
              secret: user.totpSecret!,
            }))
        ) {
          await registerFailedLoginAttempt(ip, email);
          await appendAdminAuditLog({
            actor_email: email,
            action: "admin_login_failed",
            details: `Invalid MFA token from IP ${ip}`,
          });
          return null;
        }

        await clearLoginAttempts(ip, email);
        await appendAdminAuditLog({
          actor_email: email,
          action: "admin_login",
          details: `Successful login from IP ${ip}`,
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          mfaEnabled,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
        token.mfaEnabled = Boolean((user as { mfaEnabled?: boolean }).mfaEnabled);
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.role = (token.role as string | undefined) ?? "admin";
        session.user.mfaEnabled = Boolean(token.mfaEnabled);
      }
      return session;
    },
  },
};

export const authHandler = NextAuth(authOptions);

export async function auth() {
  return getServerSession(authOptions);
}
