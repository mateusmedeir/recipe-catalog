import Topbar from "@/components/topbar";
import api from "@/services/api";
import { IRecipe } from "@/interfaces/recipe.interface";
import PaginationControl from "@/components/pagination-control";

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
    const response = await api.get(`/recipes?${!!search.length ? `name=${search}&` : ''}page=${page}&total=${per_page}`);
    recipes = response.data.data;
    total = response.data.total;
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <Topbar />
      <section className="mx-auto sm:max-w-3xl w-full flex flex-col gap-6 py-16 px-3">
        {recipes?.map((recipe) => (
          <div
            key={recipe.id}
            className="grid gap-2 px-3 py-4 bg-white rounded-xl"
          >
            <h3 className="text-2xl font-bold">{recipe.name}</h3>
            <p className="text-sm text-gray-500">
              {recipe.ingredients.join(", ")}
            </p>
            <div className="flex gap-4">
              <div>Fácil</div>
              <div>15 min</div>
            </div>
          </div>
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
