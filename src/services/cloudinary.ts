import axios from 'axios';

const url = "https://api.cloudinary.com/v1_1/dy374g0xl/image/upload";

export const postImage = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('cloud_name', "dy374g0xl");
    formData.append('upload_preset', 'picture_save');

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
