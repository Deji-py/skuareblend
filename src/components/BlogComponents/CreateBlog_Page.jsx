import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BlogForm from "./BlogForm";
import { Flex, IconButton } from "@chakra-ui/react";
import { BsX } from "react-icons/bs";
import { Link } from "react-router-dom";

function CreateBlog_Page() {
  return (
    <div className="w-full  mt-[60px] md:mt-0 px-[20%] md:px-2 h-fit flex flex-col">
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        className="py-2"
        top={0}
        zIndex={100}
        bg={"white"}
        height={"60px"}
        width={"full"}
        left={0}
      >
        <Link to={"/profile"}>
          <IconButton icon={<BsX />} />
        </Link>
      </Flex>

      <BlogForm />
    </div>
  );
}

export default CreateBlog_Page;
