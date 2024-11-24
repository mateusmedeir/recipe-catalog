import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IRecipe } from "@/interfaces/recipe.interface";
import { TimerIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getRecipeDifficulty } from "@/utils/recipes";

interface RecipeModalProps {
  recipe: IRecipe;
  children: React.ReactNode;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl px-0 py-16">
        <div className="container grid gap-8">
          <DialogHeader className="text-left flex items-center gap-8">
            <DialogTitle className="w-full text-3xl">{recipe.name}</DialogTitle>
            <Card className="w-full max-w-[350px]">
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
          </DialogHeader>
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
