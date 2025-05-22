import { Loader } from "lucide-react"


const Loading = () => {
  return (
    <div className="fixed  h-screen w-4/5 z-20 flex items-center justify-center">
        <Loader size={40}  className="animate-spin text-slate-400"/>
     
    </div>
  )
}

export default Loading