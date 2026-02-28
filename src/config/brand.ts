export const brandConfig = {
  name: "Catchy",
  consultationFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdtpBZZwqVZaVVfXAB8q7rQyS_REfPDDbEsTO_Qy2_Ue2xJnQ/viewform?usp=send_form",
  colors: {
    primary: "#7C3AED",
    secondary: "#A855F7",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    soft: "#F7F7F8",
  },
  links: {
    instagram: "https://instagram.com/catchy_is_growth",
    x: "https://x.com/catchy_is_growth",
    tiktok: "https://www.tiktok.com/@catchy_is_growth",
    googleForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSckpsXtAGwJNRMtZBaj37QTWH91qx2W78ag3hulvgGO_AdFqA/viewform",
    whatsapp:
      "https://api.whatsapp.com/send/?phone=2349035789425&text&type=phone_number&app_absent=0",
  },
} as const;

export interface Service {
  name: string;
  description: string;
  highlight?: boolean;
}

export const services: Service[] = [
  {
    name: "Catchy Verification",
    description:
      "Featured trust-building service combining on-site storytelling and credibility positioning to help customers trust your brand faster.",
  },
  {
    name: "Growth Strategy",
    description:
      "Market positioning, growth planning, and channel prioritization built around measurable outcomes.",
  },
  {
    name: "Brand & Creative",
    description:
      "Brand systems, campaign concepts, and conversion-focused creative assets for digital channels.",
  },
  {
    name: "Performance Marketing",
    description:
      "Paid media strategy, creative testing, and optimization across high-intent acquisition channels.",
  },
  {
    name: "Web & Product",
    description:
      "Website and product experience improvements that strengthen trust and increase conversion rates.",
  },
  {
    name: "Content & Social",
    description:
      "Editorial planning, production systems, and social execution to keep brand visibility consistent.",
  },
  {
    name: "Partnerships / PR",
    description:
      "Partnership strategy, media outreach, and collaboration programs that expand authority and reach.",
  },
];
