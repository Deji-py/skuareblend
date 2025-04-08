import React from "react";
import ReviewCard from "../Components/ReviewCard";
import { Box, VStack } from "@chakra-ui/react";

function Review({ reviews }) {
  return (
    <VStack className=" h-screen w-screen px-2">
      {reviews?.map((item, key) => (
        <ReviewCard />
      ))}
    </VStack>
  );
}

export default Review;
