import React, { useContext, useRef, useState } from "react";
import Card from "../components/layout/Card";
import CardHeader from "../components/common/CardHeader";
import CardBody from "../components/common/CardBody";
import Swal from 'sweetalert2'
import { imageConvert,svgPathToImageFile } from "../helper/imageConvert";
import { postToCloudinary } from "../data/postToCloudinary";
import { getCurrentDateAndTime } from "../helper/getClock";
import { useForm } from "react-hook-form";
import type {AbsenFormValues } from "@/data/absen";
import {Button} from "@/components/ui/button"
import Loading from "@/components/common/Loading";
import { UtilityContext } from "@/components/context/UtilityContext";


const AbsenPage: React.FC = () => {
    const {loading,setLoading} = useContext(UtilityContext)
    const [photo,setPhoto] = useState<string | null>("")
    const [signature, setSignature] = useState<string[]>([]);
    
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
    
    const onSubmitForm = async () => {
        setLoading(true)
        const signatureData = sigCanvas.current.svg.innerHTML;
             
        //Ambil data waktu
        const date_time = getCurrentDateAndTime()

        const updatedValues = getValues();
        
        const isAnyFieldEmpty = Object.values(updatedValues).some(
            (value) => value === undefined || value === null || value === ""
        );
        if (Object.keys(updatedValues).length === 0 || isAnyFieldEmpty) {
            throw new Error("Semua field harus diisi");
        }

        if (photo === null) {
            throw new Error("Photo kosong");
        }
        // Ambil data tanda tangan
        const signatureImage = await svgPathToImageFile(signatureData)

      
        //ambil data photo
        const photoImage = await imageConvert(photo)
        
    


        try{
            //Get url data from cloudinary
            const {url_profile,url_signature} = await postToCloudinary(photoImage,signatureImage)
            
            setValue("url_profile", url_profile)
            setValue("url_signature", url_signature)
            setValue("create_date",date_time)
            //clear input
            sigCanvas.current.clear()
            setPhoto("")
            return Swal.fire({
                title:"Sucess absensi",
                icon: "success",
            })
        } catch(error){
            return Swal.fire({
                title: "Gagal absensi",
                icon: "error",
                text: String(error)
            });
        }finally{
            setLoading(false)
            reset()


        }
        

    };



    return (
        <>
        {loading && <Loading className="bg-black/10"/>}

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
                        <CardBody  register={register} error={errors} sigCanvas={sigCanvas}   setValue={setValue} photo={photo} setPhoto={setPhoto} />
                        <div className="flex justify-center">
                            <Button className="p-2 w-full cursor-pointer shadow-sm rounded-md bg-emerald-500 text-white txt-md md:text-lg hover:bg-emerald-600  font-medium mt-2" type="submit">
                                Absen
                            </Button>
                        </div>
                    </form>
                </section>
                {/* End body section */}
            </Card>
        </div>
                </>
    );
};

export default AbsenPage;