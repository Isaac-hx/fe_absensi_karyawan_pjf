import Header from "@/components/common/Header"
import SideBar from "@/components/common/Sidebar"
import { Outlet } from "react-router"



const AdminPage:React.FC = ()=>{
    return(
        <>
            <Header />
            <div className="flex overflow-hidden">
                <SideBar/>
                <Outlet />
            </div>
        </>
    )
}

export default AdminPage