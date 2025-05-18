import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface ITooltipOverlay{
    text?:string
    children:React.ReactNode
}
const TooltipOverlay:React.FC<ITooltipOverlay> = ({children,text})=>{
    return(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
    
}

export default TooltipOverlay