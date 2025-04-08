import React from "react";
import { Box, Button, Flex, Image, Tag } from "@chakra-ui/react";
import { BsSoundwave } from "react-icons/bs";

function SpotLightCard() {
  return (
    <Box className=" w-full h-[180px] flex-none relative px-1">
      <Box
        bg={""}
        className="w-full h-full absolute rounded-3xl bg-gradient-to-r from-purple-800  via-cyan-700 to-transparent"
      />
      <Button
        position={"absolute"}
        left={5}
        bottom={5}
        size={"sm"}
        rounded={"full"}
        mt={2}
        shadow={"xl"}
      >
        <BsSoundwave size={20} className="mr-2" />
        Listen Now
      </Button>
      <div className="left text-white absolute p-5 flex-1">
        <h1 className=" text-[20px]">Big bang concept</h1>
        <p className="mt-1 text-[14px]">THeory of life itself and mandkind</p>

        <Flex gap={5} alignItems={"center"} className="mt-5">
          <Tag size={"sm"} p={0} colorScheme="white">
            15k Liteners
          </Tag>
          <Tag size={"sm"} p={0} colorScheme="white">
            15k Likes
          </Tag>
        </Flex>
      </div>
      <Flex justifyContent={"flex-end"} alignItems={"center"}>
        <Image
          alt="spotLightPod"
          src="https://img.freepik.com/free-photo/space-background-with-volcanic-planet_1048-12588.jpg?w=740&t=st=1694755166~exp=1694755766~hmac=a5c5aed40c6659a3c8870bc2d34efdbbfe20b06592ebc22865f5bef37e3fcbe4"
          className="w-[50%] h-[180px] rounded-r-3xl object-cover"
        />
      </Flex>
    </Box>
  );
}

export default SpotLightCard;
