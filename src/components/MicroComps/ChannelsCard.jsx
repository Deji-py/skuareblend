import React from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

function ChannelsCard({ channel }) {
  return (
    <Link
      className=" flex-none"
      to={"/user_profile/" + channel?.uid}
      state={channel?.uid}
    >
      <Box className="flex flex-none flex-col  justify-center items-center">
        <Center className="relative">
          <Image
            alt="profilepic"
            borderRadius={100}
            w={"60px"}
            h={"60px"}
            objectFit={"cover"}
            src={channel?.profilepic}
          />
          {channel?.blogs?.length > 0 && (
            <Badge
              rounded={"full"}
              pos={"absolute"}
              bottom={2}
              right={0}
              color={"white"}
              bg={"red.500"}
              className=" text-[14px] rounded-full  shadow "
            >
              {channel?.blogs?.length}
            </Badge>
          )}
        </Center>
        <Stack className="mt-1 overflow-hidden">
          <Text className="text-[11px] w-[100%] self-center text-center">
            {channel.username?.slice(0, 5) + "..."}
          </Text>
        </Stack>
      </Box>
    </Link>
  );
}

export default ChannelsCard;
