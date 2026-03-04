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
          className="rounded-xl bg-emerald-50 px-4 py-3 text-base font-medium text-emerald-700"
        >
          Thanks, your message has been sent. We will reply shortly.
        </p>
      ) : null}
      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Name *
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
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
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="business"
            className="mb-1.5 block text-sm font-medium text-slate-700"
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
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-slate-700"
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
            className="min-h-[140px] w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
          {errors.message ? (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-purple-600 px-6 text-base font-medium text-white transition hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 sm:w-auto"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
