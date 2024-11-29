"use client";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface PaginationControlProps {
  link: string;
  total: number;
  maxVisiblePages?: number;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  link,
  total,
  maxVisiblePages = 3,
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const page = params.has("page") ? parseInt(String(params.get("page"))) : 1;
  const per_page = params.has("per_page")
    ? parseInt(String(params.get("per_page")))
    : 10;

  const totalPages = Math.ceil(total / per_page);
  const startPage = Math.max(1, page - Math.floor((maxVisiblePages - 1) / 2));
  const endPage = Math.min(totalPages, page + (maxVisiblePages - 1) / 2);

  const handlePageChange = (newPage: number) => {
    params.set("page", String(newPage));
    return `${params.toString()}`;
  };

  return (
    <>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page != startPage && (
              <PaginationItem>
                <PaginationPrevious
                  title="Anterior"
                  href={`${link}?${handlePageChange(Math.max(1, page - 1))}`}
                />
              </PaginationItem>
            )}

            {startPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink href={`${link}?${handlePageChange(1)}`}>
                    1
                  </PaginationLink>
                </PaginationItem>
                {startPage > 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {Array.from(
              { length: Math.min(maxVisiblePages, endPage - startPage + 1) },
              (_, index) => startPage + index
            ).map((pageIndex) => (
              <PaginationItem
                key={pageIndex}
                className="w-full flex justify-center"
              >
                <PaginationLink
                  href={`${link}?${handlePageChange(pageIndex)}`}
                  isActive={pageIndex === page}
                >
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href={`${link}?${handlePageChange(totalPages)}`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {page != endPage && (
              <PaginationItem>
                <PaginationNext
                  title="Próximo"
                  href={`${link}?${handlePageChange(
                    Math.min(totalPages, page + 1)
                  )}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationControl;
