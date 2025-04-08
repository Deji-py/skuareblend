import React from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { BsLayoutWtf, BsShop, BsShopWindow, BsSoundwave } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";
import { MdBolt, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const ToolItem = ({ title, color, textColor, icon, borderColor }) => {
  return (
    <Center
      justifyContent="center"
      alignItems="center"
      color={textColor}
      width={100}
      rounded="full"
      bg={color}
      p={2}
      className={`${borderColor} border-2`}
    >
      <div>{icon}</div>
      <p className="text-[14px]">{title}</p>
    </Center>
  );
};

function ProfileTools() {
  const tools = [
    {
      title: "Blogs",
      route: "/myBlogs",
      color: "#B9DBF3",
      textColor: "#041925",
      borderColor: "border-blue-400",
      icon: <MdEdit size={20} className="flex-none mr-1" />,
    },
    {
      title: "Posts",
      route: "/profile/createPost",
      color: "#4169E1",
      textColor: "white",
      borderColor: "border-blue-400",
      icon: <BsLayoutWtf size={20} className="flex-none mr-1" />,
    },

    {
      title: "Store",
      route: "/myStore",
      color: "#96EDBD",
      textColor: "#062313",
      borderColor: "border-green-400",
      icon: <BsShopWindow size={20} className="flex-none mr-1" />,
    },
  ];

  return (
    <Box className="w-full">
      <Flex
        wrap="wrap"
        justifyContent="center"
        className="flex-wrap shadow-gray-200 gap-5 p-5 border-2 bg-white w-full  rounded-xl"
      >
        {tools.map((tool, key) => (
          <Link to={tool.route} key={key}>
            <ToolItem
              icon={tool.icon}
              title={tool.title}
              textColor={tool.textColor}
              color={tool.color}
              borderColor={tool.borderColor}
            />
          </Link>
        ))}
      </Flex>
    </Box>
  );
}

export default ProfileTools;
