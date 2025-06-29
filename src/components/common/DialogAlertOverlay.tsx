import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from "react"

interface IDialogAlert{
    children:React.ReactNode
    title?:string
    description?:string
    onDelete?:()=>void
}

const DialogAlert:React.FC<IDialogAlert>=({children,title="Delete this data?",description="This action can't be undone. This will permanently delete your data!!",onDelete})=> {
  return (
    <AlertDialog >
      {children}
      <AlertDialogContent className="w-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600 cursor-pointer">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default DialogAlert