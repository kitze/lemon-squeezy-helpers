import { z } from "zod";

export const CreateLemonSqueezyProductSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateLemonSqueezyProductSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
});

export const DeleteLemonSqueezyProductSchema = z.object({
  id: z.number(),
});
