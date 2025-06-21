import { Loader } from "lucide-react"


const Loading:React.FC<{className?:string}> = ({className}) => {
  return (
    <div className={`fixed h-screen ${className} bg-black/20  w-full z-20 flex items-center justify-center`}>
        <Loader size={40}  className="animate-spin text-slate-700"/>
    </div>
  )
}

export default Loading