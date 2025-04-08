import Chip from "../../../components/MicroComps/Chip";
import Comments_Counter from "../../../components/Comment/Comments_Counter";
import DateObjectFromObject from "../../../utility/DateObjectFromObject";
import moment from "moment";
import { StarIcon } from "@chakra-ui/icons";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { CgPlayListAdd } from "react-icons/cg";
import { FaHeart, FaShare, FaVoteYea } from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";
import { AudioContext } from "../../../components/PodCastPlayer/context/AudioContext";

import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  BsBookmark,
  BsDownload,
  BsPauseFill,
  BsPlayFill,
  BsSave,
  BsShare,
  BsShareFill,
  BsStar,
  BsStarFill,
  BsThreeDots,
} from "react-icons/bs";

import {
  Box,
  Text,
  Image,
  Flex,
  Tag,
  Center,
  IconButton,
  Button,
  useToast,
  Avatar,
} from "@chakra-ui/react";

function SmallPodcastCard({ podcast, isEpisode, index }) {
  const { userId, openPlayer } = useContext(AuthContext);
  const [duration, setDuration] = useState(0);
  const [authorDetail, setAuthorDetail] = useState([]);
  const toast = useToast();

  const {
    setPlaying,
    audioQueue,
    playing,
    currentAudioIndex,
    setCurrentAudioIndex,
    setAudioQueue,
    progress,
  } = useContext(AudioContext);

  const data = {
    title: podcast?.title,
    audio: podcast?.audioUrl,
    coverArt: podcast?.coverArt,
    id: podcast?.id,
    author: podcast?.authorId,
    likes: podcast?.likes,
    description: podcast?.description,
    listens: podcast?.listens,
    comments: podcast?.comments,
  };
  const isCurrentlyPlaying =
    audioQueue.length > 0 &&
    playing &&
    audioQueue[currentAudioIndex]?.title === podcast?.title;

  const updateListen = async () => {
    try {
      const docRef = doc(db, "podcasts", podcast?.id);
      if (authorDetail?.uid === userId) {
        return;
      }

      if (progress >= 80 && isCurrentlyPlaying) {
        await updateDoc(docRef, { listens: arrayUnion(userId) });
      }
    } catch (e) {
      console.log("something is not right", e.message);
    }
  };

  if (playing) {
    updateListen();
  }

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === Infinity) {
      return "00:00";
    }

    const duration = moment.duration(timeInSeconds, "seconds");
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    if (hours === 0) {
      if (minutes === 0) {
        return `${formattedSeconds}sec`;
      } else {
        return `${formattedMinutes}min ${formattedSeconds}sec`;
      }
    } else {
      return `${formattedHours}hr ${formattedMinutes}min ${formattedSeconds}sec`;
    }
  };

  var getDuration = function (url, next) {
    var _player = new Audio(url);
    _player.addEventListener(
      "durationchange",
      function (e) {
        if (this.duration != Infinity) {
          var duration = this.duration;
          _player.remove();
          next(duration);
        }
      },
      false
    );
    _player.load();
    _player.currentTime = 24 * 60 * 60; //fake big time
    _player.volume = 0;

    //waiting...
  };

  useLayoutEffect(() => {
    getDuration(podcast?.audioUrl, (duration) => {
      setDuration(duration);
    });
  }, []);

  const handlePlayQueue = () => {
    // Add the clicked podcast to the queue
    setAudioQueue([data]);

    // If nothing is currently playing, start playing the clicked podcast
    setCurrentAudioIndex(0);
    setPlaying(true);
  };

  useEffect(() => {
    const docRef = doc(db, "users", podcast?.authorId);
    const fetchDetail = async () => {
      const snapshot = await getDoc(docRef);
      setAuthorDetail(snapshot.data());
    };

    fetchDetail();

    return () => {
      fetchDetail();
    };
  }, []);

  const addToPlayList = () => {
    const docRef = doc(db, "users", userId);
    updateDoc(docRef, { myPlayList: arrayUnion(data) })
      .then(() => {
        toast({
          title: "Added to playList",
          status: "success",
          position: "top",
        });
      })
      .catch((Error) => {
        toast({
          title: "Something went wrong",
          position: "top",
        });
      });
  };

  const handlePlayQueueWithDrawerOpen = () => {
    // Add the clicked podcast to the queue
    setAudioQueue([data]);

    // If nothing is currently playing, start playing the clicked podcast
    setCurrentAudioIndex(0);
    setPlaying(true);
    openPlayer();
  };

  return (
    <Center key={index} className="w-full  relative">
      {isEpisode && (
        <>
          <Box className="bg-gray-200 w-[95%]  rounded-3xl translate-y-5 h-[80px] absolute  " />
          <Box className="bg-gray-300 w-[100%] rounded-3xl translate-y-5 h-[70px] absolute  " />
        </>
      )}

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow=""
        className="md:w-full w-[500px]  relative overflow-hidden h-fit "
        bg={"white"}
        w={""}
        h={"fit"}
        display={"flex"}
        p={2}
      >
        <Flex flex={1} gap={2}>
          <Center
            onClick={handlePlayQueueWithDrawerOpen}
            className="w-[30%] h-[100px] rounded-xl overflow-hidden "
          >
            <Image
              className="w-full h-full object-cover"
              src={podcast?.coverArt}
              alt={podcast?.title}
            />
          </Center>

          <Box className="flex-1 overflow-hidden">
            <Text
              onClick={handlePlayQueueWithDrawerOpen}
              mt="2"
              className="text-[14px] w-full"
              fontWeight="semibold"
            >
              {podcast?.title.slice(0, 35) + "..."}
            </Text>
            <Flex gap={2} mt={1} alignItems={"center"}>
              <p className="text-[11px]">{podcast?.likes.length} Likes</p>
              <MdCircle size={5} />
              <p className="text-[11px]"> {podcast?.listens.length} Listens</p>
              <MdCircle size={5} />
              <p className=" text-[11px] text-gray-400">
                {formatTime(duration)}
              </p>
            </Flex>
            <Flex className=" justify-between" py={2}>
              <Flex alignItems={"center"} gap={2}>
                <Button
                  rounded={"full"}
                  size={"xs"}
                  bg={""}
                  className="bg-primary"
                  color={"cyan.200"}
                  gap={1}
                  px={4}
                  _hover={{ bg: "black" }}
                  onClick={handlePlayQueue}
                >
                  {isCurrentlyPlaying ? <BsPauseFill /> : <BsPlayFill />}
                  {isCurrentlyPlaying ? <p>Playing</p> : <p>Play</p>}
                </Button>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  {isEpisode ? (
                    <Tag colorScheme="blue" rounded={"full"} size={"sm"}>
                      Episode
                    </Tag>
                  ) : (
                    <Tag colorScheme="teal" rounded={"full"} size={"sm"}>
                      Podcast
                    </Tag>
                  )}
                </Flex>

                <Button
                  onClick={addToPlayList}
                  rounded={"full"}
                  p={1}
                  size={"xs"}
                  alignItems={"center"}
                >
                  <CgPlayListAdd className="text-gray-500" size={15} />
                </Button>
              </Flex>
              {authorDetail?.uid === userId ? (
                <IconButton icon={<BsThreeDots />} bg={""} size={"xs"} />
              ) : (
                <Link
                  to={"/user_profile/" + authorDetail?.uid}
                  state={authorDetail?.uid}
                >
                  <Avatar src={authorDetail?.profilepic} size={"xs"} />
                </Link>
              )}
            </Flex>
            <Box>
              <Comments_Counter comments={podcast?.comments} />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}

export default SmallPodcastCard;
