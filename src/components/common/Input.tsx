import type React from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

interface IInput {
    labelText: string;
    idInput: string;
    placeholder: string;
    type?: string; // Optional, karena tidak semua input membutuhkan `type`
    as?: "input" | "textarea"; // Menentukan apakah ini `input` atau `textarea`
    accept?: string;
    className?: string;
    readonly?: boolean;
    value?:string
    rows?: number; // Untuk menentukan jumlah baris pada textarea
    onChangeInput?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Handler perubahan

}

const Input: React.FC<IInput> = ({
    labelText,
    idInput,
    placeholder,
    type = "text", // Default type untuk input
    as = "input", // Default elemen yang digunakan adalah `input`
    onChangeInput,
    accept,
    className,
    value,
    readonly = false,
    rows = 4, // Default jumlah baris untuk textarea
}) => {


    return (
        <div className="">
            <label className="font-medium text-sm" htmlFor={idInput}>
                {labelText}
            </label>
            {as === "input" ? (
                <input
                    id={idInput}
                    name={idInput}
                    type={type}
                    accept={accept}
                    readOnly={readonly}
                    value={value}
                    required
                    placeholder={placeholder}
                    className={`${className} w-full text-sm px-2 py-3 outline-none focus:ring-emerald-300 ring-emerald-200`}
                    onChange={onChangeInput}
                />
            ) : (
                <textarea
                    id={idInput}
                    name={idInput}
                    rows={rows}
                    readOnly={readonly}
                    required
                    value={value}
                    placeholder={placeholder}
                    className={`${className} w-full text-sm p-1 ring-2 mt-1 outline-none rounded-sm focus:ring-emerald-500 ring-emerald-200`}
                    onChange={onChangeInput}
                />
            )}
        </div>
    );
};

export default Input;
