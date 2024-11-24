import Topbar from "@/components/topbar";
import RecipesList from "@/components/sections/recipes-list";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main>
      <Topbar />
      <Suspense>
        <RecipesList />
      </Suspense>
    </main>
  );
}
