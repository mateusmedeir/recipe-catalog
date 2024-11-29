"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RecipeDifficulty } from "@/enums/recipe-difficulty.enum";
import { getRecipeDifficulty } from "@/services/recipes";
import { useRouter, useSearchParams } from "next/navigation";
import { upsertParams } from "@/utils/upsert-params";
import { get } from "http";

interface RecipeFilterFormProps {
  handleWhenSubmit: () => void;
}

const RecipeFilterForm: React.FC<RecipeFilterFormProps> = ({
  handleWhenSubmit,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const difficulty = (params.get("difficulty") as RecipeDifficulty) || "Todos";

  const RecipeFilterSchema = z.object({
    difficulty: z.enum(["Todos", ...Object.values(RecipeDifficulty)] as [
      string,
      ...string[]
    ]),
  });
  type RecipeFilterData = z.infer<typeof RecipeFilterSchema>;

  const form = useForm<RecipeFilterData>({
    resolver: zodResolver(RecipeFilterSchema),
    mode: "onChange",
    defaultValues: {
      difficulty,
    },
  });

  async function handleRecipeSubmit(data: RecipeFilterData) {
    if (!form.formState.isValid) return;

    upsertParams(
      params,
      "difficulty",
      data.difficulty,
      !!getRecipeDifficulty(data.difficulty)
    );

    handleWhenSubmit();

    router.push(`/?${params.toString()}`);
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
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dificuldade</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        {getRecipeDifficulty(field.value) || "Todos"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Todos", ...Object.values(RecipeDifficulty)].map(
                      (recipeDifficulty, index) => (
                        <SelectItem key={index} value={recipeDifficulty}>
                          {getRecipeDifficulty(recipeDifficulty) || "Todos"}
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
          variant="primary"
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Aplicar filtros
        </Button>
      </form>
    </Form>
  );
};

export default RecipeFilterForm;
