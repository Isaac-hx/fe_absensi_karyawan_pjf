import CardHeader from "../common/CardHeader";
import CardBody from "../common/CardBody";
import CardFooter from "../common/CardFooter";
import { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import Swal from 'sweetalert2'

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
  const { data,setData } = useContext(AppContext);
  const sigCanvas = useRef<any>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    console.log(data.url_photo)
    // Ambil data tanda tangan
    const signatureData = sigCanvas.current?.toDataURL("image/png");
  
    // Perbarui state dengan signature image
setData((prevData: any) => ({
    ...prevData,
    signature_image: signatureData,
}));
  return Swal.fire({
    title:"Gagal",
    icon:"error"
  });

    // Anda juga bisa log data setelah pembaruan state selesai jika diperlukan
  };
    return (
        <div className="w-3/4 rounded-md shadow-sm mx-auto p-4">
            {/* Start Header section */}
            <section className="space-y-2">
                <CardHeader/>
            </section>
            {/* End Header section */}

            <hr className="my-3 text-slate-100" />

            {/* Start body section */}
            <section>
                <form  onSubmit={(e)=>{handleSubmit(e)}}>

                    <CardBody sigCanvas={sigCanvas}/>
                    
                    <div className="flex justify-center">
                        <CardFooter/>
                    </div>
                </form>
            </section>
            {/* End body section */}
        </div>
    );
};

export default Card;