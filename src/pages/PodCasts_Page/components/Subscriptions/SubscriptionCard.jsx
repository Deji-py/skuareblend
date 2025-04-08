import React from "react";
import { Box, Center, Image } from "@chakra-ui/react";

function SubscriptionCard({ image }) {
  return (
    <Center className="w-[100px] flex-none relative h-[100px] rounded-xl overflow-hidden">
      <Center className="w-full h-full absolute  bg-gradient-to-b from-transparent via-transparent to-black" />
      <p className=" absolute bottom-2 text-[10px] text-white">Magic World </p>
      <Image alt="imagfe" className="w-full h-full object-cover" src={image} />
    </Center>
  );
}

export default SubscriptionCard;
