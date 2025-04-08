import React from "react";
import logo from "../../../assets/icons/LogoColor.svg";
import podcast from "../../../assets/icons/podcast5.svg";
import { Box, Button, Center, Flex, Image } from "@chakra-ui/react";
import { BsSoundwave } from "react-icons/bs";
import { MdChevronLeft } from "react-icons/md";

function PodCastSetup({ onOpen }) {
  return (
    <Flex flexDir={"column"} className="  h-full w-screen  overflow-hidden">
      <MdChevronLeft className=" absolute left-2 top-2 " size={30} />

      <div className="  relative ">
        <h1 className="text-[35px] mt-[20%] pl-5 font-poppins w-[80%] top-[50px]">
          <Image
            alt="podSetupImg"
            zIndex={1000}
            width={"3rem"}
            src={logo}
            objectFit={"cover"}
          />
          Podcasting on the go
        </h1>
        <Image
          alt="podcastImg"
          zIndex={1000}
          src={podcast}
          width={"full"}
          height={"80%"}
          scale={""}
          className=" scale-[1.2] translate-x-[-5px]"
          mt={"2rem"}
          objectFit={"cover"}
        />
      </div>
      <div className="  mt-10 bg-whitesmoke mx-5 rounded-3xl   shadow-gray-200 p-5 flex  flex-col justify-center items-center">
        <div className="px-20 text-center text-[14px]">
          <p className=" font-poppins text-black  text-[25px] text-center">
            Create Your First PodCasts
          </p>
          <p className="text-gray-500">opportunities with your sounds</p>
        </div>
        <Button
          py={6}
          onClick={onOpen}
          className="my-5 bg-black"
          color={"white"}
          _hover={{ bg: "black" }}
          bg={""}
        >
          <BsSoundwave size={20} className="mr-2 " /> Start Podcasting
        </Button>
      </div>
    </Flex>
  );
}

export default PodCastSetup;
