import { permanentRedirect } from "next/navigation";

export default function CatchyVerificationLegacyRedirectPage() {
  permanentRedirect("/catchy-verification");
}
