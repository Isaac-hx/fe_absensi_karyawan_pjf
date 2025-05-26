import React, { useCallback, useRef, useState } from "react";
import { Camera  } from "lucide-react";
import Webcam from "react-webcam"
import { Dialog,DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DialogOverlay from "./DialogOverlay";

const PhotoInput:React.FC<{webCamRef:React.RefObject<any>}> = ({webCamRef})=> {
  const [photo, setPhoto] = useState<string | null>(null);


const handleScreenshot = async () => {
  if (webCamRef.current) {
    // Type assertion to access getScreenshot method
    const image = (webCamRef.current as Webcam).getScreenshot();
    setPhoto(image);
  }
}

  return (
    <div className="w-full max-w-md mx-auto">
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
          <DialogOverlay data={{
              title:"Ambil foto",
              description:"",
              handleSubmit:(fn: () => void) => fn(),
              submit:handleScreenshot,
              button:"Ambil Foto"
          }

          } closeDialog={true}>
              <div>
              <Webcam 
              screenshotFormat="image/jpeg"
              ref={webCamRef}
              mirrored={true}/>
              </div>
          </DialogOverlay>
      </Dialog>
      </div>
    </div>
  );
}

export default PhotoInput