import React from "react";
import { Avatar, Box, HStack } from "@chakra-ui/react";

function ReviewCard() {
  return (
    <HStack className="bg-white justify-between p-2 w-full">
      <HStack>
        <Avatar
          size={"sm"}
          src="https://img.freepik.com/free-photo/front-view-woman-wearing-hijab_23-2149522158.jpg?w=360&t=st=1696574650~exp=1696575250~hmac=7b1654082652980e532cca3437da3f4ab2b49628042c2ebc4634b7ebb8048055"
        />
        <Box className="text-[12px]">
          <p className="font-bold text-[14px]">Mike Joel</p>
          <p>This is a very nice shop </p>
        </Box>
      </HStack>
      <p className="text-[12px] text-gray-500">2:45PM</p>
    </HStack>
  );
}

export default ReviewCard;
