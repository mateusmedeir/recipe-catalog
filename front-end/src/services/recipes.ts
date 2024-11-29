import { RecipeDifficulty } from "@/enums/recipe-difficulty.enum";
import { IRecipe } from "@/interfaces/recipe.interface";
import api from "@/services/api";

async function getRecipes(params: URLSearchParams): Promise<{ data: IRecipe[]; total: number }> {
  if (!params.has("page")) params.set("page", "1");
  if (!params.has("per_page")) params.set("per_page", "10");

  const response = await api.get(`/recipes?${params.toString()}`);

  return response.data;
}

async function deleteRecipe(id: string): Promise<void> {
  await api.delete(`/recipes/${id}`);
}

const getRecipeDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case RecipeDifficulty.EASY:
      return "Fácil";
    case RecipeDifficulty.MEDIUM:
      return "Médio";
    case RecipeDifficulty.HARD:
      return "Difícil";
    default:
      return "";
  }
};

export { getRecipes, deleteRecipe, getRecipeDifficulty };
