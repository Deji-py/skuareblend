import PostChart from "../Profile_Page/Chart/PostChart";
import React from "react";
import StoreChart from "../Profile_Page/Chart/StoreChart";
import { VStack } from "@chakra-ui/react";

function DashBoard() {
  return (
    <VStack className=" w-screen ">
      <h2 className="mt-5">DashBoard</h2>
      <PostChart />
      <StoreChart />
    </VStack>
  );
}

export default DashBoard;
