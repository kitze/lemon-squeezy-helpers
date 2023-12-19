import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetLemonSqueezyVariant = z.object({
  id: z.string().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(resolver.zod(GetLemonSqueezyVariant), resolver.authorize("ADMIN"), async ({ id }) => {
  const lemonSqueezyVariant = await db.lemonSqueezyVariant.findFirst({
    where: { id },
  });

  if (!lemonSqueezyVariant) throw new NotFoundError();

  return lemonSqueezyVariant;
});
