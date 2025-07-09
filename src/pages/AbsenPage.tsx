import React, { useContext, useRef, useState } from "react";
import Card from "../components/layout/Card";
import CardHeader from "../components/common/CardHeader";
import  CardBody from "../components/common/CardBody";
import Swal from 'sweetalert2'
import { imageConvert,svgPathToImageFile } from "../helper/imageConvert";
import { postToCloudinary } from "../data/postToCloudinary";
import { getCurrentDateAndTime } from "../helper/getClock";
import { useForm } from "react-hook-form";
import {Button} from "@/components/ui/button"
import Loading from "@/components/common/Loading";
import { UtilityContext } from "@/components/context/UtilityContext";
import { createAbsensi } from "@/services/absensi";
import type { AbsenFormValues } from "@/types/form";

const AbsenPage: React.FC = () => {
    const {loading,setLoading} = useContext(UtilityContext)
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
    
    const onSubmitForm = async () => {
        setLoading(true)
        const signatureData = sigCanvas.current.svg.innerHTML;
        //Ambil data waktu
        const date_time = getCurrentDateAndTime()

        
        const currentHour = new Date().getHours()
        if(currentHour >= 5 && currentHour <10){
            setValue("check_in",getCurrentDateAndTime())
        }else{
            setValue("check_out",getCurrentDateAndTime())
        }
        

        const updatedValues = getValues();

        if (updatedValues.karyawan_id) {
            const karyawanId = Number(updatedValues.karyawan_id);

            if (isNaN(karyawanId)) {
                throw new Error("Invalid karyawan_id: Must be a number");
            }  
            setValue("karyawan_id",karyawanId)      
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
            const  res = await createAbsensi(getValues())
            //clear input
            return Swal.fire({
                title:"Sucess absensi",
                icon: "success",
                html:`
                    <p>Karyawan ID: ${String(Array.isArray(res.data) ? res.data[0] : res.data?.karyawan_id)}</p>

          <p>Nama: ${String(Array.isArray(res.data) ? res.data[0] : res.data?.name)}</p>
                `
            })
        } catch(error:any){
            return Swal.fire({
                title: "Gagal absensi",
                icon: "error",
                text: String(error.response.data.message)
            });
        }finally{
            reset()
            sigCanvas.current.clear()
            setPhoto("")
            setLoading(false)


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