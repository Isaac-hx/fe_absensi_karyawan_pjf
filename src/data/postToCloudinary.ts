import { postImage } from "../services/cloudinary"


export const postToCloudinary = async (file_profile: File | null | undefined, file_signature: File | null) => {
    try {
        // Upload the profile image
        const res_profile = await postImage(file_profile);
       

        // Upload the signature image
        const res_signature = await postImage(file_signature);
        // Return both URLs
        return {
            url_profile: res_profile.data.url, // Assuming secure_url is returned by Cloudinary
            url_signature: res_signature.data.url,
        };
    } catch (error) {
        console.error("Error uploading images to Cloudinary:", error);

        throw error
    }
};