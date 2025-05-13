import type React from "react";
import { Users,Notebook,ShieldUser,Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { UtilityContext } from "../context/UtilityContext"
import { useContext } from "react"
const data =[
      {
        icon:<Home size={20}/>,
        labelComponent:"Dashboard",
        linkTo:"/dashboard-admin"
    },
    {
        icon:<Users size={20}/>,
        labelComponent:"Karyawan",
        linkTo:"karyawan"

    },
        {
        icon:<Notebook size={20}/>,
        labelComponent:"Absensi",
        linkTo:"absensi"

    },
            {
        icon:<ShieldUser size={20}/>,
        labelComponent:"Users",
        linkTo:"users"

    }
]
const SideBar:React.FC = ()=>{
    const [isMenuActive,setMenuIsActive] = useState("Dashboard")
    const {activeSidebar, setActiveSidebar} = useContext(UtilityContext)
    console.log(activeSidebar)
    return(
        <nav className={`relative left-[0]`} >
            {/* Header */}
            <section></section>
            {/* End Header */}

            {/* Body */}
            <section className={`transition-transform  transform duration-300 ease-in-out ease gap-2 h-screen fixed w-70 z-50  space-y-2 bg-white  px-1 items-center ${activeSidebar ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="mt-4">

                {
                    data.map((item)=>{
                        return(
                    <Link  
                    to={item.linkTo}
                    onClick={()=>{setMenuIsActive(item.labelComponent)}}
                    className={`flex ${isMenuActive === item.labelComponent ? " bg-slate-100 border-l-4 border-emerald-500 text-emerald-500  " :""}  items-center gap-x-3 gap-y-8 md:gap-y-10 cursor-pointer hover:bg-slate-100 px-4 py-2  rounded-sm cli:bg-slate-100`}>
                        {item.icon}
                        <p className={`text-sm md:text-lg font-medium  ${isMenuActive === item.labelComponent? 'text-emerald-500':""}`}>{item.labelComponent}</p>
                    </Link>
                        )
                    })
                }
                </div>


            </section>
            {/* End Body */}
        </nav>
    )
}

export default SideBar