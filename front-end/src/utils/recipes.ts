import { RecipeDifficulty } from "@/enums/recipe-difficulty.enum";
import { IRecipe } from "@/interfaces/recipe.interface";
import api from "@/services/api";

interface getRecipesProps {
  params: URLSearchParams;
}

async function getRecipes({
  params,
}: getRecipesProps): Promise<{ data: IRecipe[]; total: number }> {
  if (!params.has("page")) params.set("page", "1");
  if (!params.has("per_page"))
    params.set("per_page", "10");

  const response = await api.get(`/recipes?${params.toString()}`);

  return response.data;
}

const getRecipeDifficulty = (difficulty: RecipeDifficulty) => {
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

export { getRecipes, getRecipeDifficulty };
