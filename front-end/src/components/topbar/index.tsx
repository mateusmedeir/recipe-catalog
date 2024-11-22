"use client";

import Link from "next/link";
import ProfileMenu from "./_components/profile-menu";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TopbarProps {
  type?: "default" | "simple";
}

const Topbar: React.FC<TopbarProps> = ({ type = "default" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchMode, setSearchMode] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputValue = e.currentTarget.querySelector("input")?.value;
    const nameSearch = inputValue?.split(" ").join("-").toLowerCase();

    setSearchMode(false);

    router.push(`/${nameSearch ? `?s=${nameSearch}` : ""}`);
  };

  return (
    <header className="bg-primary w-full flex flex-col items-center py-4">
      <div
        className={`container ${
          searchMode
            ? "flex gap-3"
            : "grid grid-cols-2 sm:grid-cols-[minmax(175px,_auto)_minmax(150px,_2fr)_minmax(180px,_auto)]"
        } items-center`}
      >
        {searchMode ? (
          <form
            className="w-full flex items-center justify-between gap-3"
            onSubmit={handleFormSubmit}
          >
            <input
              className="w-full h-min text-black px-5 py-2.5 rounded-lg outline-none"
              type="text"
              placeholder="Pesquisar"
            />
            <XIcon
              className="text-black"
              onClick={() => setSearchMode(false)}
            />
          </form>
        ) : (
          <>
            <Link
              className="text-black font-bold text-xl"
              href={type === "default" ? "/" : ""}
            >
              Recipe Catalog
            </Link>
            <div className="max-sm:hidden bg-white flex items-center px-5 gap-2">
              <input
                className="bg-transparent w-full h-min text-black py-2.5 rounded-lg outline-none"
                type="text"
                placeholder="Pesquisar"
              />
              <SearchIcon />
            </div>
            {type === "default" && (
              <div className="ml-auto flex items-center gap-4">
                <button
                  className="sm:hidden"
                  onClick={() =>
                    setSearchMode((oldSearchMode) => !oldSearchMode)
                  }
                >
                  <SearchIcon className="text-black" />
                </button>
                <ProfileMenu />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
