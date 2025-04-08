import FollowButton from "../../../components/FollowBtn/FollowButton";
import React, { useContext, useState } from "react";
import { Avatar, Box, Center, Flex, Tag } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";

function ChannelPreviewCard({ userData }) {
  return (
    <Center
      justifyContent={"space-between"}
      alignItems={"center"}
      px={1}
      my={2}
      rounded={"2xl"}
    >
      <Link to={"/user_profile/" + userData?.uid} state={userData?.uid}>
        <Flex ml={2} gap={2} py={2} alignItems={"center"}>
          <Avatar size={"md"} src={userData?.profilepic} />
          <Box className="text-[14px]">
            <p>{userData?.username}</p>
            <div size={"sm"}>{userData?.followers?.length} followers</div>
          </Box>
        </Flex>
      </Link>
      <FollowButton style={{ padding: "15px 20px" }} friendId={userData?.uid} />
    </Center>
  );
}

export default ChannelPreviewCard;
