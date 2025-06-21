import Header from "@/components/common/Header"
import SideBar from "@/components/common/Sidebar"
import { Outlet } from "react-router"
import { UtilityContext } from "@/components/context/UtilityContext";
import { useContext } from "react";
import Loading from "@/components/common/Loading";

const AdminPage:React.FC = ()=>{
    const {loading} = useContext(UtilityContext)
    return(
        <>
<div>
    {loading && <Loading/>}
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="md:grid  md:grid-cols-5">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 lg:w-1/5">
                <SideBar />
            </div>

            {/* Main Content */}
            <main className="flex-1 col-span-4  bg-slate-100 p-6">
                <Outlet />
            </main>
        </div>
</div>
  
        </>
    )
}

export default AdminPage