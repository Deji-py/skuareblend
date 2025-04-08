import React from "react";
import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function FabSubButtons({ textColor, route, color, label, icon }) {
  return (
    <Link to={route}>
      <Center
        justifyContent="center"
        alignItems="center"
        color={textColor}
        rounded="lg"
        bg={color}
        my={2}
        position={"relative"}
        gap={2}
        p={2}
      >
        <div>{icon}</div>
        <p className="text-[14px] flex-1">{label}</p>
      </Center>
    </Link>
  );
}

export default FabSubButtons;
