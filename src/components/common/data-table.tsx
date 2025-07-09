"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowDownWideNarrow, Download, RefreshCw } from "lucide-react"
import TooltipOverlay from "@/components/common/TooltipOverlay"

interface DataTableProps {
  title: string
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
  onSort: () => void
  onExport: () => void
  onRefresh?: () => void
  children: React.ReactNode
  isLoading?: boolean
  addButton?: React.ReactNode
}

export function DataTable({
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSort,
  onExport,
  onRefresh,
  children,
  isLoading = false,
  addButton,
}: DataTableProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSearchSubmit()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex  sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        {addButton && <div className="flex-shrink-0">{addButton}</div>}
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-row  gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex  items-center gap-2">
              {onRefresh && (
                <TooltipOverlay text="Refresh">
                  <Button variant="outline" size="icon" onClick={onRefresh} disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  </Button>
                </TooltipOverlay>
              )}

              <TooltipOverlay text="Sort A-Z">
                <Button variant="outline" size="icon" onClick={onSort} disabled={isLoading}>
                  <ArrowDownWideNarrow className="h-4 w-4" />
                </Button>
              </TooltipOverlay>

              <Button onClick={onExport} disabled={isLoading} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">{children}</div>
        </CardContent>
      </Card>
    </div>
  )
}
