import { NextApiRequest } from "next";
import crypto from "crypto";
import { env } from "@/env.mjs";

export const validateLemonSqueezyHook = async ({
  req,
  rawBody,
}: {
  req: NextApiRequest;
  rawBody: any;
}): Promise<boolean> => {
  try {
    const hmac = crypto.createHmac("sha256", env.LEMONSQUEEZY_WEBHOOK_SECRET);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers["x-signature"] as string, "utf8");

    let validated = crypto.timingSafeEqual(digest, signature);
    return validated;
  } catch (err) {
    console.log("err", err);
    return false;
  }

  return false;
};
