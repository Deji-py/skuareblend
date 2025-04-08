import React from "react";
import logoPod from "../../../assets/icons/logoPod.svg";
import { SearchIcon } from "@chakra-ui/icons";
import { Center, Flex, IconButton, Image } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

function PodcastHeader() {
  return (
    <div className="w-full py-3 px-2 mb-2">
      <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={1} alignItems={"center"}>
          <Image alt="logoPod" src={logoPod} className="w-[38px]" />
          <h1 className=" text-black text-2xl md:text-lg font-poppins font-extrabold  ">
            SkuareCast
          </h1>
        </Flex>
        <Link to={"search"}>
          <SearchIcon className="mr-" />
        </Link>
      </Flex>
      {/* <h1 className="text-[20px] font-poppins w-[50%] font-bold ">
        Listen to your Favourite Podcast
      </h1> */}
    </div>
  );
}

export default PodcastHeader;
