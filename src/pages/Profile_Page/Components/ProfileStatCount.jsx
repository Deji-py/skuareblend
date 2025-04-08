import React from "react";
import { Stack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { MdVerified } from "react-icons/md";

function ProfileStatCount({
  title,
  trust,
  count,
  bgcolor,
  textcolor,
  countcolor,
  onClick,
  invert,
}) {
  return (
    <Stack
      flexDir={invert ? "column-reverse" : "column"}
      onClick={() => onClick()}
      className=" bg-white  items-center"
    >
      <Text className=" text-2xl " color={countcolor ? countcolor : "gray.500"}>
        {count}
      </Text>
      <Tag
        bg={bgcolor ? bgcolor : "whites"}
        color={textcolor ? textcolor : "gray.500"}
        className="text-xs mt-[-5px]"
      >
        {trust && <MdVerified />}
        {title}
      </Tag>
    </Stack>
  );
}

export default ProfileStatCount;
