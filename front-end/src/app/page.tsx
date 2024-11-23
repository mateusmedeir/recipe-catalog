import Topbar from "@/components/topbar";
import api from "@/services/api";
import { IRecipe } from "@/interfaces/recipe.interface";
import PaginationControl from "@/components/pagination-control";
import RecipeCard from "@/components/cards/recipe-card";

export default async function Home(props: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.s ? searchParams.s : "";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const per_page = searchParams.per_page ? parseInt(searchParams.per_page) : 10;

  let recipes: IRecipe[] = [];
  let total = 0;

  try {
    const response = await api.get(
      `/recipes?${
        !!search.length ? `name=${search}&` : ""
      }page=${page}&total=${per_page}`
    );
    recipes = response.data.data;
    total = response.data.total;
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <Topbar />
      <section className="mx-auto sm:max-w-3xl w-full flex flex-col gap-6 py-16 px-3">
        {recipes?.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
        <PaginationControl
          link=""
          page={page}
          per_page={per_page}
          total={total}
        />
      </section>
    </main>
  );
}
