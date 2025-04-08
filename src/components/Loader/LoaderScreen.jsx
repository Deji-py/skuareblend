import React from "react";
import { Center } from "@chakra-ui/react";
import { PulseLoader } from "react-spinners";

function LoaderScreen() {
  return (
    <Center className=" w-full h-[80vh] z-50 bg-[rgba(255,255,255,0.8)] fixed">
      <PulseLoader
        color={"#246EE9"}
        className=" text-primary"
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Center>
  );
}

export default LoaderScreen;
