import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
  
    return (
        <div className="w-3/4 rounded-md shadow-sm mx-auto p-4 bg-white">
            {children}
        </div>
    );
};

export default Card;