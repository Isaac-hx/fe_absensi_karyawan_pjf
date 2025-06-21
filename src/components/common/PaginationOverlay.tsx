import  React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationOverlay:React.FC<{total_items:number,total_pages:number,current_page:number,items_per_page:number}>=({total_items,total_pages,current_page,items_per_page})=>{
    return(
        <div className="flex justify-end">
                            <div className="bg-white flex p-2  items-center rounded-lg gap-2  shadow-sm border-1">
                                <div className="text-xs text-slate-600 bg-white ">
                                    <p>{current_page} - {items_per_page}  of {total_items}</p>
                                </div>
                                <div>
                                    <Pagination>
                                    <PaginationContent className="">
                                        <PaginationItem>
                                        <PaginationPrevious className={current_page === 0? "text-slate-400 cursor-auto hover:text-slate-400":""}  />
                                        {/* <PaginationNext className={counter_data === (total_data/10) ? "text-slate-400 cursor-auto hover:text-slate-400":"" } onClick={handleNextPage} href="#" /> */}
                                        </PaginationItem>
                                    </PaginationContent>
                                    </Pagination>
                                </div>
                         </div>
        
        
                        </div>

    )
}

export default PaginationOverlay