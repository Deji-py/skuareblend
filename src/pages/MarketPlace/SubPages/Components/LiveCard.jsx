import React from "react";
import { Avatar, Box, Center, Image } from "@chakra-ui/react";
import { MdCircle } from "react-icons/md";

function LiveCard() {
  return (
    <div>
      <Center className=" w-full  bg-black relative h-[150px]">
        <MdCircle
          size={10}
          className=" animate-pulse absolute top-2 z-[100]  left-2"
          color="red"
        />
        <Image
          alt="liveCardImg"
          className="w-full opacity-[0.5] h-full object-cover"
          src="https://img.freepik.com/premium-photo/gold-jewelry-with-gems-showcase_756262-2032.jpg?w=740"
        />
        <Center
          flexDir={"column"}
          className=" text-white text-[12px] w-full h-full absolute top-0"
        >
          <Avatar height={"45px"} width={"45px"} src="" />
          <p>Username </p>
          <Center>
            <p>200 buyers</p>
          </Center>
        </Center>
      </Center>
    </div>
  );
}

export default LiveCard;
