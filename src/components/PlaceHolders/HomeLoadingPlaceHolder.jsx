import React from "react";
import { Box, Flex } from "@chakra-ui/react";

function HomeLoadingPlaceHolder() {
  return (
    <div className="flex w-full flex-col justify-center items-start gap-5 p-3">
      <Box className="bg-gray-200 w-full h-[200px] rounded-2xl  animate-pulse" />
      <Flex className=" flex flex-col gap-2">
        <Box className="bg-gray-200 w-[60vw] animate-pulse h-5 rounded-full" />
        <Box className="bg-gray-200 w-[40vw]  animate-pulse h-5 rounded-full" />
      </Flex>
      <Flex className=" flex flex-row gap-5">
        <Box className="bg-gray-200 w-[20vw]  animate-pulse h-3 rounded-full" />
        <Box className="bg-gray-200 w-[20vw] animate-pulse  h-3 rounded-full" />
        <Box className="bg-gray-200 w-[20vw]  animate-pulse h-3 rounded-full" />
      </Flex>
      <Flex className="flex w-full mt-5 flex-row justify-between items-center">
        <Box className="bg-gray-200 w-[30vw]  animate-pulse h-5 rounded-full" />
        <Box className="bg-gray-200 w-[20vw] animate-pulse  h-5 rounded-full" />
      </Flex>
      <Box className=" flex flex-col justify-center items-center shadow-gray-100  rounded-md w-full p-2">
        <Flex className="flex w-full flex-row justify-start gap-5 items-center">
          <Box className="bg-gray-200 w-[70px] animate-pulse  h-[70px] rounded-md" />
          <Box className="flex flex-col gap-2">
            <Box className="bg-gray-200 w-[60vw] animate-pulse h-4 rounded-full" />
            <Box className="bg-gray-200 w-[20vw] animate-pulse h-4 rounded-full" />
            <Flex className=" flex flex-row gap-5">
              <Box className="bg-gray-200 w-[10vw] animate-pulse h-3 rounded-full" />
              <Box className="bg-gray-200 w-[10vw] animate-pulse h-3 rounded-full" />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box className=" flex flex-col justify-center items-center shadow-gray-100  rounded-md w-full p-3">
        <Flex className="flex w-full flex-row justify-start gap-5 items-center">
          <Box className="bg-gray-200 w-[70px] animate-pulse  h-[70px] rounded-md" />
          <Box className="flex flex-col gap-2">
            <Box className="bg-gray-200 w-[60vw] animate-pulse h-4 rounded-full" />
            <Box className="bg-gray-200 w-[20vw] animate-pulse h-4 rounded-full" />
            <Flex className=" flex flex-row gap-5">
              <Box className="bg-gray-200 w-[10vw] animate-pulse h-3 rounded-full" />
              <Box className="bg-gray-200 w-[10vw] animate-pulse h-3 rounded-full" />
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box className=" flex flex-col justify-center items-center shadow-gray-100  rounded-md w-full p-3">
        <Flex className="flex w-full flex-row justify-start gap-5 items-center">
          <Box className="bg-gray-200 w-[70px] animate-pulse  h-[70px] rounded-md" />
          <Box className="flex flex-col gap-2">
            <Box className="bg-gray-200 w-[60vw] animate-pulse h-4 rounded-full" />
            <Box className="bg-gray-200 w-[20vw] animate-pulse h-4 rounded-full" />
            <Flex className=" flex flex-row gap-5">
              <Box className="bg-gray-200 w-[10vw] animate-pulse h-3 rounded-full" />
              <Box className="bg-gray-200 w-[10vw] animate-pulse h-3 rounded-full" />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

export default HomeLoadingPlaceHolder;
