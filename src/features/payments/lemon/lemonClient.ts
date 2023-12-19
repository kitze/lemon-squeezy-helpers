import LemonSqueezy from "@lemonsqueezy/lemonsqueezy.js";
import { env } from "@/env.mjs";

export const lemonClient = new LemonSqueezy(env.LEMONSQUEEZY_API_KEY);
