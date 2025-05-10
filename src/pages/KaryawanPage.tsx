import React, { useContext, useRef } from "react";
import Card from "../components/layout/Card";
import CardHeader from "../components/common/CardHeader";
import { AppContext } from "../components/context/AppContext";
import CardFooter from "../components/common/CardFooter";
import CardBody from "../components/common/CardBody";
import Swal from 'sweetalert2'
import { postData } from "../services/cloudinary";
const KaryawanPage: React.FC = () => {
    const { data, setData } = useContext(AppContext);
    const sigCanvas = useRef<any>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(data.url_photo);
        // Ambil data tanda tangan
        const signatureData = sigCanvas.current?.toDataURL("image/png");
        
        // Perbarui state dengan signature image
        setData((prevData: any) => ({
            ...prevData,
            signature_image: signatureData,
        }));
        try{
            const res = await postData(data.url_photo)
            console.log(res)
        } catch(error){
            return Swal.fire({
                title: "Gagal absensi",
                icon: "error",
            });
        }

    };

    return (
        <div className="p-2 md:p-10 bg-slate-100 z-1">
            <Card >
                {/* Start Header section */}
                <section className="space-y-2">
                    <CardHeader />
                </section>
                {/* End Header section */}
                <section>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <CardBody sigCanvas={sigCanvas} />
                        <div className="flex justify-center">
                            <CardFooter />
                        </div>
                    </form>
                </section>
                {/* End body section */}
            </Card>
        </div>
    );
};

export default KaryawanPage;