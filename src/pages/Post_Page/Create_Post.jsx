import Post_Footer from "./components/Post_Footer";
import React, { useRef } from "react";
import { Button, Center, Flex, IconButton } from "@chakra-ui/react";
import { CgChevronDown } from "react-icons/cg";
import { MdSend } from "react-icons/md";
import { BottomSheet } from "react-spring-bottom-sheet";

function Create_Post({ isOpen, onClose, children, handleSubmit }) {
  const sheetRef = useRef();
  return (
    <BottomSheet
      snapPoints={({ maxHeight }) => maxHeight}
      open={isOpen}
      onDismiss={onClose}
      ref={sheetRef}
      className=" relative z-[1000]"
    >
      <Flex
        px={2}
        pos={"fixed"}
        w={"full"}
        py={3}
        bg={"white"}
        zIndex={2000}
        justifyContent={" space-between"}
        alignItems={"center"}
      >
        <Center className="gap-5">
          <IconButton
            onClick={onClose}
            bg={""}
            rounded={"full"}
            icon={<CgChevronDown size={20} />}
          />
          <h2>Create Post</h2>
        </Center>
        <Button
          px={5}
          py={5}
          rounded={"full"}
          color={"white"}
          bg={""}
          className=" bg-primary"
          _hover={{ bg: "black" }}
          size={"sm"}
          onClick={handleSubmit}
        >
          Post
          <MdSend className="ml-2" />
        </Button>
      </Flex>
      {children}
    </BottomSheet>
  );
}

export default Create_Post;
