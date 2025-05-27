import { DialogContent,DialogHeader,DialogTitle,DialogFooter,DialogDescription,DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type React from "react";

interface IDialogoverlay {
  children:React.ReactNode
  dialogCloseButton?:boolean
  data: Record<string, any>;
  
}


const DialogOverlay:React.FC<IDialogoverlay> = ({data,children,dialogCloseButton=false})=>{
  return(

      <DialogContent className="w-3/4" >
        
        <DialogHeader>
          <DialogTitle className="text-left">{data.title}</DialogTitle>
          <DialogDescription className="text-left">
            {data.description}
          </DialogDescription>
        </DialogHeader>
        {/* Body */}
          {children}
        {/* End Body */}
        <DialogFooter>
          {dialogCloseButton ? <DialogClose asChild>
                        <Button onClick={()=>{data.handleSubmit(data.submit)}}  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">{data.button}</Button>
          </DialogClose>:          <Button onClick={()=>{data.handleSubmit(data.submit)}}  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">{data.button}</Button>}


        </DialogFooter>
      </DialogContent>

  )
}


export default DialogOverlay