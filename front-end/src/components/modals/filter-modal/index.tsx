"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeftIcon, ListFilterIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import RecipeFilterForm from "@/components/forms/recipe-filter.form";
import { useState } from "react";

const FilterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit bg-white">
          <ListFilterIcon />
          Filtros
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0">
        <div className="container flex flex-col gap-6 py-10 items-center">
        <DialogHeader className="w-full grid grid-cols-10 items-center">
            <DialogClose className="hover:cursor-pointer" asChild>
              <ArrowLeftIcon />
            </DialogClose>
            <DialogTitle className="text-3xl col-span-8 text-center break-words ">
              Filtros
            </DialogTitle>
          </DialogHeader>
          <RecipeFilterForm handleWhenSubmit={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
