import React from "react";
import ReviewCard from "../../Components/ReviewCard";
import { VStack } from "@chakra-ui/react";

function Shop_Preview({ products }) {
  return (
    <VStack>
      {products?.map((item, key) => (
        <ReviewCard />
      ))}
    </VStack>
  );
}

export default Shop_Preview;
