import  React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationOverlay:React.FC<{children:React.ReactNode}> = ({children})=>{
    return(
        <div className="flex justify-end">
                            <div className="bg-white flex p-2  items-center rounded-lg gap-2  shadow-sm border-1">
                                <div className="text-xs text-slate-600 bg-white ">
                                    <p>1 - 50 of 10,000</p>
                                </div>
                                <div>
                                    <Pagination>
                                    <PaginationContent className="">
                                        <PaginationItem>
                                        <PaginationPrevious href="#" />
                                        <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                    </Pagination>
                                </div>
                         </div>
        
        
                        </div>

    )
}

export default PaginationOverlay