"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      otp,
      redirect: false,
    });

    if (!result || result.error) {
      if (result?.error === "locked") {
        setError("Too many failed attempts. Try again later.");
      } else if (result?.error === "unauthorized") {
        setError("Access from this network is not allowed.");
      } else {
        setError("Invalid login details. Please try again.");
      }
      setSubmitting(false);
      return;
    }

    router.push("/admin/verified");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Admin email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15"
        />
      </div>
      <div>
        <label htmlFor="otp" className="text-sm font-medium text-slate-700">
          One-time code (if MFA enabled)
        </label>
        <input
          id="otp"
          name="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/15"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[var(--button-primary)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--button-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
