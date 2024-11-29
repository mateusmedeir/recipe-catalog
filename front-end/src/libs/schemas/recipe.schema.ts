import { z } from "zod";
import { RecipeDifficulty } from "@/libs/enums/recipe-difficulty.enum";

const RecipeSchema = z.object({
  name: z.string().min(3).max(80),
  ingredients: z
    .array(z.object({ ingredient: z.string().min(3).max(80) }))
    .min(1)
    .max(30),
  instructions: z
    .array(z.object({ instruction: z.string().min(3).max(200) }))
    .min(1)
    .max(30),
  preparationTime: z.coerce.number().int().min(1).max(180),
  difficulty: z.enum(Object.values(RecipeDifficulty) as [string, ...string[]]),
});

type RecipeData = z.infer<typeof RecipeSchema>;

export { RecipeSchema, type RecipeData };