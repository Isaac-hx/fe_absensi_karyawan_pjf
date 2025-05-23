// import type React from "react";
// import { Camera } from "lucide-react";
// import Input from "./Input";
// import { AppContext } from "../context/AppContext";
// import { useContext } from "react";
// import CameraDialog from "./CameraDialog";

// interface IPhotoInput {
//     handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
//     children:React.ReactNode
// }

// const InputPhoto: React.FC<IPhotoInput> = ({ handlePhotoChange,children }) => {
//     const { data } = useContext(AppContext);
//     return (
//         <>
//             <p className="font-medium text-sm">Foto absen</p>
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer">
//                 {data.preview_photo ? (
//                     <img
//                         src={data.preview_photo}
//                         alt="Uploaded"
//                         className="w-32 h-32 object-cover rounded-full mb-4"
//                     />
//                 ) : (
//                     <div className="flex flex-col items-center mb-4">
//                         <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
//                             <Camera size={24} />
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">
//                             Capture your photo
//                         </p>
//                     </div>
//                 )}

                
//             </div>
//         </>
//     );
// };

// export default InputPhoto;