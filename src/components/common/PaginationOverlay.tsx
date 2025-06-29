import  React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationOverlay: React.FC<{
    total_items: number;
    total_pages: number;
    current_page: number;
    items_per_page: number;
    setCounterPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ total_items, total_pages, current_page, items_per_page, setCounterPage }) => {
    return (
        <div className="flex justify-end">
            <div className="bg-white flex p-2 items-center rounded-lg gap-2 shadow-sm border">
                <div className="text-xs text-slate-600 bg-white">
                    <p>
                        Page {current_page } of {total_pages} - ({total_items} items)
                    </p>
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {/* Tombol Previous */}
                                <PaginationPrevious
                                    className={
                                        current_page === 1
                                            ? "text-slate-400 cursor-auto hover:text-slate-400"
                                            : "cursor-pointer"
                                    }
                                    onClick={() => {
                                        if (current_page > 1) {
                                            setCounterPage(current_page - 1);
                                        }
                                    }}
                                />
                                {/* Tombol Next */}
                                <PaginationNext
                                    className={
                                        current_page >= total_pages 
                                            ? "text-slate-400 cursor-auto hover:text-slate-400"
                                            : "cursor-pointer"
                                    }
                                    onClick={() => {
                                        if (current_page < total_pages ) {
                                            setCounterPage(current_page + 1);
                                        }
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};
export default PaginationOverlay