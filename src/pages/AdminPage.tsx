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
            <Header />
                {loading && <Loading/>}

            <div className="flex">
                <div className="">
                    <SideBar/>
                </div>
                <main className="md:ml-71 container p-6 bg-slate-100">
                   <Outlet />
                </main>
            </div>
        </>
    )
}

export default AdminPage