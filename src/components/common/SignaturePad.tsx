import type React from "react";
import SignatureCanvas from "react-signature-canvas";

interface ISignature {
  textLabel: string;
  sigCanvas: React.RefObject<null>;
  handleClearSignature: (e: any) => void;
}

const SignaturePad: React.FC<ISignature> = ({ textLabel, sigCanvas, handleClearSignature }) => {
  return (
    <div className="space-y-1 relative">
      {/* Label */}
      <p className="font-medium text-sm">{textLabel}</p>

      {/* Signature Canvas */}
      <div className="relative">
        <SignatureCanvas
          ref={sigCanvas}
          backgroundColor="rgba(0, 0, 0, 0.05)"
          penColor="black"
          canvasProps={{ height: 200, className: "sigCanvas w-full rounded-md" }}
        />

        {/* Clear Button */}
        <button
          onClick={(e) => handleClearSignature(e)}
          className="absolute bottom-2 right-2 bg-slate-500 text-white text-sm px-4 py-1 rounded hover:bg-slate-600 focus:outline-none"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;