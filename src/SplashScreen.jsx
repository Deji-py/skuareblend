import Logo from "./assets/icons/LogoColor.svg";
import OTHLogo from "./assets/othLogo.svg";
import React from "react";
import { Box, Center, Flex, Image } from "@chakra-ui/react";

import {
  BeatLoader,
  BounceLoader,
  PuffLoader,
  SquareLoader,
  SyncLoader,
} from "react-spinners";

function SplashScreen() {
  return (
    <Center className="w-screen h-[90vh] overflow-hidden">
      <Flex flexDir={"column"} gap={1} alignItems={"center"}>
        <Image src={Logo} alt="skuarelogo" className="w-[55px]" />
        <h1 className=" text-black text-[25px]  font-poppins font-extrabold  ">
          Skuareblend
        </h1>
        <p className="text-[12px] mt-[-5px]">Connect and Thrive</p>
        <div className=" absolute top-5">
          <PuffLoader size={40} color="#4169E1" className="mt-2" />
        </div>
        <Flex
          className=" text-[12px] text-gray-700 absolute bottom-5"
          alignItems={"center"}
        >
          <Image alt="othLogo" src={OTHLogo} className="w-[30px]" />
          <p>Object Tech house &#169; </p>
        </Flex>
      </Flex>
    </Center>
  );
}

export default SplashScreen;
