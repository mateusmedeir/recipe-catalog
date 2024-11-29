import RecipeMenu from "@/components/cards/recipe-card/_components/recipe-menu";
import { IRecipe } from "@/interfaces/recipe.interface";
import { getRecipeDifficulty } from "@/utils/recipes";
import { TimerIcon } from "lucide-react";

interface RecipeCardProps {
  recipe: IRecipe;
  handleDeleteRecipe: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  handleDeleteRecipe,
}) => {
  return (
    <div className="w-full grid gap-4 px-3 py-4 bg-white rounded-md text-left">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{recipe.name}</h3>
          <p className="text-sm text-gray-500">
            {recipe.ingredients.join(", ")}
          </p>
        </div>
        <RecipeMenu recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />
      </div>
      <div className="flex gap-4 justify-between text-sm">
        <div>{getRecipeDifficulty(recipe.difficulty)}</div>
        <div className="flex gap-1 items-center">
          <TimerIcon size={20} />
          {recipe.preparationTime} min
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
