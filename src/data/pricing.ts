// Every price and package definition. Plain TypeScript with no Astro imports,
// so a future proposal generator can reuse it. Pages format these with
// `money` — never type a price anywhere else. One price list for every country.
// The words describing each package are in the dictionaries (src/i18n).

import { packageChoices } from "./studio";
import { intlLocale, type Locale } from "../i18n/locales";

export type PackageId = (typeof packageChoices)[number];

export interface PackageDef {
  id: PackageId;
  name: string;
  deliveryDays: number | null; // null = agreed per project
  price: number | null; // null = on request
  from?: boolean; // price is a starting point, not the whole job
  plus?: PackageId; // shown as "Everything in <that package>, plus:"
}

export const currency = "EUR";
export const vatIncluded = false;

// French groups digits with a narrow no-break space, which the trimmed fonts
// leave out (scripts/fonts.sh); the plain no-break space is in them.
const format = (value: number, lang: Locale, options: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(intlLocale[lang], options).format(value).replaceAll("\u202f", "\u00a0");

export const money = (amount: number, lang: Locale) =>
  format(amount, lang, { style: "currency", currency, maximumFractionDigits: 0, useGrouping: "always" });

export const percent = (value: number, lang: Locale) =>
  format(value / 100, lang, { style: "percent" });

// The domain is registered in the client's name and the client pays the
// registrar directly. Only an upper bound for the copy, not something I bill.
export const domainFeeTypicalMax = 20;

export const packages: PackageDef[] = [
  {
    id: "launch",
    name: "Launch",
    deliveryDays: 10,
    price: 990,
  },
  {
    id: "presence",
    name: "Presence",
    deliveryDays: 15,
    price: 1690,
  },
  {
    id: "business",
    name: "Business",
    deliveryDays: 20,
    price: 2490,
    plus: "presence",
  },
  {
    id: "custom",
    name: "Custom",
    deliveryDays: null,
    price: 3500,
    from: true,
    plus: "business",
  },
];

export const extras = { language: 290, page: 150 };

export const carePlan = {
  monthly: 79,
  minimumMonths: 12,
  noticeMonths: 1,
  includedChangeMinutes: 30,
};

export const paymentTerms = { depositPercent: 50, onLaunchPercent: 50 };
