import db from "~/db";
import { storePrismaJson } from "@/utils/utils";

export const onOrderRefunded = async ({ event }) => {
  const foundOrder = await db.lemonSqueezyOrder.findFirst({
    where: {
      orderId: event.data.attributes.order_number.toString(),
    },
  });

  if (!foundOrder) {
    throw new Error("Order not found");
  }

  const updateOrder = db.lemonSqueezyOrder.update({
    where: {
      id: foundOrder.id,
    },
    data: {
      refunded: true,
      attributes: storePrismaJson(event.data.attributes),
    },
  });

  const updateUser = db.user.update({
    where: {
      id: foundOrder.userId,
    },
    data: {
      hasLifetimeAccess: false,
    },
  });

  return db.$transaction([updateOrder, updateUser]);
};
