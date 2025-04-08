import React from "react";
import SmallCard from "../SmallCard";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

function MorePosts({ title }) {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box>
      <Flex alignItems={"center"} px={5} pb={5} gap={2}>
        <h1 className="text-center  flex-none font-poppins text-lg text-gray-500 ">
          {title}
        </h1>
        <Divider borderWidth={1} width={"100%"} flex={1} />
      </Flex>

      <div className="mt-10 px-10 md:px-5 md:block grid grid-cols-2">
        {posts.map((item, key) => (
          <SmallCard />
        ))}
      </div>
    </Box>
  );
}

export default MorePosts;
