import { z } from "zod";

export const CreateLemonSqueezyVariantSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateLemonSqueezyVariantSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
});

export const DeleteLemonSqueezyVariantSchema = z.object({
  id: z.number(),
});
