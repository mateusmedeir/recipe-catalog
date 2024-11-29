import FormContainer from "@/components/common/form-container";
import AddRecipeForm from "@/components/forms/add-recipe.form";
import Topbar from "@/components/common/topbar";

export default function AddRecipe() {
  return (
    <main className="w-full flex flex-col">
      <Topbar />
      <FormContainer title="Adicionar Receita">
        <AddRecipeForm />
      </FormContainer>
    </main>
  );
}
