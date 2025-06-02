import type React from "react";
import Signature from '@uiw/react-signature';
import { Button } from "@/components/ui/button";
interface ISignature {
  sigCanvas: React.RefObject<null>;
  handleClearSignature: (e: any) => void;

}

const SignaturePad: React.FC<ISignature> = ({  sigCanvas, handleClearSignature }) => {

  return (
    <div className="space-y-1 relative ">
 

      {/* Signature Canvas */}

        <div className="md:block w-full">
        <Signature
          ref={sigCanvas}
  

        />

        </div>
 
        {/* Clear Button */}
        <Button
          onClick={handleClearSignature}
          className="absolute bottom-2 right-2 bg-emerald-500 text-white text-sm px-4 py-1 rounded hover:bg-emerald-600 focus:outline-none"
        >
          Clear
        </Button>
      </div>
  );
};

export default SignaturePad;