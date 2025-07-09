"use client"

import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Pencil, Trash2, User } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { FormDialog } from "@/components/common/form-dialog"
import DialogAlert from "@/components/common/DialogAlertOverlay"
import TooltipOverlay from "@/components/common/TooltipOverlay"
import PaginationOverlay from "@/components/common/PaginationOverlay"
import { UtilityContext } from "../context/UtilityContext"
import { getCookie } from "@/helper/getCookie"
import { isValidEmail, validateAndFormatPhoneNumber } from "@/helper/validator"
import { exportToExcel } from "@/helper/export"
import { getAllKaryawan, createKaryawan, editKaryawanById, deleteKaryawanById } from "@/services/karyawan"
import type { IPagination, IKaryawan } from "@/types/type"
import type { KaryawanFormValues } from "@/types/form"
import { AlertDialogTrigger } from "@/components/ui/alert-dialog"

const Karyawan: React.FC = () => {
  const [counterPage, setCounterPage] = useState(0)
  const [selectedEditId, setSelectedEditId] = useState<number>()
  const [pagination, setPagination] = useState<IPagination | undefined>()
  const [dataKaryawan, setDataKaryawan] = useState<IKaryawan[]>([])
  const [searchNameKaryawan, setSearchNameKaryawan] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { setLoading, loading } = useContext(UtilityContext)
  const navigate = useNavigate()

  // Add Form
  const {
    register: registerAdd,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
    setValue: setGender,
    reset: resetAddForm,
  } = useForm<KaryawanFormValues>()

  // Edit Form
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    setValue: setEditValue,
    getValues: getEditValues,
    reset: resetEditForm,
  } = useForm<KaryawanFormValues>()

  useEffect(() => {
    fetchKaryawan()
  }, [counterPage])

  const fetchKaryawan = async () => {
    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllKaryawan(token, counterPage)
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      setDataKaryawan(res.data)
      setPagination(res.pagination)
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(e.response?.data?.message || "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleSearchState = async () => {
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllKaryawan(token, 0, 20, "ASC", searchNameKaryawan)
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      setDataKaryawan(res.data)
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

  const handleSortKaryawan = () => {
    setDataKaryawan([...dataKaryawan].sort((a, b) => a.name.localeCompare(b.name)))
  }

  const handleAddKaryawan = async (data: KaryawanFormValues) => {
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    setLoading(true)
    try {
      const res = await createKaryawan(data, token)
      alert(res.message)
      setIsAddDialogOpen(false)
      resetAddForm()
      fetchKaryawan()
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(`Failed to add employee: ${e.response?.data?.message || e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEditKaryawan = async () => {
    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      if (!selectedEditId) {
        throw new Error("ID not found")
      }
      const res = await editKaryawanById(getEditValues(), token, selectedEditId)
      alert(res.message)
      setIsEditDialogOpen(false)
      resetEditForm()
      fetchKaryawan()
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(`Failed to edit employee: ${e.response?.data?.message || e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteKaryawan = async (id: number) => {
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      setLoading(true)
      const res = await deleteKaryawanById(id, token)
      alert(res.message)
      fetchKaryawan()
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(`Failed to delete employee: ${e.response?.data?.message || e.message}`)
    } finally {
      setLoading(false)
    }
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
      const res = await getAllKaryawan(token, 0, 10000, "ASC")
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      const dataExport = exportToExcel("Karyawan", res.data)
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

  const openEditDialog = (item: IKaryawan) => {
    setSelectedEditId(item.id)
    resetEditForm({
      name: item.name,
      email: item.email,
      no_telp: item.no_telp,
      gender: item.gender,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DataTable
        title="Karyawan Manajemen"
        searchPlaceholder="Search employee name..."
        searchValue={searchNameKaryawan}
        onSearchChange={setSearchNameKaryawan}
        onSearchSubmit={handleSearchState}
        onSort={handleSortKaryawan}
        onExport={handleExportExcel}
        onRefresh={fetchKaryawan}
        isLoading={loading}
        addButton={
          <FormDialog
            title="Add Employee"
            description="Enter employee information"
            triggerText="Add Employee"
            onSubmit={handleAddSubmit(handleAddKaryawan)}
            isLoading={loading}
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...registerAdd("name", {
                    required: "Name can't be empty",
                    minLength: { value: 5, message: "Name must be at least 5 characters" },
                  })}
                  placeholder="Enter name"
                />
                {addErrors.name && <p className="text-sm text-red-500">{addErrors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...registerAdd("email", {
                    required: "Email can't be empty",
                    validate: (value) => isValidEmail(value) || "Invalid email address",
                  })}
                  placeholder="Enter email"
                  type="email"
                />
                {addErrors.email && <p className="text-sm text-red-500">{addErrors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="no_telp">Phone Number</Label>
                <Input
                  {...registerAdd("no_telp", {
                    required: "Phone can't be empty",
                    validate: (value) => validateAndFormatPhoneNumber(value) || "Invalid phone number",
                  })}
                  placeholder="Enter phone number"
                />
                {addErrors.no_telp && <p className="text-sm text-red-500">{addErrors.no_telp.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup onValueChange={(value) => setGender("gender", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
                {addErrors.gender && <p className="text-sm text-red-500">{addErrors.gender.message}</p>}
              </div>
            </div>
          </FormDialog>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="">Phone</TableHead>
              <TableHead className="">Gender</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataKaryawan.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <User className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No employees found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              dataKaryawan.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{item.id}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{item.email}</div>
                  </TableCell>
                  <TableCell className="">{item.email}</TableCell>
                  <TableCell className="">{item.no_telp}</TableCell>
                  <TableCell className="">
                    <Badge variant={item.gender === "male" ? "default" : "secondary"}>{item.gender}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TooltipOverlay text="Edit">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipOverlay>

                      <DialogAlert onDelete={() => handleDeleteKaryawan(item.id)}>
                        <TooltipOverlay text="Delete">
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                        </TooltipOverlay>
                      </DialogAlert>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTable>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update employee information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                {...registerEdit("name", {
                  required: "Name can't be empty",
                  minLength: { value: 5, message: "Name must be at least 5 characters" },
                })}
                placeholder="Enter name"
              />
              {editErrors.name && <p className="text-sm text-red-500">{editErrors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                {...registerEdit("email", {
                  required: "Email can't be empty",
                  validate: (value) => isValidEmail(value) || "Invalid email address",
                })}
                placeholder="Enter email"
                type="email"
              />
              {editErrors.email && <p className="text-sm text-red-500">{editErrors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                {...registerEdit("no_telp", {
                  required: "Phone can't be empty",
                  validate: (value) => validateAndFormatPhoneNumber(value) || "Invalid phone number",
                })}
                placeholder="Enter phone number"
              />
              {editErrors.no_telp && <p className="text-sm text-red-500">{editErrors.no_telp.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup onValueChange={(value) => setEditValue("gender", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="edit-male" />
                  <Label htmlFor="edit-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="edit-female" />
                  <Label htmlFor="edit-female">Female</Label>
                </div>
              </RadioGroup>
              {editErrors.gender && <p className="text-sm text-red-500">{editErrors.gender.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit(handleEditKaryawan)} disabled={loading} className="w-full sm:w-auto">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

export default Karyawan
