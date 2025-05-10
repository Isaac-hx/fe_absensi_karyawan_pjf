export const imageConvert = async (imageUrl: string): Promise<File> => {
    try {
        // Fetch the image as a Blob
        const base64Response = await fetch(imageUrl);
        const blob = await base64Response.blob();

        // Convert Blob to File
        const file = new File([blob], "signature.png", { type: "image/png" });

        return file;
    } catch (error) {
        console.error("Error converting image to File:", error);
        throw new Error("Failed to convert image to File.");
    }
};
