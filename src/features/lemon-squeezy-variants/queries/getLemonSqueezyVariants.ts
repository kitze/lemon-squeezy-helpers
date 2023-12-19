import { resolver } from "@blitzjs/rpc";
import db from "db";

export default resolver.pipe(resolver.authorize("ADMIN"), async ({}) => {
  return db.lemonSqueezyVariant.findMany({
    where: {},
    include: {
      product: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          subscriptions: true,
        },
      },
    },
  });
});
