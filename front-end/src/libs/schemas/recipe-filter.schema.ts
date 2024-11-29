import { z } from "zod";
import { RecipeDifficulty } from "@/libs/enums/recipe-difficulty.enum";

const RecipeFilterSchema = z.object({
    difficulty: z.enum(["Todos", ...Object.values(RecipeDifficulty)] as [
      string,
      ...string[]
    ]),
  });

  type RecipeFilterData = z.infer<typeof RecipeFilterSchema>;

  export { RecipeFilterSchema, type RecipeFilterData };