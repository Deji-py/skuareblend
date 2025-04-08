import LiveCard from "./Components/LiveCard";
import Masonry from "react-masonry-css";
import React from "react";
import { Box } from "@chakra-ui/react";

function LiveShop() {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 3,
    500: 3,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid py-2 h-screen w-screen mt-[-10px]"
      columnClassName=" my-masonry-grid_column "
    >
      {/* <LiveCard />
      <LiveCard />
      <LiveCard />
      <LiveCard />
      <LiveCard /> */}

      {/* {posts.map((item) => (
           
          ))} */}
    </Masonry>
  );
}

export default LiveShop;
