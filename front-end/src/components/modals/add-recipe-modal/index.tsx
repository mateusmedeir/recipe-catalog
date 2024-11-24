import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { ArrowLeftIcon } from "lucide-react";
  import RecipeForm from "@/components/forms/recipe.form";
  import * as DialogPrimitive from "@radix-ui/react-dialog";
  
  const AddRecipeModal = ({
    children
  }: Readonly<{
    children: React.ReactNode
  }>) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0">
          <div className="container flex flex-col gap-6 py-10 items-center">
            <DialogHeader className="w-full grid grid-cols-6 items-center">
              <DialogPrimitive.Close className="hover:cursor-pointer" asChild>
                <ArrowLeftIcon />
              </DialogPrimitive.Close>
              <DialogTitle className="text-3xl col-span-4 text-center">
                Nova Receita
              </DialogTitle>
            </DialogHeader>
            <RecipeForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AddRecipeModal;
  