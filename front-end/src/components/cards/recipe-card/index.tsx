import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RecipeDifficulty } from "@/enums/recipe-difficulty.enum";
import { IRecipe } from "@/interfaces/recipe.interface";
import { TimerIcon } from "lucide-react";

interface RecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const getDifficulty = (difficulty: RecipeDifficulty) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="grid gap-4 px-3 py-4 bg-white rounded-xl text-left">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">{recipe.name}</h3>
            <p className="text-sm text-gray-500">
              {recipe.ingredients.join(", ")}
            </p>
          </div>
          <div className="flex gap-4 justify-between text-sm">
            <div>{getDifficulty(recipe.difficulty)}</div>
            <div className="flex gap-1 items-center">
              <TimerIcon size={20} />
              {recipe.preparationTime} min
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-3xl">{recipe.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Ingredientes</h2>
          <ul className="list-disc list-inside grid gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} >{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Modo de preparo</h2>
          <ol className="grid gap-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="text-xl text-primary">{index + 1}</span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeCard;
