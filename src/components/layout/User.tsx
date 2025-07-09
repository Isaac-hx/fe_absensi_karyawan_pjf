"use client"

import type React from "react"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
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
import { Pencil, Trash2, Users } from "lucide-react"
import { DataTable } from "@/components/common/data-table"
import { FormDialog } from "@/components/common/form-dialog"
import DialogAlert from "@/components/common/DialogAlertOverlay"
import TooltipOverlay from "@/components/common/TooltipOverlay"
import PaginationOverlay from "@/components/common/PaginationOverlay"
import { UtilityContext } from "../context/UtilityContext"
import { getCookie } from "@/helper/getCookie"
import { exportToExcel } from "@/helper/export"
import { register as registerUser } from "@/services/auth"
import { getAllUsers, editUserById, deleteUserById } from "@/services/user"
import type { IPagination, IUser } from "@/types/type"
import type { UserFormValues } from "@/types/form"
import { AlertDialogTrigger } from "@/components/ui/alert-dialog"

const User: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination>()
  const [selectedEditId, setSelectedEditId] = useState<number>()
  const [dataUser, setDataUser] = useState<IUser[]>([])
  const [counterPage, setCounterPage] = useState(0)
  const [searchNameUser, setSearchNameUser] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { setLoading, loading } = useContext(UtilityContext)
  const navigate = useNavigate()

  // Add User Form
  const {
    register: registerAdd,
    handleSubmit: handleAddSubmit,
    formState: { errors: addErrors },
    watch: watchAdd,
    reset: resetAddForm,
    setValue,
    getValues,
  } = useForm<UserFormValues>()

  // Edit User Form
  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    reset: resetEditForm,
    setValue: setEditValue,
    getValues: getEditValues,
  } = useForm<UserFormValues>()

  useEffect(() => {
    fetchUsers()
  }, [counterPage])

  const fetchUsers = async () => {
    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllUsers(token, counterPage)
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      setDataUser(res.data)
      setPagination(res.pagination)
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(e.response?.data?.message || "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (data: UserFormValues) => {
    setLoading(true)
    setValue("status", "active")

    if (data.password !== data.confirm_password) {
      alert("Passwords do not match!")
      setLoading(false)
      return
    }

    try {
      const res = await registerUser(getValues())
      alert(`Success register user ${res.data}`)
      setIsAddDialogOpen(false)
      resetAddForm()
      fetchUsers()
    } catch (e: any) {
      alert(e.response?.data?.message || "Failed to add user")
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = async () => {
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
      const res = await editUserById(getEditValues(), token, selectedEditId)
      alert(res.message)
      setIsEditDialogOpen(false)
      resetEditForm()
      fetchUsers()
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(e.response?.data?.message || "Failed to edit user")
    } finally {
      setLoading(false)
    }
  }

  const handleSortUser = () => {
    setDataUser([...dataUser].sort((a, b) => a.username.localeCompare(b.username)))
  }

  const handleSearchState = async () => {
    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllUsers(token, 0, 100, "ASC", searchNameUser)
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      setDataUser(res.data)
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

  const handleExportExcel = async () => {
    setLoading(true)
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      const res = await getAllUsers(token, 0, 10000, "ASC")
      if (!Array.isArray(res.data)) {
        throw new Error("Data not found or invalid format")
      }
      const dataExport = exportToExcel("User", res.data)
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

  const handleDeleteUser = async (id: number) => {
    const token = getCookie("token")
    if (!token) {
      alert("Credential invalid")
      navigate("/login-admin")
      return
    }

    try {
      setLoading(true)
      const res = await deleteUserById(id, token)
      alert(res.message)
      fetchUsers()
    } catch (e: any) {
      if (e.response?.status === 403) {
        alert(e.response.data.message)
        navigate("/login-admin")
        return
      }
      alert(`Failed to delete user: ${e.response?.data?.message || e.message}`)
    } finally {
      setLoading(false)
    }
  }

  const openEditDialog = (item: IUser) => {
    setSelectedEditId(item.id)
    resetEditForm({
      username: item.username,
      status: item.status,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DataTable
        title="User Manajemen"
        searchPlaceholder="Search username..."
        searchValue={searchNameUser}
        onSearchChange={setSearchNameUser}
        onSearchSubmit={handleSearchState}
        onSort={handleSortUser}
        onExport={handleExportExcel}
        onRefresh={fetchUsers}
        isLoading={loading}
        addButton={
          <FormDialog
            title="Add User"
            description="Create a new user account"
            triggerText="Add User"
            onSubmit={handleAddSubmit(handleAddUser)}
            isLoading={loading}
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...registerAdd("username", {
                    required: "Username can't be empty",
                    minLength: { value: 5, message: "Username must be at least 5 characters" },
                  })}
                  placeholder="Enter username"
                />
                {addErrors.username && <p className="text-sm text-red-500">{addErrors.username.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...registerAdd("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  type="password"
                  placeholder="Enter password"
                />
                {addErrors.password && <p className="text-sm text-red-500">{addErrors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  {...registerAdd("confirm_password", {
                    required: "Confirm password is required",
                    validate: (value) => value === watchAdd("password") || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm password"
                />
                {addErrors.confirm_password && (
                  <p className="text-sm text-red-500">{addErrors.confirm_password.message}</p>
                )}
              </div>
            </div>
          </FormDialog>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataUser.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              dataUser.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{item.id}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.username}</div>
                    <div className="text-sm text-muted-foreground sm:hidden">
                      <Badge variant={item.status === "active" ? "default" : "destructive"} className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={item.status === "active" ? "default" : "destructive"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TooltipOverlay text="Edit">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipOverlay>

                      <DialogAlert onDelete={() => handleDeleteUser(item.id)}>
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
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                {...registerEdit("username", {
                  required: "Username can't be empty",
                  minLength: { value: 5, message: "Username must be at least 5 characters" },
                })}
                placeholder="Enter username"
              />
              {editErrors.username && <p className="text-sm text-red-500">{editErrors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup onValueChange={(value) => setEditValue("status", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="edit-active" />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="edit-inactive" />
                  <Label htmlFor="edit-inactive">Inactive</Label>
                </div>
              </RadioGroup>
              {editErrors.status && <p className="text-sm text-red-500">{editErrors.status.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit(handleEditUser)} disabled={loading} className="w-full sm:w-auto">
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

export default User
