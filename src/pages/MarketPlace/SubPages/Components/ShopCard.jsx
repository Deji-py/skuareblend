import Chip from "../../../../components/MicroComps/Chip";
import React from "react";
import StarRatings from "react-star-ratings";
import { useContext } from "react";
import { BsBookmark, BsCheck, BsCheckAll, BsStarFill } from "react-icons/bs";
import { MdRecommend } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../App";

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";

function ShopCard({ shop }) {
  const { userId } = useContext(AuthContext);

  const isCurrentUser = userId === shop?.uid;

  return (
    <Box className="w-full p-2 border-[1.5px] overflow-hidden shadow-xl shadow-[rgba(0,0,0,0.05)]  h-fit bg-white rounded-xl">
      <Flex h={"full"} gap={2} alignItems={"center"}>
        <Box className="w-[30%] flex-none h-[100px] rounded-2xl  bg-slate-100 overflow-hidden ">
          <Image
            alt="shopCard"
            src={shop?.logoUrl}
            className="w-full h-full object-cover"
          />
        </Box>
        <Link
          className="w-full"
          to={isCurrentUser ? "/myStore" : "/store/" + shop?.id}
        >
          <Flex
            flexDir={"column"}
            alignItems={"start"}
            justify={"center"}
            className="h-full  overflow-hidden  flex-1"
          >
            {/* <StarRatings
              rating={shop?.starRating?.length}
              starDimension="8px"
              starSpacing="2px"
              starRatedColor="orange"
              numberOfStars={6}
              name="rating"
            /> */}
            <h2 className=" font-bold font-poppins text-[15px]">
              {shop?.storeName}
            </h2>
            <p className="text-[12px] px-[0.5px]">
              {shop?.oneLiner.length > 30
                ? shop?.oneLiner.slice(0, 30) + "..."
                : shop?.oneLiner}
            </p>

            <Flex
              className=" w-full mt-3 "
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Center gap={3}>
                <p className="text-[12px] font-bold text-gray-500">
                  {shop?.products?.length} Items
                </p>
                <HStack className="text-[12px] border-[1.5px] px-2 rounded-full border-[#188C4C] text-[#188C4C]">
                  <BsCheckAll />
                  <p>{shop?.recommendations?.length}</p>
                </HStack>
                <HStack className="text-[12px] border-[1.5px] px-2 rounded-full border-orange-500 text-orange-500">
                  <BsStarFill size={10} />
                  <p>{shop?.recommendations?.length}</p>
                </HStack>
              </Center>
            </Flex>
          </Flex>
        </Link>
        <VStack justifyContent={"center"} gap={8} className=" h-full ">
          <BsBookmark />
          <Link to={"/store/" + shop?.id}>
            <Button
              size={"xs"}
              bg={""}
              rounded={""}
              color={""}
              className=" border-[1.5px] text-primary border-primary text-[14px] rounded-full "
            >
              Visit store
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Box>
  );
}

export default ShopCard;
