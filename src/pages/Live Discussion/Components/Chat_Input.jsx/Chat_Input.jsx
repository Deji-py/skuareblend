import CommentPlayer from "../../../../components/Comment/CommentPlayer";
import beepSound from "../../../../assets/Beep.mp3";
import { collection } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { BsImage, BsMicFill, BsPlayFill, BsX } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { MdSend, MdStop } from "react-icons/md";
import { db } from "../../../../../firebaseConfig";
import { AuthContext } from "../../../../App";
import { RecorderContext } from "../../../../components/Recorder/RecorderContext";
import { handleAddMessage } from "../../Services/handleSendMessage";

import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Spinner,
} from "@chakra-ui/react";

// Import the beep sound (adjust the path accordingly)

function Chat_Input({
  onFocus,
  onLeave,
  chatId,
  friendDetail,
  scrollToBottom,
  currentlyReplying,
  setCurrentlyReplying,
}) {
  const {
    handleStartRecording,
    recordingTimer,
    handleStopRecording,
    isRecording,
    url,
    blob,
    setUrl,
    setBlob,
  } = useContext(RecorderContext);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);
  const { userId } = useContext(AuthContext);

  const imgRef = useRef();

  const pickImage = () => {
    imgRef.current.click();
  };

  const userCollectionRef = collection(
    db,
    "users",
    userId,
    "messages",
    chatId,
    "chats"
  );

  const friendCollectionRef = collection(
    db,
    "users",
    friendDetail?.uid,
    "messages",
    chatId,
    "chats"
  );

  const handleSubmit = () => {
    handleAddMessage(
      setSending,
      setMessage,
      setUrl,
      blob,
      image,
      message,
      userId,
      userCollectionRef,
      friendCollectionRef,
      scrollToBottom,
      friendDetail,
      setImage,
      currentlyReplying,
      setCurrentlyReplying,
      setBlob,
      chatId
    );
  };

  const beepAudio = useMemo(() => new Audio(beepSound), [beepSound]);

  useEffect(() => {
    const beepAudio = new Audio(beepSound);
    beepAudio.load();
    return () => {
      beepAudio.pause(); // Cleanup when the component unmounts, e.g., beepAudio.pause()
    };
  }, []);

  const handleRecording = () => {
    beepAudio.play();
    handleStartRecording();
  };

  const clearRecording = () => {
    setUrl(null);
  };

  return (
    <Box
      width={{ base: "full", md: "70vw" }}
      bg={"white"}
      className="reverseShadow "
      position={"fixed"}
      zIndex={1000}
      bottom={0}
    >
      <input
        onChange={(e) => setImage(e.target.files)}
        className="hidden"
        type="file"
        accept="image/*"
        ref={imgRef}
      />
      {url && !isRecording && (
        <div className="px-2">
          <CommentPlayer src={url} />
        </div>
      )}
      {currentlyReplying && (
        <>
          <motion.div
            className="text-[14px] flex flex-col justify-start items-center overflow-hidden h-fit max-h-[60px] bg-[whitesmoke]  mx-5   my-2 rounded-r-lg border-t-gray-200 border-l-[4px] border-primary"
            initial={{ opacity: 0, y: 10 }} // Initial opacity and position
            animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
            exit={{ opacity: 0, y: 10 }} // Animate to zero opacity and slightly downward
          >
            <Flex
              border={""}
              w={"full"}
              alignItems={"center"}
              gap={2}
              padding={2}
            >
              {currentlyReplying?.text && (
                <Flex
                  alignItems={"center"}
                  w={"100%"}
                  h={"45px"}
                  className="     ml-2"
                >
                  <p>{currentlyReplying?.text.slice(0, 80) + "..."}</p>
                </Flex>
              )}
              {currentlyReplying?.audio && (
                <Flex
                  justify={"space-between"}
                  alignItems={"center"}
                  className=" flex-1 w-full "
                >
                  {!currentlyReplying?.text && <p>Audio</p>}
                  <Button
                    bg={"gray.300"}
                    color={"gray.500"}
                    rounded={"full"}
                    h={10}
                    p={0}
                    width={10}
                  >
                    <BsPlayFill size={25} />
                  </Button>
                </Flex>
              )}

              {/* image and text */}
              {currentlyReplying?.image && (
                <Flex
                  h={"45px"}
                  w={
                    currentlyReplying?.image && !currentlyReplying?.text
                      ? "full"
                      : "15%"
                  }
                  alignItems={"center"}
                  justify={"space-between"}
                >
                  <Image
                    alt="replyImg"
                    src={currentlyReplying?.image}
                    w={!currentlyReplying?.text ? "15%" : "full"}
                    className={` flex-none h-full object-cover`}
                  />
                  {currentlyReplying?.image && !currentlyReplying?.text && (
                    <Center gap={2} className=" text-[14px]  h-full">
                      <FaImage />
                      <p>Image</p>
                    </Center>
                  )}
                </Flex>
              )}
              {/* .............................................. */}
              <IconButton
                onClick={() => {
                  setBlob(null);
                  setUrl(null);
                  setCurrentlyReplying(null);
                }}
                top={"-30px"}
                right={0}
                position={"absolute"}
                rounded={""}
                bg={"white"}
                className=" border-2 border-b-0 rounded-t-md "
                size={"sm"}
              >
                <BsX />
              </IconButton>
            </Flex>
          </motion.div>
        </>
      )}
      {image && (
        <Flex
          gap={3}
          className="h-10 px-1 flex flex-row justify-start items-center bg-[whitesmoke]"
        >
          <Image
            alt="chatImg"
            className="h-full object-cover w-[20%]"
            src={URL.createObjectURL(image[0])}
          />
          <p className="text-[10px] flex-1">
            {image[0]?.name?.slice(0, 100) + "..."}
          </p>
          <IconButton onClick={() => setImage(null)} size={"xs"}>
            <BsX />
          </IconButton>
        </Flex>
      )}
      <>
        <Flex alignItems={"center"} className="p-2  ">
          <Flex
            alignItems={"center"}
            className="bg-gray-100 h-[50px] border-[1.5px] rounded-l-full flex-1"
          >
            {url ? (
              <Button
                onClick={clearRecording}
                color={"gray"}
                bg={"none"}
                padding={0}
                _hover={{ bg: "" }}
                rounded={"full"}
                className={`w-10 p-0  `}
              >
                <BsX size={20} />
              </Button>
            ) : (
              <Button
                onClick={handleRecording}
                color={isRecording ? "blue.500" : "gray"}
                bg={"none"}
                padding={0}
                _hover={{ bg: "" }}
                rounded={"full"}
                className={`w-10 p-0  ${isRecording && " animate-pulse "}`}
              >
                <BsMicFill size={20} />
              </Button>
            )}
            {!isRecording && (
              <Button
                onClick={pickImage}
                color={isRecording ? "#4169E1" : "gray"}
                bg={"none"}
                padding={0}
                _hover={{ bg: "" }}
                rounded={"full"}
                className={`ml-[-6px] p-0  ${isRecording && " animate-pulse "}`}
              >
                <BsImage size={18} />
              </Button>
            )}

            {isRecording ? (
              <Flex
                justifyContent={"space-between"}
                className="w-full h-[50px] px-2"
                alignItems={"center"}
              >
                <Box className="w-full text-sm text-primary">Recording...</Box>
                <p className="text-sm text-gray-500">{recordingTimer}</p>
              </Flex>
            ) : (
              <input
                style={{ borderStyle: "none" }}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 focus:outline-none  placeholder:text-[14px] outline-none bg-gray-100  border-none"
                type="text"
                value={message}
                autoFocus={false}
                onMouseLeave={onLeave}
                onFocus={onFocus}
                placeholder="Type Message..."
              />
            )}
          </Flex>
          {!isRecording ? (
            <Button
              onClick={handleSubmit}
              rounded={""}
              bg={""}
              height={"50px"}
              color={"white"}
              _hover={{
                bg: "black",
              }}
              className={` bg-primary  rounded-r-full`}
            >
              {sending ? <Spinner /> : <MdSend size={20} />}
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleStopRecording();
              }}
              rounded={""}
              bg={""}
              height={"50px"}
              color={"white"}
              _hover={{
                bg: "rgb(0 78 100)",
              }}
              className={` bg-primary  rounded-r-full`}
            >
              <MdStop size={20} />
            </Button>
          )}
        </Flex>
      </>
    </Box>
  );
}

export default Chat_Input;
