import { env } from "@/env.mjs";

export const paymentPlans = [
  {
    variantId: env.NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_PLAN_VARIANT_ID,
    name: "Monthly",
    price: 9.99,
    description: "per month",
  },
  {
    variantId: env.NEXT_PUBLIC_LEMONSQUEEZY_ANNUAL_PLAN_VARIANT_ID,
    name: "Annual",
    price: 99.99,
    description: "per year",
  },
  {
    variantId: env.NEXT_PUBLIC_LEMONSQUEEZY_LIFETIME_PLAN_VARIANT_ID,
    name: "Lifetime",
    price: 299.99,
    description: "one time",
  },
];
