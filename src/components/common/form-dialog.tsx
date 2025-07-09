"use client"

import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface FormDialogProps {
  title: string
  description: string
  triggerText: string
  children: React.ReactNode
  onSubmit: () => void
  isLoading?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FormDialog({
  title,
  description,
  triggerText,
  children,
  onSubmit,
  isLoading = false,
  open,
  onOpenChange,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
