import React, { useContext, useRef } from "react";
import Card from "../components/layout/Card";
import CardHeader from "../components/common/CardHeader";
import { AppContext } from "../components/context/AppContext";
import CardFooter from "../components/common/CardFooter";
import CardBody from "../components/common/CardBody";
import Swal from 'sweetalert2'
import { imageConvert } from "../helper/imageConvert";
import { postToCloudinary } from "../data/postToCloudinary";
import { getCurrentDateAndTime } from "../helper/getClock";
const KaryawanPage: React.FC = () => {
    const { data, setData } = useContext(AppContext);
    const sigCanvas = useRef<any>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ambil data tanda tangan
        const signatureData = sigCanvas.current?.toDataURL("image/png");
        const signatureImage = await imageConvert(signatureData)
        const {date,time} = getCurrentDateAndTime()

        try{
            //Get url data from cloudinary
            const {url_profile,url_signature} = await postToCloudinary(data.file_profile,signatureImage)
                    
            const to_up = {
                id_karyawan:data.employee_id,
                url_profile:url_profile,
                url_signature:url_signature,
                target_work:data.target_work,
                result_work:data.result_work,
                location:data.location,
                create_date:date,
                create_time:time
            
            }
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
                <hr className="text-slate-200 my-4 border-1"/>
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