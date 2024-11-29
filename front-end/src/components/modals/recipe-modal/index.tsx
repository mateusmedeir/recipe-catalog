import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeftIcon, TimerIcon } from "lucide-react";
import { IRecipe } from "@/interfaces/recipe.interface";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getRecipeDifficulty } from "@/utils/recipes";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import RecipeCard from "@/components/cards/recipe-card";

interface RecipeModalProps {
  recipe: IRecipe;
  handleDeleteRecipe: (id: string) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  handleDeleteRecipe,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <RecipeCard recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl px-0 py-4 gap-0">
        <div className="px-4 w-full flex justify-between">
          <DialogPrimitive.Close className="hover:cursor-pointer" asChild>
            <ArrowLeftIcon />
          </DialogPrimitive.Close>
        </div>
        <div className="container grid gap-12 py-6">
          <DialogHeader className="text-left flex items-center gap-4">
            <DialogTitle className="w-full text-3xl">{recipe.name}</DialogTitle>
          </DialogHeader>
          <Card className="mx-auto w-full max-w-[350px]">
            <CardContent className="h-full p-0">
              <div className="h-full flex justify-between items-center py-2">
                <div className="w-full flex justify-center">
                  {getRecipeDifficulty(recipe.difficulty)}
                </div>
                <Separator className="py-6" orientation="vertical" />

                <div className="w-full flex gap-1 justify-center items-center">
                  <TimerIcon size={20} />
                  {recipe.preparationTime} min
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <h2 className="text-xl font-bold">Ingredientes</h2>
              <ul className="list-disc list-inside grid gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
