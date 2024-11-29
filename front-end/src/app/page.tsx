import Topbar from "@/components/common/topbar";
import RecipesList from "@/components/sections/recipes-list";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="w-full">
      <Topbar />
      <Suspense>
        <RecipesList />
      </Suspense>
    </main>
  );
}
