import React from "react";
import TopCategoryCard from "./TopCategoryCard";
import lifestyle from "../../../../assets/lifestyle.png";
import music from "../../../../assets/music.png";
import sport from "../../../../assets/sport.png";
import tv from "../../../../assets/tv.png";
import { Flex } from "@chakra-ui/react";

function TopCategories() {
  const categories = [
    { name: "Sport", image: sport },
    { name: "Music", image: music },
    { name: "Entertainment", image: tv },
    { name: "Lifestyle", image: lifestyle },
  ];
  return (
    <div className="mt-10">
      <Flex alignItems={"center"} px={3} justifyContent={"space-between"}>
        <h2 className="font-poppins ">Top Categories</h2>
        <p className="text-cyan-700 text-[14px]">See All</p>
      </Flex>
      <Flex
        alignItems={"center"}
        overflowX={"scroll"}
        gap={5}
        pt={3}
        my={2}
        px={3}
        className="  hideScroll"
      >
        {categories.map((item, key) => (
          <TopCategoryCard item={item} key={key} />
        ))}
      </Flex>
    </div>
  );
}

export default TopCategories;
