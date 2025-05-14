import type React from "react";
interface ITextLabel{
    text:string
}
const TextLabel:React.FC<ITextLabel>=({text})=>{
    return(
    <h1 className="text-lg  md:text-2xl font-semibold leading-relaxed m-4">{text}</h1>

    )
}

export default TextLabel