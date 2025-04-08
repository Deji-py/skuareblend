import { Box, Center, Grid, GridItem, Image } from "@chakra-ui/react";
import { memo } from "react";
import { FaImages } from "react-icons/fa";

function ProducImagesView({ images, isPreview, imageRef }) {
  return (
    <>
      <Box className="w-full relative h-[200px]">
        {!isPreview && (
          <Center
            onClick={() => imageRef.current.click()}
            pos={"absolute"}
            className="absolute w-full h-full top-0 left-0 text-white bg-[rgba(0,0,0,0.5)]"
          >
            <Center flexDir={"column"} className="text-center">
              <FaImages size={30} />
              <p className="font-bold">Upload Products</p>
              <p>Max{"(5)"}</p>
            </Center>
          </Center>
        )}

        {images[0] && (
          <Image
            alt="preview"
            className="w-full h-full object-cover"
            src={isPreview ? images[0] : URL.createObjectURL(images[0])}
          />
        )}
      </Box>
      <Grid gridTemplateColumns={"repeat(4, 1fr)"} className="mt-2">
        <GridItem>
          <Box className="w-20 h-20 bg-gray-100">
            {images[1] && (
              <Image
                alt="preview"
                className="w-full h-full object-cover"
                src={isPreview ? images[1] : URL.createObjectURL(images[1])}
              />
            )}
          </Box>
        </GridItem>
        <GridItem>
          <Box className="w-20 h-20 bg-gray-100">
            {images[2] && (
              <Image
                alt="preview"
                className="w-full h-full object-cover"
                src={isPreview ? images[2] : URL.createObjectURL(images[2])}
              />
            )}
          </Box>
        </GridItem>
        <GridItem>
          <Box className="w-20 h-20 bg-gray-100">
            {images[3] && (
              <Image
                alt="preview"
                className="w-full h-full object-cover"
                src={isPreview ? images[3] : URL.createObjectURL(images[3])}
              />
            )}
          </Box>
        </GridItem>
        <GridItem>
          <Box className="w-20 h-20 bg-gray-100">
            {images[4] && (
              <Image
                alt="preview"
                className="w-full h-full object-cover"
                src={isPreview ? images[4] : URL.createObjectURL(images[4])}
              />
            )}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default memo(ProducImagesView);
