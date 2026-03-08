"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteVerifiedBusinessAction } from "@/app/admin/actions";

type DeleteVerifiedBusinessButtonProps = {
  businessId: string;
  businessName: string;
  className?: string;
};

export function DeleteVerifiedBusinessButton({
  businessId,
  businessName,
  className,
}: DeleteVerifiedBusinessButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (deleting) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this verified business?"
    );
    if (!confirmed) {
      return;
    }

    const confirmationText = window.prompt(
      `Type "${businessName}" to confirm permanent deletion.`
    );
    if (confirmationText !== businessName) {
      setError("Deletion cancelled. Confirmation text did not match.");
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await deleteVerifiedBusinessAction(businessId);

      router.push("/admin/verified?deleted=1");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete business.");
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className={
          className ??
          "inline-flex h-9 items-center justify-center rounded-lg border border-rose-300 bg-rose-50 px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
      {error ? <p className="text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
