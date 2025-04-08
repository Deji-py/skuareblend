export function getCroppedImageBlob(image, crop) {
  return new Promise((resolve, reject) => {
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(image);

    imageElement.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = imageElement.naturalWidth / imageElement.width;
      const scaleY = imageElement.naturalHeight / imageElement.height;

      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imageElement,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    };

    imageElement.onerror = (error) => {
      reject(error);
    };
  });
}
