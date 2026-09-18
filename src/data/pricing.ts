// Every price and package definition. Plain TypeScript with no Astro imports,
// so a future proposal generator can reuse it. Pages format these with
// `money` — never type a price anywhere else. One price list for every country.

import { packageChoices } from "./studio";

export type PackageId = (typeof packageChoices)[number];

export interface PackageDef {
  id: PackageId;
  name: string;
  deliveryDays: number | null; // null = agreed per project
  price: number | null; // null = on request
  includes: string[]; // only what sets this package apart
}

export const currency = "EUR";
export const vatIncluded = false;

export const money = (amount: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    useGrouping: "always",
  }).format(amount);

// The domain is registered in the client's name and the client pays the
// registrar directly. Only an upper bound for the copy, not something I bill.
export const domainFeeTypicalMax = 20;

// Shown once under the package cards, for all of them.
export const allPackages = {
  includes: [
    "Contact form",
    "Linked to your Google Business Profile",
    "Set up to be found on Google",
    "Legally required business details and a privacy notice",
  ],
  excludes: [
    "Professional photography",
    "Logo design",
    "Email addresses, like info@yourbusiness.be",
    `The domain's yearly fee, usually under ${money(domainFeeTypicalMax)}, which you pay directly`,
  ],
};

export const packages: PackageDef[] = [
  {
    id: "launch",
    name: "Launch",
    deliveryDays: 7,
    price: 990,
    includes: ["One page", "One language"],
  },
  {
    id: "business",
    name: "Business",
    deliveryDays: 10,
    price: 1490,
    includes: [
      "Up to five pages",
      "Up to three languages",
      "Menu or price list as a real web page, easy to read on a phone (not a PDF)",
      "Booking button connected to the booking service you already use",
      "Visitor statistics without cookies",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    deliveryDays: null,
    price: null,
    includes: [
      "Online ordering",
      "A booking system built for your business",
      "Connections to the tools you already use",
    ],
  },
];

export const extras = { language: 190, page: 150 };

export const carePlan = {
  monthly: 49,
  minimumMonths: 12,
  noticeMonths: 1,
  includedChangeMinutes: 30,
};

export const paymentTerms = { depositPercent: 50, onLaunchPercent: 50 };
