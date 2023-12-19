import db from "~/db";
import { storePrismaJson } from "@/utils/utils";

export const onSubscriptionPaymentSuccess = async ({ event }) => {
  const { data } = event;
  let subscriptionId = data.attributes.subscription_id.toString();

  await db.lemonSqueezyPayment.create({
    data: {
      paymentId: data.id,
      attributes: storePrismaJson(data.attributes),
      subscription: {
        connect: {
          subscriptionId,
        },
      },
    },
  });

  return true;
};
