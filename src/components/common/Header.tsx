"use client"

import type React from "react"

import { User, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UtilityContext } from "../context/UtilityContext"
import { AppContext } from "../context/AppContext"
import { useContext } from "react"
import { Link } from "react-router"

interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { activeSidebar, setActiveSidebar, menuState } = useContext(UtilityContext)
  const { globalUser } = useContext(AppContext)

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location.reload()
  }

  const getUserInitials = (username: string) => {
    return (
      username
        ?.split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "AD"
    )
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      {/* Logo - Hidden on mobile when sidebar is open */}
      <div
        className={`flex-shrink-0 transition-opacity duration-200 ${activeSidebar ? "opacity-0 md:opacity-100" : "opacity-100"}`}
      >
        <Link to="/dashboard-admin" className="flex items-center">
          <img src="/main_icon.png" width={40} height={40} alt="Logo" className="rounded-lg" />
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setActiveSidebar(!activeSidebar)}
        aria-label={activeSidebar ? "Close menu" : "Open menu"}
      >
        {activeSidebar ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Page Title */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <h1 className="text-lg font-semibold text-foreground truncate">{title || menuState || "Dashboard"}</h1>
        {menuState && (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {menuState}
          </Badge>
        )}
      </div>

      {/* User Dropdown */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium">{globalUser?.username || "Admin"}</span>
          <span className="text-xs text-muted-foreground">Administrator</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={ "/placeholder-user.jpg"} alt={globalUser?.username || "User"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getUserInitials(globalUser?.username || "Admin")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{globalUser?.username || "Administrator"}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
7