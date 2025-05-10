import type React from "react";
import { Camera } from "@phosphor-icons/react";
import Input from "./Input";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

interface IPhotoInput {
    handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
}

const InputPhoto: React.FC<IPhotoInput> = ({ handlePhotoChange }) => {
    const { data } = useContext(AppContext);
    return (
        <>
            <p className="font-medium text-sm">Foto absen</p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center cursor-pointer">
                {data.preview_photo ? (
                    <img
                        src={data.preview_photo}
                        alt="Uploaded"
                        className="w-32 h-32 object-cover rounded-full mb-4"
                    />
                ) : (
                    <div className="flex flex-col items-center mb-4">
                        <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center">
                            <Camera size={24} />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Upload or capture your photo
                        </p>
                    </div>
                )}

                <Input
                    labelText="Upload photo"
                    idInput="file_profile"
                    placeholder="Upload foto absen"
                    type="file"
                    onChangeInput={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>
        </>
    );
};

export default InputPhoto;