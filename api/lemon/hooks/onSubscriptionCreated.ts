import db from "~/db";
import { storePrismaJson } from "@/utils/utils";
import { LemonSqueezySubscriptionStatus } from "@prisma/client";
import { getUserIdFromLemonSqueezyEvent } from "@/pages/api/lemon/utils";

export const onSubscriptionCreated = async ({ event }) => {
  console.log("event", event);

  const userId = await getUserIdFromLemonSqueezyEvent({ event });

  const { data } = event;
  const { product_id, variant_id } = data.attributes;

  await db.lemonSqueezySubscription.create({
    data: {
      subscriptionId: event.data.id,
      product: {
        connect: {
          productId: product_id.toString(),
        },
      },
      variant: {
        connect: {
          variantId: variant_id.toString(),
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      attributes: storePrismaJson(data.attributes),
      status: data.attributes.status as LemonSqueezySubscriptionStatus,
    },
  });

  return true;
};
