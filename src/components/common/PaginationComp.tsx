"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComp({
  currentPage,
  setCurrentPage,
  pageCount,
}: {
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  pageCount: number;
}) {
  if (pageCount <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage((prev) => prev + 1);
  };

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : " "
            }`}
            onClick={handlePrevious}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`${
              currentPage === pageCount ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
