import React, {  useRef } from "react";
import { Camera  } from "lucide-react";
import Webcam from "react-webcam"
import { Dialog,DialogHeader,DialogTrigger,DialogTitle,DialogFooter,DialogClose,DialogContent,DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PhotoInput:React.FC<{photo:string | null,setPhoto:React.Dispatch<React.SetStateAction<string | null>>}> = ({photo,setPhoto})=> {
    const webCamRef = useRef(null);

const handleScreenshot = async () => {
  if (webCamRef.current) {
    // Type assertion to access getScreenshot method
    const image = (webCamRef.current as Webcam).getScreenshot()
    setPhoto(image);

  }
}

  return (
    <div className="w-full  mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center">
        {photo ? (
          <img
            src={photo}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
        ) : (
          <div className="flex flex-col items-center mb-4">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
            <Camera size={24}/>
            </div>
            <p className="text-sm text-gray-500 mt-2">Ambil Photo absen</p>
          </div>
        )}

        {/* sdsds */}

      <Dialog>
          <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" type="button">Ambil Foto</Button>
          </DialogTrigger>
          <DialogContent>
             <DialogHeader>
              <DialogTitle>Ambil Foto</DialogTitle>
          </DialogHeader>
          <DialogDescription>
                <Webcam 
              screenshotFormat="image/jpeg"
              ref={webCamRef}
              mirrored={true}/>
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
            <Button onClick={handleScreenshot}  className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" type="submit">Ambil Foto</Button>
          </DialogClose>
          </DialogFooter>
          </DialogContent>
         

      </Dialog>
      </div>
    </div>
  );
}

export default PhotoInput