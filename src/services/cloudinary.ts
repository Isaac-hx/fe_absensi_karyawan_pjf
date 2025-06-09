import axios from 'axios';

const url = import.meta.env.VITE_CLOUDINARY_URL;

export const postImage = async (data: any) => {
    const formData = new FormData();
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET
    const cloud_name = import.meta.env.VITE_CLOUD_NAME
    if(upload_preset == undefined || cloud_name == undefined || url == undefined){
        throw new Error("Upload preset or cloud name is undefined")
    }
    formData.append('file', data);
    formData.append('cloud_name', cloud_name);
    formData.append('upload_preset', upload_preset);

    try {
        const response = await axios.post(url, formData, {
            headers: {

                'Content-Type': 'multipart/form-data',
            },
        });

    

        return response;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};                
