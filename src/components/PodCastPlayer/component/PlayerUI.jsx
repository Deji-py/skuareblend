import "react-spring-bottom-sheet/dist/style.css";
import AppStyledInput from "../../AppStyledInput";
import Chip from "../../MicroComps/Chip";
import CommentCard from "../../CommentCard";
import CommentSection from "../../CommentSection";
import LikePodCast from "./LikePodCast";
import QueueCard from "./QueueCard";
import React, { useContext, useEffect, useRef, useState } from "react";
import reason from "../../../assets/reason.mp3";
import { DownloadIcon } from "@chakra-ui/icons";
import { doc, getDoc } from "firebase/firestore";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { IoIosShuffle } from "react-icons/io";
import { db } from "../../../../firebaseConfig";
import { AudioContext } from "../context/AudioContext";

import {
  FaComment,
  FaComments,
  FaDownload,
  FaShare,
  FaVoteYea,
} from "react-icons/fa";

import {
  MdList,
  MdPlaylistPlay,
  MdRepeat,
  MdRepeatOne,
  MdShuffle,
  MdVerified,
} from "react-icons/md";

import {
  BsBorder,
  BsChevronDown,
  BsHeadset,
  BsHeart,
  BsHeartFill,
  BsListUl,
  BsPause,
  BsPauseFill,
  BsPlayFill,
  BsRepeat,
  BsShare,
  BsShuffle,
} from "react-icons/bs";

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Modal,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tag,
} from "@chakra-ui/react";

function PlayerUI({ setShowComments }) {
  const {
    audioQueue,
    currentAudioIndex,
    setCurrentAudioIndex,
    setPlaying,
    playing,
    setProgress,
    progress,
    handlePlayNext,
    handlePlayPrev,
    setPlayMode,
    playMode,
    elapsedTime,
    remainingTime,
  } = useContext(AudioContext);

  const [showQueue, setShowQueue] = useState(false);
  const [authorDetail, setAuthorDetail] = useState(null);
  const audioRef = useRef();

  const handleQueueItemClick = (index) => {
    console.log("called");
    setCurrentAudioIndex(index);
    setPlaying(true);
    setShowQueue(false);
    setProgress(0);
  };

  const currentTrack = audioQueue[currentAudioIndex];

  const handleTogglePlayMode = () => {
    switch (playMode) {
      case "order":
        setPlayMode("shuffle");
        break; // Add break here to exit the switch statement
      case "shuffle":
        setPlayMode("repeat");
        break; // Add break here to exit the switch statement
      case "repeat":
        setPlayMode("repeatOnce");
        break; // Add break here to exit the switch statement
      case "repeatOnce":
        setPlayMode("order");
        break; // Add break here to exit the switch statement
      default:
        setPlayMode("order");
        break; // Add break here to exit the switch statement
    }
  };

  //play pause functionality
  const handlePlay = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (audioQueue.length > 0) {
      const docRef = doc(db, "users", currentTrack?.author);
      const fetchDetail = async () => {
        const snapshot = await getDoc(docRef);
        setAuthorDetail(snapshot.data());
      };

      fetchDetail();

      return () => {
        fetchDetail();
      };
    }
  }, []);

  return (
    <Flex w={"full"} h={"full"} alignItems={"center"} flexDir={"column"}>
      <Flex
        px={5}
        justifyContent={"start"}
        className="w-full"
        alignItems={"center"}
      >
        <Flex pb={5} alignItems={"center"} gap={2} flex={1}>
          <Avatar size={"sm"} src={authorDetail?.profilepic} />
          <Box>
            <p className="text-[14px]">{authorDetail?.username}</p>
            <Flex className="text-[12px] text-gray-500" alignItems={"center"}>
              <MdVerified />
              {authorDetail?.trusts}
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        className="bg-white px-3 w-full flex-1"
      >
        <Box
          className={` ${
            playing && "rotatedisc"
          } w-[18rem] h-[18rem] rounded-full overflow-hidden`}
        >
          <Image
            alt="trackImg"
            src={currentTrack?.coverArt}
            className="w-full  h-full object-cover "
          />
        </Box>
        <Flex gap={5} className="my-3 mt-8">
          <Chip
            selectable={false}
            icon={BsHeart}
            label={[currentTrack?.likes?.length]}
          />
          <Chip
            selectable={false}
            icon={FaComments}
            label={currentTrack?.comments.length}
          />
        </Flex>
      </Flex>
      <Center flexDir={"column"} width={"full"} textAlign={"center"}>
        <h1 className="text-xl font-bold ">
          {currentTrack ? currentTrack?.title.slice(0, 30) + "..." : "No Audio"}
        </h1>
        <Tag className="mt-2" colorScheme="teal">
          One off Podcast
        </Tag>
        <div className="px-20 flex flex-col justify-center items-center relative h-20 my-5 overflow-hidden">
          <div className="w-full h-full absolute bg-gradient-to-b from-transparent to-white" />
          <p>{currentTrack?.description}</p>
          {currentTrack?.description?.length > 100 && (
            <span className=" absolute z-[1000] bottom-0 text-cyan-700">
              View all
            </span>
          )}
        </div>
      </Center>
      <Box className="w-full px-5 flex-1">
        <div className="   my-5">
          <Center
            justifyContent={"space-evenly"}
            bg={"whitesmoke"}
            rounded={"full"}
            className="my-5 py-3 w-full"
          >
            <LikePodCast podcast={currentTrack} />

            <IconButton
              bg={"none"}
              color={"gray.500"}
              icon={<DownloadIcon />}
            />
            <IconButton
              bg={"none"}
              color={"gray.500"}
              onClick={() => {
                setPlaying(false);
                setShowComments(true);
              }}
              icon={<FaComment />}
            />
            <IconButton bg={"none"} color={"gray.500"} icon={<FaShare />} />
          </Center>
        </div>
        <div className="w-full  px-0">
          <Slider
            aria-label="slider-ex-1"
            colorScheme={"cyan"}
            defaultValue={0}
            value={progress}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Flex className="text-[14px]" justifyContent={"space-between"}>
            <p>{elapsedTime}</p>
            <p>{remainingTime}</p>
          </Flex>
        </div>
        <Flex
          alignItems={"center"}
          justifyContent={"space-evenly"}
          className="w-full  "
        >
          <div onClick={handleTogglePlayMode}>
            {playMode === "order" && (
              <IconButton bg={"none"} icon={<MdList size={25} />} />
            )}
            {playMode === "repeat" && (
              <IconButton bg={"none"} icon={<MdRepeat size={25} />} />
            )}
            {playMode === "shuffle" && (
              <IconButton bg={"none"} icon={<MdShuffle size={25} />} />
            )}
            {playMode === "repeatOnce" && (
              <IconButton bg={"none"} icon={<MdRepeatOne size={25} />} />
            )}
          </div>
          <Center gap={5} justifyContent={"space-evenly"}>
            <IconButton
              onClick={handlePlayPrev}
              bg={"none"}
              icon={<CgPlayTrackPrev size={30} />}
            />

            <IconButton
              bg={"black"}
              onClick={handlePlay}
              _hover={{ bg: "black" }}
              color={"white"}
              icon={
                playing ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />
              }
              size={"lg"}
              width={"70px"}
              height={"70px"}
              rounded={"full"}
            />
            <IconButton
              onClick={handlePlayNext}
              bg={"none"}
              icon={<CgPlayTrackNext size={30} />}
            />
          </Center>
          <IconButton
            bg={"none"}
            onClick={() => setShowQueue(true)}
            icon={<MdPlaylistPlay size={25} />}
          />
        </Flex>
      </Box>
      <Drawer
        placement="bottom"
        isOpen={showQueue}
        onClose={() => setShowQueue(false)}
      >
        <DrawerOverlay />
        <DrawerContent zIndex={1000} bg={"white"} shadow={"2xl"}>
          <DrawerHeader className="text-sm">PlayList</DrawerHeader>
          <DrawerBody pb={10} px={2}>
            {audioQueue.map((audio, index) => (
              <button
                key={index}
                onClick={() => handleQueueItemClick(index)}
                className="w-full text-left"
              >
                <QueueCard
                  title={audio.title}
                  isPlaying={index === currentAudioIndex && playing}
                />
              </button>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default PlayerUI;
