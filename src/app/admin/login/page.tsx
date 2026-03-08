import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { redirectIfAuthenticated } from "@/app/admin/actions";

export default async function AdminLoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
          Admin Access
        </p>
        <h1 className="heading-gradient mt-3 text-2xl font-bold tracking-tight">
          Verified Businesses Admin
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Sign in to manage Catchy verified business profiles and internal reviews.
        </p>
        <AdminLoginForm />
      </section>
    </div>
  );
}
