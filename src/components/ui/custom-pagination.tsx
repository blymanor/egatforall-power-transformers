import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 4;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4);
      } else if (currentPage >= totalPages - 2) {
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }
    return pages;
  };
  const visiblePages = getVisiblePages();
  return <div className="flex items-center justify-center gap-1 bg-white border border-gray-200 p-2 shadow-sm rounded-none">
      <Button variant="ghost" size="sm" onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronLeft className="h-4 w-4 mr-1" />
        ก่อนหน้า
      </Button>
      
      {visiblePages.map(page => <Button key={page} variant={page === currentPage ? "default" : "ghost"} size="sm" onClick={() => onPageChange(page)} className={`w-8 h-8 p-0 ${page === currentPage ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"}`}>
          {page}
        </Button>)}
      
      <Button variant="ghost" size="sm" onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
        ถัดไป
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>;
};
export default CustomPagination;