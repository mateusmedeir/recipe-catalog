import { RecipeDifficulty } from "@/enums/recipe-difficulty.enum";

export interface IRecipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  preparationTime: number;
  difficulty: RecipeDifficulty;
}
