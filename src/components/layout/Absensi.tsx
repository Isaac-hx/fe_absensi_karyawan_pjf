"use client"

import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Eye, ChevronDown, ChevronUp, Clock, MapPin } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import TooltipOverlay from "@/components/common/TooltipOverlay"
import PaginationOverlay from "@/components/common/PaginationOverlay"
import { UtilityContext } from "../context/UtilityContext"
import { getCookie } from "@/helper/getCookie"
import { exportToExcel } from "@/helper/export"
import { getAbsensiById, getAllAbsensi } from "@/services/absensi"
import { formatTime } from "@/helper/convertTime"
import type { IPagination, IAbsensi } from "@/types/type"

interface ExpandableTextProps {
  text: string | null | undefined
  maxWords?: number
}

function ExpandableText({ text, maxWords = 3 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!text || text === null || text === undefined) {
    return <span className="text-muted-foreground italic">No data</span>
  }

  const words = text.split(" ")
  const shouldTruncate = words.length > maxWords
  const displayText = shouldTruncate && !isExpanded ? words.slice(0, maxWords).join(" ") + "..." : text

  if (!shouldTruncate) {
    return <span className="break-words text-wrap">{text}</span>
  }

  return (
    <div className="space-y-2">
      <p className="break-words leading-relaxed text-wrap">{displayText}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
        type="button"
      >
        {isExpanded ? (
          <>
            <ChevronUp size={12} />
            Hide
          </>
        ) : (
          <>
            <ChevronDown size={12} />
            Show more
          </>
        )}
      </button>
    </div>
  )
}

const Absensi: React.FC = () => {
  const [counterPage, setCounterPage] = useState(1)
  const [dataAbsensi, setDataAbsensi] = useState<IAbsensi[]>([])
  const [detailAbsensi, setDetailAbsensi] = useState<IAbsensi | undefined>()
  const [searchAbsensi, setSearchAbsensi] = useState("")
  const [pagination, setPagination] = useState<IPagination | undefined>()
  const { setLoading, loading } = useContext(UtilityContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAbsensi()
  }, [counterPage])

  const fetchAbsensi = async () => {
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    setLoading(true)
    try {
      const res = await getAllAbsensi(token, counterPage)
      console.log(res)
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      setDataAbsensi(res.data)
      setPagination(res.pagination)
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(`${e.response?.data?.status}: ${e.response?.data?.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchState = async () => {
    if (searchAbsensi === "") {
      fetchAbsensi()
      return
    }

    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllAbsensi(token, 0, 20, "ASC", searchAbsensi)
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      setDataAbsensi(res.data)
      setPagination(res.pagination)
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(`${e.response?.data?.status}: ${e.response?.data?.message}`)
    }
  }

  const fetchDetailAbsensi = async (id: number | undefined) => {
    if (id === undefined) {
      alert("ID not found/invalid")
      return
    }

    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
    const res = await getAbsensiById(token, id)
    if (res.data && !Array.isArray(res.data)) {
      setDetailAbsensi(res.data)
    } else {
      setDetailAbsensi(undefined)
      alert("Attendance detail not found or invalid format")
    }
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert("Failed to fetch attendance details")
    } finally {
      setLoading(false)
    }
  }

  const handleSortAbsensi = () => {
    setDataAbsensi([...dataAbsensi].sort((a, b) => a.name.localeCompare(b.name)))
  }

  const handleExportExcel = async () => {
    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllAbsensi(token, 0, 10000, "ASC")
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      const dataExport = exportToExcel("Absensi", res.data)
      alert(`Download file ${dataExport} success!`)
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(e.response?.data?.message || "Export failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DataTable
        title="Absensi Manajemen"
        searchPlaceholder="Search employee name..."
        searchValue={searchAbsensi}
        onSearchChange={setSearchAbsensi}
        onSearchSubmit={handleSearchState}
        onSort={handleSortAbsensi}
        onExport={handleExportExcel}
        onRefresh={fetchAbsensi}
        isLoading={loading}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="">Photo</TableHead>
              <TableHead className="">Target Work</TableHead>
              <TableHead className="">Result Work</TableHead>
              <TableHead className="">Check In</TableHead>
              <TableHead className="">Check Out</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataAbsensi.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No attendance records found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              dataAbsensi.map((item) => (
                <TableRow key={item.absensi_id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <Badge variant="outline">{item.karyawan_id}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {formatTime(item.check_in)} - {formatTime(item.check_out) || "Not checked out"}
                    </div>
                  </TableCell>
                  <TableCell className=" md:table-cell">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        className="w-full h-full object-cover"
                        src={item.url_profile || "/placeholder.svg"}
                        alt={item.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className=" lg:table-cell max-w-[200px]">
                    <ExpandableText text={item.target_work} maxWords={3} />
                  </TableCell>
                  <TableCell className=" lg:table-cell max-w-[200px]">
                    <ExpandableText text={item.result_work} maxWords={3} />
                  </TableCell>
                  <TableCell className=" sm:table-cell">
                    <div className="flex flex-col">
                      <span className="font-medium">{formatTime(item.check_in)}</span>
                      <span className="text-xs text-muted-foreground">Check In</span>
                    </div>
                  </TableCell>
                  <TableCell className=" sm:table-cell">
                    <div className="flex flex-col">
                      <span className="font-medium">{formatTime(item.check_out) || "-"}</span>
                      <span className="text-xs text-muted-foreground">Check Out</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
 
                    </div>
                    <Sheet>

                       <TooltipOverlay text="View Details">
                         <SheetTrigger asChild>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => fetchDetailAbsensi(item.absensi_id)}
                            disabled={loading}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>

                        </TooltipOverlay>
                      {!loading  &&(

                        <SheetContent className="sm:max-w-md overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Attendance Details</SheetTitle>
                            <SheetDescription>View detailed attendance information and work results.</SheetDescription>
                          </SheetHeader>

                          <div className="space-y-6 py-4">
                            {/* Profile Photo */}
                            <div className="flex justify-center">
                              <div className="w-32 h-32 rounded-full ring-2 ring-primary overflow-hidden">
                                <img
                                  className="w-full h-full object-cover"
                                  src={detailAbsensi?.url_profile || "/placeholder.svg"}
                                  alt="Profile"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.src = "/placeholder.svg"
                                  }}
                                />
                              </div>
                            </div>

                            {/* Employee Info */}
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Employee ID - {detailAbsensi?.name}</Label>
                                <Input value={detailAbsensi?.karyawan_id} readOnly />
                              </div>

                              <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={detailAbsensi?.name} readOnly />
                              </div>

                              <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  Location
                                </Label>
                                <Input value={detailAbsensi?.location || "Not specified"} readOnly />
                              </div>

                              <div className="space-y-2">
                                <Label>Target Work</Label>
                                <Textarea
                                  value={detailAbsensi?.target_work || "No target specified"}
                                  readOnly
                                  className="min-h-[80px]"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Work Result</Label>
                                <Textarea
                                  value={detailAbsensi?.result_work || "No result provided"}
                                  readOnly
                                  className="min-h-[80px]"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Check In
                                  </Label>
                                  <Input value={formatTime(detailAbsensi?.check_in)} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Check Out
                                  </Label>
                                  <Input value={formatTime(detailAbsensi?.check_out) || "Not checked out"} readOnly />
                                </div>
                              </div>

                              {detailAbsensi?.url_signature && (
                                <div className="space-y-2">
                                  <Label>Digital Signature</Label>
                                  <div className="border rounded-lg p-4 bg-muted/50">
                                    <img
                                      src={detailAbsensi.url_signature || "/placeholder.svg"}
                                      alt="Digital Signature"
                                      className="max-w-full h-auto"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.style.display = "none"
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <SheetFooter>
                            <SheetClose asChild>
                              <Button variant="outline" className="w-full bg-transparent">
                                Close
                              </Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                            )}
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTable>

      {/* Pagination */}
      <PaginationOverlay
        current_page={pagination?.current_page}
        total_items={pagination?.total_items}
        total_pages={pagination?.total_pages}
        setCounterPage={setCounterPage}
      />
    </div>
  )
}

export default Absensi
