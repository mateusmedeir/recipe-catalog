"use client";

import RecipeCard from "@/components/cards/recipe-card";
import { IRecipe } from "@/interfaces/recipe.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationControl from "@/components/pagination-control";
import { getRecipes } from "@/utils/recipes";
import RecipeModal from "@/components/modals/recipe-modal";
import AddRecipeModal from "@/components/modals/add-recipe-modal";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, total } = await getRecipes({
        params: new URLSearchParams(searchParams.toString()),
      });
      setRecipes(data);
      setTotal(total);
    };
    fetchRecipes();
  }, [searchParams]);

  return (
    <section className="container flex flex-col gap-6 py-16">
      <AddRecipeModal>
        <Button className="w-fit">
          <PlusCircleIcon />
          Adicionar Receita
        </Button>
      </AddRecipeModal>
      {recipes?.map((recipe, index) => (
        <RecipeModal key={index} recipe={recipe}>
          <RecipeCard recipe={recipe} />
        </RecipeModal>
      ))}
      <PaginationControl link="" total={total} />
    </section>
  );
};

export default RecipesList;
