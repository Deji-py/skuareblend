import Chip from "../../../components/MicroComps/Chip";
import React, { useRef, useState } from "react";
import TextInput from "../../../components/TextInput";
import { CgChevronDown, CgCopy } from "react-icons/cg";
import { FaGlobeAfrica, FaLink, FaVoteYea } from "react-icons/fa";
import { GoPaste } from "react-icons/go";
import { IoIosAttach } from "react-icons/io";
import { MdAdd, MdGif } from "react-icons/md";
import { BottomSheet } from "react-spring-bottom-sheet";

import {
  BsChevronDown,
  BsGlobe2,
  BsHeart,
  BsHeartFill,
  BsImageFill,
  BsYoutube,
} from "react-icons/bs";
import {
  Button,
  CloseButton,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  useDisclosure,
  ModalFooter,
  IconButton,
  useToast,
} from "@chakra-ui/react";

function Post_Footer({
  handleOpen,
  youtubeLink,
  setYoutube,
  isOpen,
  setImage,
  setYoutubeLinks,
}) {
  const imageInputRef = useRef();
  const {
    isOpen: linkIsOpen,
    onOpen: handleOpenLink,
    onClose: handleCloseLink,
  } = useDisclosure();

  const toast = useToast();

  // Regular expression to validate YouTube URLs
  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

  // Function to check if a YouTube link is valid
  const isValidYoutubeLink = (link) => {
    return youtubeUrlPattern.test(link);
  };

  // Function to add a YouTube link
  const addYoutubeLink = () => {
    if (isValidYoutubeLink(youtubeLink)) {
      setYoutubeLinks((links) => [youtubeLink]);
      setYoutube("");
      handleCloseLink();
      // Clear the input field after adding the link
    } else {
      toast({
        title: "Invalid Youtube Link",
        description: "Please enter a valid Youtube URL",
        status: "error",
        position: "top",
      });
      // Handle invalid link here (e.g., show an error message)
      console.log("Invalid YouTube link");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      bottom={isOpen ? "0" : "50px"}
      top={isOpen ? "65px" : ""}
      justifyContent={"space-between"}
      pos={isOpen ? "relative" : "fixed"}
      className=" bg-white  p-2  w-full   z-[1000]"
    >
      <Flex alignItems={"center"}>
        {isOpen ? (
          <Flex gap={2}>
            <Button
              onClick={() => imageInputRef.current.click()}
              size={"sm"}
              color={"white"}
              bg={"whitesmoke"}
              rounded={"md"}
            >
              <BsImageFill size={16} color="gray" />
            </Button>
            <Button
              onClick={handleOpenLink}
              size={"sm"}
              color={"white"}
              bg={"whitesmoke"}
              rounded={"md"}
            >
              <BsYoutube size={20} color="red" />
            </Button>
          </Flex>
        ) : (
          <Flex gap={2}>
            <Tag colorScheme="" size={"md"} rounded={"full"}>
              <BsHeartFill size={12} className="mr-2 text-gray-500" />
              <p className="text-[13px] text-gray-500">200k</p>
            </Tag>

            <Tag colorScheme="" size={"md"} rounded={"full"}>
              <FaVoteYea className="mr-2 text-gray-500" />
              <p className="text-[13px] text-gray-500">200k</p>
            </Tag>
          </Flex>
        )}
      </Flex>
      {isOpen && <Chip icon={FaGlobeAfrica} label={"Public"} />}
      {!isOpen && (
        <Button
          onClick={handleOpen}
          size={"sm"}
          color={"white"}
          bg={"none"}
          rounded={"md"}
          _hover={{ bg: "" }}
        >
          <MdAdd size={20} color="black" />
        </Button>
      )}

      {/* Set up the file input */}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImage((images) => [...images, ...e.target.files])}
        ref={imageInputRef}
      />

      {/* Set up the YouTube link form */}
      <BottomSheet
        className="z-[20000] fixed"
        open={linkIsOpen}
        onDismiss={handleCloseLink}
        snapPoints={({ minHeight }) => [minHeight]}
      >
        <div className="px-3">
          <Flex justifyContent={"space-between"} my={4} alignItems={"center"}>
            <p>Paste Your Youtube Link</p>
            <Button
              onClick={addYoutubeLink}
              color={youtubeLink === "" ? "gray" : "white"}
              size={"sm"}
              bg={youtubeLink === "" ? "whitesmoke" : "red"}
            >
              Add
              <FaLink />
            </Button>
          </Flex>
          <Flex mb={5} gap={1} alignItems={"center"} className="">
            <IconButton icon={<GoPaste />} />
            <TextInput
              placeholder={"eg.https://youtu.be/icnZS..."}
              setState={setYoutube}
              state={youtubeLink}
              icon={<BsYoutube color="red" />}
            />
          </Flex>
        </div>
      </BottomSheet>
    </Flex>
  );
}

export default Post_Footer;
