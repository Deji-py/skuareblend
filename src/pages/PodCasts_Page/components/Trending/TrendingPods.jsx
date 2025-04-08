import React from "react";
import TrendingPodCard from "./TrendingPodCard";
import { Box, Flex } from "@chakra-ui/react";

function TrendingPods() {
  return (
    <>
      <Flex
        mt={10}
        alignItems={"center"}
        px={3}
        justifyContent={"space-between"}
      >
        <h2 className="font-poppins ">Hot PodCasts</h2>
        <p className="text-cyan-700 text-[14px]">See All</p>
      </Flex>
      <Box className=" grid grid-cols-3 gap-2 p-2">
        <TrendingPodCard />
        <TrendingPodCard />
        <TrendingPodCard />
        <TrendingPodCard />
        <TrendingPodCard />
        <TrendingPodCard />
      </Box>
    </>
  );
}

export default TrendingPods;
