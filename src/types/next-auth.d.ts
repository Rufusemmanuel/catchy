import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      mfaEnabled?: boolean;
    };
  }

  interface User {
    role?: string;
    mfaEnabled?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    mfaEnabled?: boolean;
  }
}
