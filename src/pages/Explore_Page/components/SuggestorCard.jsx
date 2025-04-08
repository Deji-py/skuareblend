import FollowButton from "../../../components/FollowBtn/FollowButton";
import React from "react";
import { Box, Center, Flex, Stack } from "@chakra-ui/react";
import { MdVerified } from "react-icons/md";

function SuggestorCard({ userData }) {
  return (
    <Box className=" flex flex-none flex-col justify-center overflow-hidden  shadow-md items-center bg-white rounded-md  w-[150px] h-[200px]">
      <div className=" bg-gray-100 w-full h-[40%] ">
        <img
          src={userData?.profilepic}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <Center flexDirection={"column"} className=" flex-1 w-full  ">
        <Stack className=" mt-2 text-sm text-center">
          <h2>
            {userData?.username.length > 10
              ? userData?.username.slice(0, 10) + "..."
              : userData?.username}
          </h2>
          <p className=" mt-[-10px] text-gray-400">@{userData?.nickname}</p>
        </Stack>
        <Flex className=" text-[14px] items-center mt-3">
          <MdVerified className=" mr-1" />
          <p>{userData?.trusts}</p>
        </Flex>
      </Center>
      <FollowButton friendId={userData?.uid} />
    </Box>
  );
}

export default SuggestorCard;
