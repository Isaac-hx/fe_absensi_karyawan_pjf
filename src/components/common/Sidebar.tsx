import type React from "react";
import { Users,Notebook,ShieldUser,Home } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { UtilityContext } from "../context/UtilityContext"
import { useContext } from "react"
import { capitalize } from "@/helper/capitalize";

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
    const location = useLocation()
    const {activeSidebar,setMenuState,menuState} = useContext(UtilityContext)
    useEffect(() => {
        const splitLocation = location.pathname.split("/");
        const lastSegment = splitLocation[splitLocation.length - 1];

        setMenuState(lastSegment === "dashboard-admin" ? "Dashboard" : capitalize(lastSegment));
    }, []);
    
    return(
        <nav className={`relative left-[0] h-screen`} >
            

            {/* Body */}
            <section className={`transition-transform flex flex-col border-1  transform duration-300 ease-in-out ease gap-2 h-screen fixed w-70 z-50  space-y-2 bg-white  px-1 justify-between ${activeSidebar ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="mt-4">

                {
                    data.map((item)=>{
                        return(
                    <Link 
                    key={item.labelComponent} 
                    to={item.linkTo}
                    onClick={()=>{setMenuState(item.labelComponent)}}
                    className={`flex ${menuState === item.labelComponent ? " bg-slate-100 border-l-4 border-emerald-500 text-emerald-500  " :""}  items-center gap-x-3 gap-y-8 md:gap-y-10 cursor-pointer hover:bg-slate-100 px-4 py-2  rounded-sm cli:bg-slate-100`}>
                        {item.icon}
                        <p className={`text-sm md:text-lg font-medium ${menuState === item.labelComponent? 'text-emerald-500':""}`}>{item.labelComponent}</p>
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