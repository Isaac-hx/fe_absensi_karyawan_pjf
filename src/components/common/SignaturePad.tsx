import React, { useRef } from "react";
import Signature from "@lemonadejs/signature";

const SignaturePad = () => {
  const signatureRef = useRef(null);

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signatureData = signatureRef.current.toDataURL();
    console.log(signatureData); // Data URL dari tanda tangan (format PNG)
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Signature Pad</h1>

      {/* Canvas for Signature */}
      <div className="w-full border-2 border-gray-300 rounded-lg overflow-hidden">
        <Signature
          ref={signatureRef}
          width={500}
          height={300}
          className="w-full h-full"
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-200"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
