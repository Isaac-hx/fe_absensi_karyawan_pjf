import React, { useContext, useRef, useState } from "react";
import Card from "../components/layout/Card";
import CardHeader from "../components/common/CardHeader";
import { AppContext } from "../components/context/AppContext";
import CardBody from "../components/common/CardBody";
import Swal from 'sweetalert2'
import { imageConvert } from "../helper/imageConvert";
import { postToCloudinary } from "../data/postToCloudinary";
import { getCurrentDateAndTime } from "../helper/getClock";
import { useForm } from "react-hook-form";
import type {AbsenFormValues } from "@/data/absen";
import {Button} from "@/components/ui/button"
import Webcam from "react-webcam"

const AbsenPage: React.FC = () => {
    const { data } = useContext(AppContext);
    const [photo,setPhoto] = useState<string | null>("")
    
    /**
     * Reference to the signature canvas element.
     * Used to access and manipulate the signature pad component directly.
     * 
     */
    const sigCanvas = useRef<any>(null);


    const {
       register,
       formState:{errors},
       handleSubmit,
       reset,
       setValue,
       getValues
    } = useForm<AbsenFormValues>();
    
    const onSubmitForm = async (data:AbsenFormValues) => {
        // Ambil data tanda tangan
        const signatureData = sigCanvas.current?.toDataURL("image/png");
        const signatureImage = await imageConvert(signatureData)
        const date_time = getCurrentDateAndTime()
        
        //ambil data photo
        const photoImage = await imageConvert(photo)
        
        console.log(photoImage)


        try{
            //Get url data from cloudinary
            const {url_profile,url_signature} = await postToCloudinary(photoImage,signatureImage)
            console.log(url_profile,url_signature)  
            
            // const to_up = {
            //     id_employee:data.employee_id,
            //     url_profile:url_profile,
            //     url_signature:url_signature,
            //     target_work:data.target_work,
            //     result_work:data.result_work,
            //     location:data.location,
            //     create_date:date_time,
 
            
            // }
            setValue("url_profile", url_profile)
            setValue("url_signature", url_signature)
            setValue("create_date",date_time)
            sigCanvas.current.clear()
            setPhoto("")
            const updatedValues = getValues();
            console.log("Updated Values: ", updatedValues);
        } catch(error){
            return Swal.fire({
                title: "Gagal absensi",
                icon: "error",
            });
        }finally{
            reset()

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
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <CardBody  register={register} error={errors} sigCanvas={sigCanvas}   setValue={setValue} photo={photo} setPhoto={setPhoto}/>
                        <div className="flex justify-center">
                            <Button className="p-2 w-full cursor-pointer shadow-sm rounded-md bg-emerald-500 text-white txt-md md:text-lg  font-medium mt-2" type="submit">
                                Absen
                            </Button>
                        </div>
                    </form>
                </section>
                {/* End body section */}
            </Card>
        </div>
    );
};

export default AbsenPage;