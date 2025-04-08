import LikePodCast from "./component/LikePodCast";
import QueueCard from "./component/QueueCard";
import ReactPlayer from "react-player";
import { BsHeart, BsHeartFill, BsPauseFill, BsPlayFill } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { MdPlaylistPlay } from "react-icons/md";
import { BottomSheet } from "react-spring-bottom-sheet";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";
import { AudioContext } from "./context/AudioContext";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
} from "@chakra-ui/react";

function SmallPlayer() {
  const { openPlayer } = useContext(AuthContext);
  const {
    audioQueue,
    handlePlayPause,
    playing,
    setPlaying,
    setProgress,
    setCurrentAudioIndex,
    currentAudioIndex,
    progress,
  } = useContext(AudioContext);

  const [showQueue, setShowQueue] = useState(false);
  const [authorDetail, setAuthorDetail] = useState(null);

  const { userId, userData } = useContext(AuthContext);

  const handleQueueItemClick = (index) => {
    setCurrentAudioIndex(index);
    setPlaying(true);
    setShowQueue(false);
    setProgress(0);
  };

  useEffect(() => {
    if (audioQueue?.length > 0) {
      const fetchDetail = async () => {
        const docRef = doc(db, "users", audioQueue[currentAudioIndex]?.author);
        const snapshot = await getDoc(docRef);
        setAuthorDetail(snapshot.data());
      };

      if (userId !== audioQueue[currentAudioIndex]?.author) {
        fetchDetail();
        return () => {
          fetchDetail();
        };
      }
    }
  }, [audioQueue]);
  // Use the onProgress event to get real-time progress updates
  if (audioQueue?.length === 0) {
    return;
  }
  return (
    <Flex className=" p-2  fixed bg-white border-t-[1.5px]  bottom-[50px] w-full ">
      <Flex
        flex={1}
        onClick={() => openPlayer()}
        alignItems={"center"}
        gap={2}
        className="left"
      >
        <Box className="bg-gray-200 overflow-hidden rounded-lg w-[50px] h-[50px]">
          <Image
            alt="audio"
            className="w-full h-full object-cover"
            src={audioQueue[currentAudioIndex]?.coverArt}
          />
        </Box>
        <Box>
          <h2>
            {audioQueue[currentAudioIndex]
              ? audioQueue[currentAudioIndex]?.title.slice(0, 25) + "..."
              : "No Audio"}
          </h2>
          <p className="text-gray-400 text-[12px]">
            {userId !== audioQueue[currentAudioIndex].author
              ? authorDetail?.username
              : userData?.username}
          </p>
        </Box>
      </Flex>
      <Center gap={2} className="left">
        <LikePodCast podcast={audioQueue[currentAudioIndex]} />
        <CircularProgress trackColor="white" color="cyan.600" value={progress}>
          <CircularProgressLabel>
            <IconButton
              color={"cyan.600"}
              bg={"gray.100"}
              rounded={"full"}
              icon={
                playing ? <BsPauseFill size={20} /> : <BsPlayFill size={20} />
              }
              onClick={handlePlayPause}
            />
          </CircularProgressLabel>
        </CircularProgress>
        <IconButton
          bg={"none"}
          rounded={"full"}
          icon={<MdPlaylistPlay size={20} />}
          onClick={() => setShowQueue(true)}
        />
      </Center>
      <Drawer
        placement="bottom"
        isOpen={showQueue}
        onClose={() => setShowQueue(false)}
      >
        <DrawerOverlay />
        <DrawerContent bg={"white"} shadow={"2xl"}>
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

export default SmallPlayer;
