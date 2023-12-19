import db from "~/db";
import { storePrismaJson } from "@/utils/utils";
import { LemonSqueezySubscriptionStatus } from "@prisma/client";

export const onSubscriptionUpdated = async ({ event }) => {
  const { data } = event;

  try {
    await db.lemonSqueezySubscription.update({
      where: {
        subscriptionId: event.data.id,
      },
      data: {
        attributes: storePrismaJson(data.attributes),
        status: data.attributes.status as LemonSqueezySubscriptionStatus,
      },
    });
  } catch (err) {
    console.log("err", err);
  }

  return true;
};
