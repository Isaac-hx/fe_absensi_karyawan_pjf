"use client"

import type React from "react"

import Header from "@/components/common/Header"
import SideBar from "@/components/common/Sidebar"
import Loading from "@/components/common/Loading"
import { Outlet } from "react-router"
import { UtilityContext } from "@/components/context/UtilityContext"
import { useContext, useEffect } from "react"
import { cn } from "@/lib/utils"

const AdminPage: React.FC = () => {
  const { loading, activeSidebar, setActiveSidebar } = useContext(UtilityContext)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setActiveSidebar(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setActiveSidebar])

  return (
    <div className="min-h-screen bg-background">
      {/* Loading Overlay */}
      {loading && <Loading />}

      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            "md:ml-64", // Always offset by sidebar width on desktop
            "min-h-[calc(100vh-4rem)]", // Account for header height
          )}
        >
          <div className="bg-muted/30 p-4 lg:p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminPage
