export function getAverageColor(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctx.getImageData(0, 0, image.width, image.height).data;

  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    totalRed += imageData[i];
    totalGreen += imageData[i + 1];
    totalBlue += imageData[i + 2];
  }

  const pixelCount = imageData.length / 4;

  const averageRed = totalRed / pixelCount;
  const averageGreen = totalGreen / pixelCount;
  const averageBlue = totalBlue / pixelCount;

  return `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
}
