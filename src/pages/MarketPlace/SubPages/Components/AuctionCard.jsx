import Chip from "../../../../components/MicroComps/Chip";
import React from "react";
import StarRatings from "react-star-ratings";
import { UpDownIcon } from "@chakra-ui/icons";
import { BsCaretUp, BsCaretUpFill } from "react-icons/bs";
import { FaMapMarkerAlt, FaMapPin } from "react-icons/fa";

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Tag,
} from "@chakra-ui/react";

function AuctionCard() {
  return (
    <Box className="p-2 w-full text-[14px] border-[1.5px] bg-white rounded-xl">
      <Box className=" overflow-hidden w-full h-[200px] rounded-xl ">
        <Tag
          size={"sm"}
          color={""}
          bg={"white"}
          className="text-gray-500 w-full"
        >
          Ends in 20min: 15secs
        </Tag>
        <Image
          alt="aunctionImg"
          src="https://img.freepik.com/premium-photo/gold-jewelry-with-gems-showcase_756262-2032.jpg?w=740"
          className="w-full h-full object-cover"
        />
      </Box>
      <Box>
        <HStack justify={"space-between"} py={2}>
          <Box>
            <h2 className="text-[1.2rem] font-bold">Username</h2>
            <Center gap={2} justifyContent={"start"}>
              <FaMapMarkerAlt color="red" />
              <p className="text-gray-600">Abuja</p>
            </Center>
          </Box>
          <Center gap={2}>
            <Chip label={"23 Bidders"} />
            <Flex
              alignItems={"center"}
              className="h-10 p-2 pl-5  rounded-md   bg-gray-100 text-black"
            >
              <BsCaretUpFill color="#44C58D" />
              <Flex className=" p-2  rounded-md  "># 20,000</Flex>
            </Flex>
          </Center>
        </HStack>
        <HStack justify={"space-between"} py={2}>
          <Center gap={2}>
            <Avatar width={"30px"} height={"30px"} size={"sm"} src="" />
            <Box>
              <Box>Big Store</Box>
              <StarRatings
                rating={4}
                starDimension="8px"
                starSpacing="1px"
                starRatedColor="orange"
                numberOfStars={6}
                name="rating"
              />
            </Box>
          </Center>
          <Center>
            <Button
              padding={"20px"}
              bg={""}
              rounded={"full"}
              color={"white"}
              className=" bg-black"
            >
              Place Bid
            </Button>
          </Center>
        </HStack>
      </Box>
      <Box></Box>
    </Box>
  );
}

export default AuctionCard;
