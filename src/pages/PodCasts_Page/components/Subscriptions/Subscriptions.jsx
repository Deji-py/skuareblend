import React from "react";
import SubscriptionCard from "./SubscriptionCard";
import { Flex } from "@chakra-ui/react";

function Subscriptions() {
  const subscriptions = [
    "https://img.freepik.com/free-photo/ultra-detailed-nebula-abstract-wallpaper-3_1562-748.jpg?w=740&t=st=1694759071~exp=1694759671~hmac=0f6fd77c2dc4b22e1dedb0f425f13df2aa0533c48a23a0a6445fe736f86c3025",
    "https://img.freepik.com/free-vector/graphic-design-colorful-geometrical-lettering_52683-34588.jpg?w=740&t=st=1694759529~exp=1694760129~hmac=e7d72cafc71bec40f8ef2cbfe69b3674f64be0e07f33a9b981df68883727a6f5",
    "https://img.freepik.com/free-vector/gradient-geometric-shapes-dark-background-design_23-2148433740.jpg?w=740&t=st=1694759803~exp=1694760403~hmac=10b44da0cc5e0db02d11c578724ce63f5f90a39886979bc72e0cc97b67c165d3",
    "https://img.freepik.com/free-vector/break-rules-calligraphic-3d-pipe-style-text-vector-illustration-design_460848-13136.jpg?w=740&t=st=1694759587~exp=1694760187~hmac=307822b76bb634ef38a2409bb9009f52221a66c5b68f5674e1bdeff6c31e257e",
  ];
  return (
    <div className="mt-10">
      <Flex alignItems={"center"} px={3} justifyContent={"space-between"}>
        <h2 className="font-poppins ">Subscriptions</h2>
        <p className="text-cyan-700 text-[14px]">See All</p>
      </Flex>
      <Flex
        alignItems={"center"}
        overflowX={"scroll"}
        gap={5}
        my={2}
        px={3}
        className="  hideScroll"
      >
        {subscriptions.map((item, key) => (
          <SubscriptionCard key={key} image={item} />
        ))}
      </Flex>
    </div>
  );
}

export default Subscriptions;
