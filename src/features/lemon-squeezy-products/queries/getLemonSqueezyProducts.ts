import { resolver } from "@blitzjs/rpc";
import db from "db";

export default resolver.pipe(resolver.authorize("ADMIN"), async ({}) => {
  return db.lemonSqueezyProduct.findMany({
    include: {
      _count: {
        select: {
          variants: true,
          subscriptions: true,
        },
      },
    },
  });
});
