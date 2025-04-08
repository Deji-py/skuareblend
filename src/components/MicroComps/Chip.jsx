import React, { useEffect, useState } from "react";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";

function Chip({
  selectedBgColor,
  state,
  handleState,
  selectable,
  color,
  label,
  icon,
  bgColor = "whitesmoke",
  textColor = "gray",
  style,
}) {
  let selectedColor;
  let selectedIconColor;

  if (selectable) {
    if (selectedBgColor) {
      selectedColor = selectedBgColor;
      selectedIconColor = color;
    } else {
      selectedColor = "whitesmoke";
      selectedIconColor = "gray";
    }
  } else {
    selectedColor = "whitesmoke";
    selectedIconColor = "gray";
  }
  return (
    <Button
      onClick={selectable ? () => handleState() : () => {}}
      gap={2}
      size={"xs"}
      rounded={"full"}
      style={{
        color: state ? selectedIconColor : textColor,
        backgroundColor: state ? selectedColor : bgColor,
        borderColor: state ? selectedColor : "transparent",
        ...style,
      }}
      className={`bg-[whitesmoke] border-[1.5px] flex-none h-fit items-center text-[12px] w-fit p-1 px-2 rounded-full`}
      color={textColor}
    >
      {icon && (
        <Icon
          as={icon}
          size={20}
          color={state ? selectedIconColor : textColor}
        />
      )}
      <Text>{label}</Text>
    </Button>
  );
}

export default Chip;
