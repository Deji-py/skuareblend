import React from "react";
import imageCompression from "browser-image-compression";

async function compressImagesForUpload(files) {
  const compressedImages = [];

  for (const imageFile of files) {
    const options = {
      maxSizeMB: 0.5, // Set a smaller maxSizeMB value (e.g., 0.5 for 0.5 MB)
      maxWidthOrHeight: 1280, // Set a smaller maxWidthOrHeight value
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB

      compressedImages.push(compressedFile);
    } catch (e) {
      console.log(e);
    }
  }
  return compressedImages;
}
export default compressImagesForUpload;
