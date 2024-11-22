import { IRecipe } from "@/interfaces/recipe.interface";
import api from "@/services/api";

interface getRecipesProps {
  per_page: number;
  page: number;
}

export default async function getRecipes({
  per_page,
  page,
}: getRecipesProps): Promise<{ data: IRecipe[]; total: number }> {
  const response = await api.get(
    `/recipes?total=${per_page}&page=${page}`
  );
  return response.data;
}
