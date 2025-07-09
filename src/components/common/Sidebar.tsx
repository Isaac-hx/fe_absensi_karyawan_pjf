"use client"

import type React from "react"
import { Users, Notebook, ShieldIcon as ShieldUser, Home, ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { Link, useLocation } from "react-router"
import { UtilityContext } from "../context/UtilityContext"
import { useContext } from "react"
import { capitalize } from "@/helper/capitalize"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavigationItem {
  icon: React.ReactNode
  labelComponent: string
  linkTo: string
  badge?: number
}

const navigationData: NavigationItem[] = [
  {
    icon: <Home size={20} />,
    labelComponent: "Dashboard",
    linkTo: "/dashboard-admin",
  },
  {
    icon: <Users size={20} />,
    labelComponent: "Karyawan",
    linkTo: "karyawan",
  },
  {
    icon: <Notebook size={20} />,
    labelComponent: "Absensi",
    linkTo: "absensi",
  },
  {
    icon: <ShieldUser size={20} />,
    labelComponent: "Users",
    linkTo: "users",
  },
]

const SideBar: React.FC = () => {
  const location = useLocation()
  const { activeSidebar, setActiveSidebar, setMenuState, menuState } = useContext(UtilityContext)

  useEffect(() => {
    const splitLocation = location.pathname.split("/")
    const lastSegment = splitLocation[splitLocation.length - 1]
    const currentMenu = lastSegment === "dashboard-admin" ? "Dashboard" : capitalize(lastSegment)
    setMenuState(currentMenu)
  }, [location.pathname, setMenuState])

  const handleNavClick = (item: NavigationItem) => {
    setMenuState(item.labelComponent)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setActiveSidebar(false)
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {activeSidebar && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setActiveSidebar(false)} />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform bg-background border-r transition-transform duration-300 ease-in-out md:translate-x-0",
          activeSidebar ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button variant="ghost" size="icon" onClick={() => setActiveSidebar(false)} className="h-8 w-8">
              <ChevronLeft size={16} />
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {navigationData.map((item) => {
                const isActive = menuState === item.labelComponent

                return (
                  <Link
                    key={item.labelComponent}
                    to={item.linkTo}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    <div
                      className={cn("flex-shrink-0")}
                    >
                      {item.icon}
                    </div>

                    <span className="flex-1">{item.labelComponent}</span>

                    {item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <p>Admin Page</p>
              <p className="mt-1">© 2025 Pelita jaya food</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SideBar
