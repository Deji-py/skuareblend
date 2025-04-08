import AnimateHeader from "../../../components/AnimateHeader";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
} from "@chakra-ui/react";

export function Post_Page_Header() {
  return (
    <AnimateHeader>
      <Box className="  bg-white">
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          className="px-2 py-2 w-screen"
        >
          <Center gap={5}>
            <Link to={"/profile"}>
              <IconButton
                rounded={"full"}
                bg={"none"}
                icon={<MdChevronLeft size={25} />}
              />
            </Link>
            <h2 className="font-bold font-poppins">All Posts</h2>
          </Center>
          <BsThreeDotsVertical />
        </Flex>
        <Divider />
      </Box>
    </AnimateHeader>
  );
}
