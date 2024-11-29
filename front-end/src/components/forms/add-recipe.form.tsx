"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RecipeDifficulty } from "@/enums/recipe-difficulty.enum";
import { PlusCircle, Trash2 } from "lucide-react";
import api from "@/services/api";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { getRecipeDifficulty } from "@/utils/recipes";
import { useRouter } from "next/navigation";

export default function AddRecipeForm() {
  const { toast } = useToast();
  const router = useRouter();

  const RecipeSchema = z.object({
    name: z.string().min(3).max(80),
    ingredients: z
      .array(z.object({ ingredient: z.string().min(3).max(80) }))
      .min(1)
      .max(30),
    instructions: z
      .array(z.object({ instruction: z.string().min(3).max(200) }))
      .min(1)
      .max(30),
    preparationTime: z.coerce.number().int().min(1).max(180),
    difficulty: z.enum(
      Object.values(RecipeDifficulty) as [string, ...string[]]
    ),
  });
  type RecipeData = z.infer<typeof RecipeSchema>;

  const form = useForm<RecipeData>({
    resolver: zodResolver(RecipeSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      ingredients: [{ ingredient: "" }],
      instructions: [{ instruction: "" }],
      preparationTime: 0,
      difficulty: RecipeDifficulty.EASY,
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  async function handleRecipeSubmit(data: RecipeData) {
    if (!form.formState.isValid) return;

    try {
      await api.post("/recipes", {
        ...data,
        ingredients: data.ingredients.map(
          (ingredient) => ingredient.ingredient
        ),
        instructions: data.instructions.map(
          (instruction) => instruction.instruction
        ),
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Falha ao adicionar receita",
        description: "Ocorreu um erro ao adicionar a receita.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full grid gap-6"
        onSubmit={form.handleSubmit(handleRecipeSubmit)}
      >
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <FormInput
                    {...field}
                    autoCorrect="off"
                    autoCapitalize="none"
                    placeholder="Ex: Panquecas"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <FormLabel>Ingredientes</FormLabel>
            {ingredientFields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`ingredients.${index}.ingredient`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2 mt-2">
                        <FormInput
                          {...field}
                          placeholder={`Ingrediente ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            {ingredientFields.length < 30 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => appendIngredient({ ingredient: "" })}
                className="mt-2 w-fit"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar Ingrediente
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <FormLabel>Modo de Preparo</FormLabel>
            {instructionFields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`instructions.${index}.instruction`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2 mt-2">
                        <FormInput
                          {...field}
                          placeholder={`Passo ${index + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            {instructionFields.length < 30 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => appendInstruction({ instruction: "" })}
                className="mt-2 w-fit"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar Instrução
              </Button>
            )}
          </div>
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempo de Preparo (em minutos)</FormLabel>
                <FormControl>
                  <FormInput {...field} type="number" placeholder="Ex: 30" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dificuldade</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        {getRecipeDifficulty(field.value as RecipeDifficulty)}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(RecipeDifficulty).map(
                      (difficulty, index) => (
                        <SelectItem key={index} value={difficulty}>
                          {getRecipeDifficulty(difficulty)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Adicionar Receita
        </Button>
      </form>
    </Form>
  );
}
