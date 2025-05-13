import Header from "@/components/common/Header"
import SideBar from "@/components/common/Sidebar"
import { Outlet } from "react-router"



const AdminPage:React.FC = ()=>{
    return(
        <>
            <Header />
            <div className="flex">
                <div className="">
                    <SideBar/>
                </div>
                <main className="md:ml-71 container p-4 bg-slate-50">
                   <Outlet />
                </main>
            </div>
        </>
    )
}

export default AdminPage