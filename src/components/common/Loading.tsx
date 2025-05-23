import { Loader } from "lucide-react"


const Loading = () => {
  return (
    <div className="fixed h-screen w-full z-20 flex items-center justify-center">
        <Loader size={40}  className="animate-spin text-slate-700"/>
    </div>
  )
}

export default Loading