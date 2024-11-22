import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Fragment } from "react";

interface PaginationControlProps {
  link: string;
  page: number;
  per_page: number;
  total: number;
  maxVisiblePages?: number;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
  link,
  page,
  per_page,
  total,
  maxVisiblePages = 3,
}) => {
  const totalPages = Math.ceil(total / per_page);
  const startPage = Math.max(1, page - Math.floor((maxVisiblePages - 1) / 2));
  const endPage = Math.min(totalPages, page + (maxVisiblePages - 1) / 2);

  return (
    <>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page != startPage && (
              <PaginationItem>
                <PaginationPrevious
                  title="Anterior"
                  href={`${link}?per_page=${per_page}&page=${Math.max(
                    1,
                    page - 1
                  )}`}
                />
              </PaginationItem>
            )}

            {startPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink href={`${link}?per_page=${per_page}&page=1`}>
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
                <PaginationItem key={pageIndex} className="w-full flex justify-center">
                  <PaginationLink
                    href={`${link}?per_page=${per_page}&page=${pageIndex}`}
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
                    href={`${link}?per_page=${per_page}&page=${totalPages}`}
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
                  href={`${link}?per_page=${per_page}&page=${Math.min(
                    totalPages,
                    page + 1
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
