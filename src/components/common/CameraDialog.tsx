import { Button } from "@/components/ui/button"
import DialogOverlay from "./DialogOverlay"
import Webcam from "react-webcam"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
const CameraDialog = ()=> {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" type="button">Ambil Foto</Button>
        </DialogTrigger>
        <DialogOverlay data={{
            title:"Ambil foto",
            description:"",
            handleSubmit:()=>{},
            submit:()=>{},
            button:"Ambil Foto"
        }}>
            <div>
            <Webcam mirrored={true}/>
            </div>
        </DialogOverlay>
    </Dialog>

  )
}


export default CameraDialog