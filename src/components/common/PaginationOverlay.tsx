import  React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationOverlay:React.FC<{counter_data:number,total_data:number,handlePreviousPage:(arg:any)=>void,handleNextPage:(arg:any)=>void}> = ({counter_data,total_data,handlePreviousPage,handleNextPage})=>{
    return(
        <div className="flex justify-end">
                            <div className="bg-white flex p-2  items-center rounded-lg gap-2  shadow-sm border-1">
                                <div className="text-xs text-slate-600 bg-white ">
                                    <p>{(counter_data-1)*10+1} - {counter_data*10}  of {total_data}</p>
                                </div>
                                <div>
                                    <Pagination>
                                    <PaginationContent className="">
                                        <PaginationItem>
                                        <PaginationPrevious className={counter_data === 1? "text-slate-400 cursor-auto hover:text-slate-400":""}  onClick={handlePreviousPage} href="#" />
                                        <PaginationNext className={counter_data === (total_data/10) ? "text-slate-400 cursor-auto hover:text-slate-400":"" } onClick={handleNextPage} href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                    </Pagination>
                                </div>
                         </div>
        
        
                        </div>

    )
}

export default PaginationOverlay