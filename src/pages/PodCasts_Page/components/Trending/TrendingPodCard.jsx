import Chip from "../../../../components/MicroComps/Chip";
import React from "react";
import { Box, Center, IconButton, Tag } from "@chakra-ui/react";
import { BsPlayFill, BsSoundwave } from "react-icons/bs";

function TrendingPodCard() {
  return (
    <Center flexDir={"column"} className="w-fit relative h-fit">
      <Center className=" py-2  w-full h-full   relative">
        <img
          className=" w-[150px] left-0 rounded-xl   "
          src={
            "https://img.freepik.com/free-psd/jazz-concert-print-template_23-2149016090.jpg?w=740&t=st=1694762589~exp=1694763189~hmac=541e662523f90eb5e201fe6ed88d0c9fbd381b494846dfd24698641cf3e00dcd"
          }
        />
        <IconButton
          size={"xs"}
          position={"absolute"}
          left={2}
          bottom={4}
          shadow={"xl"}
          icon={<BsPlayFill />}
          rounded={"full"}
        />
      </Center>
      <p className="text-[12px]">Big Man Gilli</p>
      <Tag bg={"#DADDE7"} color={"#2D3142"} colorScheme="cyan" size={"sm"}>
        <BsSoundwave size={15} />
        200k Listens
      </Tag>
    </Center>
  );
}

export default TrendingPodCard;
