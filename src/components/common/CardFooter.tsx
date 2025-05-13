import type React from "react";

const CardFooter: React.FC = () => {
    return (
        <>
            <button
                className="p-2 w-full cursor-pointer shadow-sm rounded-md bg-emerald-500 text-white txt-md md:text-lg  font-medium"
                type="submit"
            >
                Absen
            </button>
        </>
    );
};

export default CardFooter;
