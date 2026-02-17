"use client";

import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  business: string;
  message: string;
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>(
    {}
  );
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setShowToast(true);
    setValues({ name: "", email: "", business: "", message: "" });
    setErrors({});
    window.setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="space-y-4">
      {showToast ? (
        <p
          role="status"
          className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          Thanks, your message has been sent. We will reply shortly.
        </p>
      ) : null}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="business"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Business
          </label>
          <input
            id="business"
            name="business"
            value={values.business}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, business: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, message: event.target.value }))
            }
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          {errors.message ? (
            <p className="mt-1 text-xs text-red-600">{errors.message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="inline-flex rounded-full bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-accent-strong)]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
