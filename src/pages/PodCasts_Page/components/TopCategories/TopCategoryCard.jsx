import React from "react";
import { Box, Center } from "@chakra-ui/react";

function TopCategoryCard({ item }) {
  return (
    <Box className="w-fit relative h-fit">
      <Center
        bg={""}
        className=" bg-purple-50 border-[1.5px]  px-2  py-2 pl-[25px] w-full h-full rounded-md relative"
      >
        <img
          className=" w-[40px] absolute left-0 top-[-10px]  "
          src={item.image}
          alt={item.image}
        />
        <h2 className="text-[14px] ml-5">{item.name}</h2>
      </Center>
    </Box>
  );
}

export default TopCategoryCard;
