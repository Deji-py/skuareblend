import AuctionCard from "./Components/AuctionCard";
import React from "react";
import { Box, VStack } from "@chakra-ui/react";

function Aunction() {
  return (
    <VStack gap={5} className="px-2 pb-[5rem]  w-screen h-fit">
      <AuctionCard />
      <AuctionCard />
      <AuctionCard />
      <AuctionCard />
    </VStack>
  );
}

export default Aunction;
