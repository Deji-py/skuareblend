import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { AuthContext } from "../../../App";

import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io";

function DescriptionBox({ bio, onOpen, isFriend }) {
  const { userData } = useContext(AuthContext);

  return (
    <Box className="bg-white w-full p-2 border-[1.5px] rounded-xl ">
      <HStack justify={"space-between"} className="text-gray-700">
        <HStack gap={1}>
          <p className="text-[14px] font-bold">Description</p>
        </HStack>
        {!isFriend && <FaEdit onClick={onOpen} size={14} />}
      </HStack>
      <p className="text-[12px] text-gray-600 my-1 ">{bio}</p>
    </Box>
  );
}

export default DescriptionBox;
