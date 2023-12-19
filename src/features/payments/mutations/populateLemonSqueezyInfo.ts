import { resolver } from "@blitzjs/rpc";
import db from "../../../../db";
import { storePrismaJson } from "@/utils/utils";
import { lemonClient } from "@/features/payments/lemon/lemonClient";
import { env } from "@/env.mjs";

export default resolver.pipe(resolver.authorize("ADMIN"), async () => {
  const products = await lemonClient.getProducts({
    storeId: env.LEMONSQUEEZY_STORE_ID,
  });

  const variants = await lemonClient.getVariants({});

  try {
    for (const product of products.data) {
      let createAndUpdate = {
        name: product.attributes.name,
        attributes: storePrismaJson(product.attributes),
      };

      await db.lemonSqueezyProduct.upsert({
        where: {
          productId: product.id.toString(),
        },
        create: {
          productId: product.id.toString(),
          ...createAndUpdate,
        },
        update: createAndUpdate,
      });
    }

    for (const variant of variants.data) {
      try {
        let variantId = variant.id;

        const { attributes } = variant;
        const { name, price, product_id } = attributes;

        let productId = product_id;

        let createAndUpdate = {
          name,
          price,
          attributes: storePrismaJson(attributes),
        };

        await db.lemonSqueezyVariant.upsert({
          where: {
            variantId: variantId.toString(),
          },
          create: {
            variantId: variantId.toString(),
            product: {
              connect: {
                productId: productId.toString(),
              },
            },
            ...createAndUpdate,
          },
          update: createAndUpdate,
        });
      } catch (err) {
        console.log("err", err);
      }
    }
  } catch (err) {
    console.log("err", err);
  }

  return true;
});
