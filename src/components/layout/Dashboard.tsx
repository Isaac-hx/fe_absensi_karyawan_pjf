"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Clock, Contact, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { getCookie } from "@/helper/getCookie"
import { getAllKaryawan } from "@/services/karyawan"
import { UtilityContext } from "../context/UtilityContext"
import { useNavigate } from "react-router"
import { getAllUsers } from "@/services/user"
import { getAllAbsensi } from "@/services/absensi"
import type { IAbsensi } from "@/types/type"
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { formatTime } from "@/helper/convertTime"
import { Badge } from "@/components/ui/badge"

interface ExpandableTextProps {
  text: string
  maxWords?: number
}

function ExpandableText({ text, maxWords = 3 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!text || text === null) {
    return <span className="text-gray-400 italic">No data</span>
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
      >
        {isExpanded ? (
          <>
            <ChevronUp size={12} />
            Sembunyikan
          </>
        ) : (
          <>
            <ChevronDown size={12} />
            Selanjutnya
          </>
        )}
      </button>
    </div>
  )
}

// Loading skeleton component
function CardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full p-2 w-10 h-10 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
      </CardContent>
    </Card>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
      <div className="overflow-auto rounded-md border">
        <Table className="min-w-full bg-white">
          <TableHeader className="bg-slate-100">
            <TableRow>
              {Array.from({ length: 7 }).map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 7 }).map((_, j) => (
                  <TableCell key={j} className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const { setLoading } = useContext(UtilityContext)
  const [time, setTime] = useState(new Date())
  const [totalKaryawan, setTotalKaryawan] = useState<number>()
  const [totalUser, setTotalUser] = useState<number>()
  const [recentAbsensi, setRecentAbsensi] = useState<IAbsensi[]>()
  const [error, setError] = useState<string | null>(null)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const fetchTotalKaryawanUserAbsensi = async () => {
      setLoading(true)
      setIsDataLoading(true)
      setError(null)

      const token = getCookie("token")
      if (!token) {
        setError("Credential invalid")
        navigate("/login-admin")
        return
      }

      try {
        const [getTotalKaryawan, getTotalUsers, getRecentAbsensi] = await Promise.all([
          getAllKaryawan(token),
          getAllUsers(token),
          getAllAbsensi(token, 0, 5, "DESC"),
        ])

        if (getTotalKaryawan.pagination?.total_items !== undefined) {
          setTotalKaryawan(getTotalKaryawan.pagination.total_items)
        }

        if (getTotalUsers.pagination?.total_items !== undefined) {
          setTotalUser(getTotalUsers.pagination.total_items)
        }

        if (Array.isArray(getRecentAbsensi.data)) {
          setRecentAbsensi(getRecentAbsensi.data)
        } else if (getRecentAbsensi.data) {
          setRecentAbsensi([getRecentAbsensi.data])
        }
      } catch (e: any) {
        const errorMessage = e.response?.data?.message || "An error occurred while fetching data"
        setError(errorMessage)

        if (e.response?.status === 403) {
          navigate("/login-admin")
          return
        }
      } finally {
        setLoading(false)
        setIsDataLoading(false)
      }
    }

    fetchTotalKaryawanUserAbsensi()
    return () => clearInterval(interval)
  }, [setLoading, navigate])

  const formattedTime = time.toLocaleTimeString("id-ID", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center gap-4 p-6">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Error Loading Dashboard</h3>
                <p className="text-sm text-gray-600 mt-1">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        </div>

      {/* Ringkasan Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isDataLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <Card className="w-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-500 text-white rounded-full p-2">
                    <Clock className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Waktu</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-muted-foreground">{formattedDate}</p>
                <p className="text-2xl font-bold">{formattedTime}</p>
              </CardContent>
            </Card>

            <Card className="w-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 text-white rounded-full p-2">
                    <Contact className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Jumlah User</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{totalUser?.toLocaleString() || 0}</p>
                <p className="text-sm text-muted-foreground">Total registered users</p>
              </CardContent>
            </Card>

            <Card className="w-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-purple-500 text-white rounded-full p-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">Jumlah Karyawan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{totalKaryawan?.toLocaleString() || 0}</p>
                <p className="text-sm text-muted-foreground">Active employees</p>
              </CardContent>
            </Card>
          </>
        )}
      </section>

      {/* Recent Absensi Table */}
      <section>
        {isDataLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl">Recent Absensi</h2>
              <Badge variant="secondary" className="text-xs">
                {recentAbsensi?.length || 0} records
              </Badge>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="min-w-[100px] font-semibold">ID Karyawan</TableHead>
                        <TableHead className="min-w-[120px] font-semibold">Nama</TableHead>
                        <TableHead className="min-w-[80px] font-semibold">Foto</TableHead>
                        <TableHead className="min-w-[200px] font-semibold">Target Kerja</TableHead>
                        <TableHead className="min-w-[200px] font-semibold">Hasil Kerja</TableHead>
                        <TableHead className="min-w-[100px] font-semibold">Check In</TableHead>
                        <TableHead className="min-w-[100px] font-semibold">Check Out</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAbsensi && recentAbsensi.length > 0 ? (
                        recentAbsensi.map((item) => (
                          <TableRow key={item.absensi_id} className="hover:bg-muted/50 transition-colors">
                            <TableCell className="p-4 font-medium">
                              <Badge variant="outline">{item.karyawan_id}</Badge>
                            </TableCell>
                            <TableCell className="p-4">
                              <div className="font-medium">{item.name}</div>
                            </TableCell>
                            <TableCell className="p-4">
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
                            <TableCell className="p-4 max-w-[250px]">
                              <ExpandableText text={item.target_work} maxWords={3} />
                            </TableCell>
                            <TableCell className="p-4 max-w-[250px]">
                              <ExpandableText text={item.result_work} maxWords={3} />
                            </TableCell>
                            <TableCell className="p-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-medium">{formatTime(item?.check_in)}</span>
                                <span className="text-xs text-muted-foreground">Check In</span>
                              </div>
                            </TableCell>
                            <TableCell className="p-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-medium">{formatTime(item?.check_out) || "-"}</span>
                                <span className="text-xs text-muted-foreground">Check Out</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                              <AlertCircle className="h-8 w-8 text-gray-400" />
                              <p className="text-gray-500">No recent attendance data available</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </section>
    </div>
  )
}

export default Dashboard
