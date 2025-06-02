export const imageConvert = async (imageUrl: string ): Promise<File> => {
    try {
        // Fetch the image as a Blob
        const base64Response = await fetch(imageUrl);
        const blob = await base64Response.blob();

        // Convert Blob to File
        const file = new File([blob], imageUrl.slice(0,5), { type: "image/png" });

        return file;
    } catch (error) {
        console.error("Error converting image to File:", error);
        throw new Error("Failed to convert image to File.");
    }
};

export async function svgPathToImageFile(
  svgPaths: string,
  format: 'png' | 'jpeg' = 'png',
  width: number = 500,
  height: number = 500,
): Promise<File> {
  const svgElement = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      ${svgPaths}
    </svg>
  `;

  const svgBlob = new Blob([svgElement], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.src = url;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (err) => reject(err);
  });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context is not available');

  ctx.drawImage(img, 0, 0, width, height);
  URL.revokeObjectURL(url);

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `image.${format}`, { type: `image/${format}` });
          resolve(file);
        } else {
          reject(new Error('Failed to create image blob'));
        }
      },
      `image/${format}`,
      1.0
    );
  });
}