import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { BsPlayFill, BsX } from "react-icons/bs";

function QueueCard({ title, isPlaying }) {
  return (
    <Flex
      className={`${isPlaying && "text-cyan-600"}  border-y-[0.5px] p-2 gap-4`}
      alignItems={"center"}
    >
      <Flex alignItems={"center"} flex={1} gap={4}>
        {isPlaying && <BsPlayFill />}

        <p className="text-[14px] ">{title?.slice(0, 45) + "..."}</p>
      </Flex>
      <div className="w-[10%]">
        <IconButton icon={<BsX />} />
      </div>
    </Flex>
  );
}

export default QueueCard;
