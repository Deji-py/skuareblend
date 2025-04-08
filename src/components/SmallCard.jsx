import DateObjectFromObject from "../utility/DateObjectFromObject";
import SanitizedHTML from "./SanitizeHTML";
import deleteBlog from "../Services/deleteBlog";
import moment from "moment";
import { useContext } from "react";
import { BsClock, BsThreeDots } from "react-icons/bs";
import { FaHeart, FaVoteYea } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";

function SmallCard({ blog }) {
  const toast = useToast();
  const datecreated = moment(DateObjectFromObject(blog?.createdAt)).format(
    "lll"
  );
  const { userId } = useContext(AuthContext);

  const stateData = {
    ...blog,
    published: datecreated,
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteBlog(blog?.id, userId, toast);
      console.log("Item deleted!"); // Replace this with the actual delete action
    }
  };

  return (
    <Flex
      className=" border-[0.5px] relative pr-5 overflow-hidden shadow-xl h-[130px] shadow-[rgba(0,0,0,0.02)]"
      gap={4}
      width={{ md: "100%", base: "100%" }}
      justifyContent={"start"}
      bg={"white"}
      borderRadius={10}
    >
      <Link to={"/blog/" + blog?.id} state={stateData}>
        <div className=" bg-gray-200 w-[100px] ">
          <Image
            alt="blogImg"
            width={"100%"}
            height={"150px"}
            fit={"cover"}
            src={blog?.cover}
          />
        </div>
      </Link>

      <Flex
        direction={"column"}
        py={2}
        flex={"1"}
        height={"100%"}
        align={"start"}
      >
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
            <Tag size={"sm"} mb={2} bg={"black"} color={"white"}>
              {blog?.category}
            </Tag>
            <Text
              className=" flex text-sm mt-[-8px] text-gray-400 flex-row gap-1 items-center"
              fontSize={12}
            >
              <BsClock />
              {datecreated}
            </Text>
          </Flex>
          {userId === blog?.authorId && (
            <div>
              <Menu>
                <MenuButton>
                  <BsThreeDots />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    bg={"#FFD6D6"}
                    color={"red"}
                    onClick={handleDeleteClick}
                  >
                    <MdDelete className=" mr-2" /> Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </Flex>

        <Text fontWeight={"bold"}>{blog?.title.slice(0, 30) + "..."}</Text>
        <Text fontSize={"xs"} opacity={0.6}>
          {blog?.blogContent.replace(/<[^>]*>/g, "").slice(0, 60) + "..."}
        </Text>
        <Flex className=" text-gray-400 gap-2 absolute bottom-2  right-5">
          <Flex alignItems={"center"} gap={1}>
            <Flex>
              <FaHeart size={10} />
            </Flex>
            <p className=" text-[12px]">{blog?.likes.length}</p>
          </Flex>
          <Flex alignItems={"center"} gap={1}>
            <Flex>
              <FaVoteYea size={10} />
            </Flex>
            <p className=" text-[12px]">{blog?.votes.length}</p>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SmallCard;
