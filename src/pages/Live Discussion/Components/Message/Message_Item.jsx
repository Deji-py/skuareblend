import CommentPlayer from "../../../../components/Comment/CommentPlayer";
import DateObjectFromObject from "../../../../utility/DateObjectFromObject";
import Lightbox from "yet-another-react-lightbox";
import Linkify from "react-linkify";
import React, { useEffect, useMemo, useState } from "react";
import Right_Angle from "./Right_Angle";
import fetchUser from "../../../../Services/fetchUser";
import moment from "moment";
import { motion, useAnimation } from "framer-motion";
import { useContext } from "react";
import { BsCheck, BsCheckAll, BsPlayFill, BsSoundwave } from "react-icons/bs";
import { FaImage, FaImages, FaReply } from "react-icons/fa";
import { AuthContext } from "../../../../App";

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spinner,
} from "@chakra-ui/react";

// Memoize the Message_Item component to prevent re-renders when props haven't changed
const MemoizedMessageItem = ({
  friendImage,
  message,
  setCurrentlyReplying,
  scrollToMessage,
}) => {
  const { userId } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const controls = useAnimation();
  const [localImgError, setLocalImgError] = useState(false); // Use localImgError state

  const isFriend = userId !== message?.uid;
  const customComponentDecorator = (href, text, key) => (
    <a
      href={href}
      style={{
        // Add your custom styling here
        color: isFriend ? "blue" : "white", // Change link color
        textDecoration: "underline", // Underline links
        // Add more styles as needed
      }}
      key={key}
      target="_blank" // Open links in a new tab
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
  const handleDragEnd = async (event, info) => {
    const swipeDistance = Math.abs(info.offset.x);

    if (swipeDistance > 10) {
      if (info.offset.x > 0) {
        if (isFriend) {
          setCurrentlyReplying(message);
        }
      } else {
        if (!isFriend) {
          setCurrentlyReplying(message);
        }
      }
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      id={message?.id}
      className={`relative flex  hideScroll items-center w-screen 
         ${
           !isFriend
             ? " self-end mr-0 flex-row justify-end"
             : "self-start ml-0 flex-row-reverse justify-end"
         } `}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }} // Set your desired drag limits here
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      animate={controls}
    >
      <Lightbox
        open={open}
        styles={{
          container: {
            backgroundColor: "white",
            height: "100%",
          },
          button: { color: "white", boxShadow: "none" },
          icon: { boxShadow: "none", width: "20px" },
        }}
        close={() => setOpen(false)}
        slides={[{ src: message?.image }]}
      />
      <div
        className={`relative flex-none w-fit max-w-[300px] ${
          !isFriend ? " self-end mr-4" : "self-start ml-4"
        } `}
      >
        {isFriend && (
          <Flex className="py-1">
            <Center gap={1}>
              <Avatar
                className="flex-none"
                src={friendImage}
                height={"18px"}
                width={"18px"}
              />
            </Center>
          </Flex>
        )}
        <Box
          bg={!isFriend ? "#4169E1" : "rgba(200,200,200,0.3)"}
          color={!isFriend ? "white" : "black"}
          className=" relative rounded-2xl w-fit max-w-[300px] p-2 py-3"
        >
          <div
            className={` absolute top-[-6px] rotate-90 ${
              isFriend ? "left-[-2px]" : "right-[-2px]"
            }  `}
          >
            <Right_Angle
              size={"19px"}
              color={isFriend ? "rgba(240,240,240,1)" : "#4169E1"}
            />
          </div>
          {message?.replying && (
            <motion.div
              onClick={() => scrollToMessage(message?.replying?.id)}
              className={`text-[14px]  flex flex-col justify-start items-center overflow-hidden h-fit max-h-[60px]     my-2 rounded-r-lg border-t-gray-200 border-l-[2px] ${
                isFriend
                  ? "border-primary bg-[rgba(200,200,200,0.3)] text-black"
                  : "border-white bg-[rgba(30,63,174,0.7)] text-white"
              } `}
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
                {message?.replying?.text && (
                  <Flex
                    alignItems={"center"}
                    w={"100%"}
                    h={"45px"}
                    className=" ml-2"
                  >
                    <p>{message?.replying?.text.slice(0, 50) + "..."}</p>
                  </Flex>
                )}
                {message?.replying?.audio && (
                  <Flex
                    h={"45px"}
                    mx={2}
                    w={
                      (message?.replying?.audio && !message?.replying?.text) ||
                      !message?.replying?.image
                        ? "200px"
                        : "15%"
                    }
                    alignItems={"center"}
                    justify={"space-between"}
                  >
                    <Flex
                      justify={"space-between"}
                      alignItems={"center"}
                      className=" flex-1 w-full "
                    >
                      <Button
                        bg={"rgba(255,255,255,0.5)"}
                        color={"white"}
                        rounded={"full"}
                        h={10}
                        p={0}
                        width={10}
                      >
                        <BsPlayFill size={25} />
                      </Button>
                      {!message?.replying?.text && (
                        <Center gap={2}>
                          <BsSoundwave /> Audio
                        </Center>
                      )}
                    </Flex>
                  </Flex>
                )}

                {/* image and text */}
                {message?.replying?.image && (
                  <Flex
                    h={"45px"}
                    w={
                      message?.replying?.image && !message?.replying?.text
                        ? "200px"
                        : "20%"
                    }
                    className="flex-none"
                    alignItems={"center"}
                    justify={"space-between"}
                  >
                    <Image
                      alt="replyingImg"
                      src={message?.replying?.image}
                      w={!message?.replying?.text ? "15%" : "full"}
                      className={` flex-none h-full object-cover`}
                    />
                    {message?.replying?.image && !message?.replying?.text && (
                      <Center gap={2} className=" text-[14px]   h-full">
                        <FaImage />
                        <p>Image</p>
                      </Center>
                    )}
                  </Flex>
                )}
                {/* .............................................. */}
              </Flex>
            </motion.div>
          )}
          {localImgError && (
            <Flex
              bg={"rgba(145,143,179,0.5)"}
              px={2}
              rounded={"sm"}
              alignItems={"center"}
              className="text-[12px] text-black"
              gap={2}
            >
              <FaImages className="flex-none " size={25} />
              <p>Image has been deleted by user, Ask Your friend to Resend</p>
            </Flex>
          )}
          {message?.image && !localImgError && (
            <>
              <Image
                alt="messageImg"
                onClick={() => setOpen(true)}
                onError={() => setLocalImgError(true)}
                src={message?.image}
                width={"100%"}
                height={200}
                objectFit={"cover"}
              />
            </>
          )}
          <div className="text-[14px] break-words  ">
            <Linkify componentDecorator={customComponentDecorator}>
              {message?.text}
            </Linkify>
          </div>
          {message?.audio && (
            <CommentPlayer style={{ width: "250px" }} src={message?.audio} />
          )}
        </Box>
        <Flex
          w={"fit"}
          alignItems={"center"}
          className={` text-[12px] left-0 ${
            isFriend
              ? "justify-start ml-2 text-[10px]"
              : " mr-2 text-[10px] justify-end"
          }`}
        >
          {!message?.timestamp ? (
            <Spinner size={"xs"} />
          ) : (
            <Center gap={1}>
              <p className="text-[10px]">
                {moment(DateObjectFromObject(message?.timestamp)).format("LT")}
              </p>
              {!isFriend && (
                <>
                  {message?.isSent && !message?.isRead ? (
                    <BsCheck size={15} />
                  ) : (
                    <BsCheckAll size={15} />
                  )}
                </>
              )}
            </Center>
          )}
        </Flex>
      </div>
    </motion.div>
  );
};

export default MemoizedMessageItem;
