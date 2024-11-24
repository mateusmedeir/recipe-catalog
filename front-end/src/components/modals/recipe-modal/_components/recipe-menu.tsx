"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { IRecipe } from "@/interfaces/recipe.interface";
import { DialogClose } from "@/components/ui/dialog";

interface RecipeMenuProps {
  recipe: IRecipe;
  deleteRecipe: (id: string) => void;
}

const RecipeMenu: React.FC<RecipeMenuProps> = ({ recipe, deleteRecipe }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <PencilIcon />
          Editar
        </DropdownMenuItem>
        <DialogClose className="hover:cursor-pointer" asChild>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            variant="destructive"
            onClick={async () => deleteRecipe(recipe.id)}
          >
            <Trash2Icon />
            Deletar
          </DropdownMenuItem>
        </DialogClose>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RecipeMenu;
