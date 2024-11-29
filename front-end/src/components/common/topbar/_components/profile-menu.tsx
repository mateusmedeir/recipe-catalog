"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth.context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon } from "lucide-react";

const ProfileMenu = () => {
  const { user, logout } = useAuth();

  const splitedName = user?.name.split(" ");
  const initials = splitedName
    ?.reduce(
      (acc, name, index, fullName) =>
        index === 0 || (index !== 0 && index === fullName.length - 1)
          ? acc + name[0]
          : acc,
      ""
    )
    .toUpperCase();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none" asChild>
            <button className="flex gap-1 items-center">
              <Avatar className="w-8 aspect-square h-auto">
                <AvatarImage src="" alt="Perfil" />
                <AvatarFallback className="text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <p className="max-sm:hidden text-black font-medium truncate">
                {user?.name.split(" ")[0]}
              </p>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={logout} variant="destructive">
              <LogOutIcon />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-1 items-center">
          <Skeleton className="bg-white w-8 aspect-square rounded-full" />
          <Skeleton className="max-sm:hidden bg-white w-16 h-6" />
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
