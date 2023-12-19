import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetLemonSqueezyProduct = z.object({
  id: z.string().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(resolver.zod(GetLemonSqueezyProduct), resolver.authorize("ADMIN"), async ({ id }) => {
  const lemonSqueezyProduct = await db.lemonSqueezyProduct.findFirst({
    where: { id },
  });

  if (!lemonSqueezyProduct) throw new NotFoundError();

  return lemonSqueezyProduct;
});
