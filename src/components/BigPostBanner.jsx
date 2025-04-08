import "react-h5-audio-player/lib/styles.css";
import BlogTTS from "./BlogTTS";
import Chip from "./MicroComps/Chip";
import CommentChip from "./MicroComps/CommentsChip";
import DateObjectFromObject from "../utility/DateObjectFromObject";
import FollowButton from "./FollowBtn/FollowButton";
import LikedChip from "./MicroComps/LikedChip";
import Lottie from "lottie-react";
import VoteChip from "./MicroComps/VoteChip";
import like from "../assets/lotties/like.json";
import moment from "moment";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { CgChevronRight } from "react-icons/cg";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../App";

import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

import {
  FaComment,
  FaHeart,
  FaRegClock,
  FaShare,
  FaVoteYea,
} from "react-icons/fa";

function BigPostBanner({ blog }) {
  const [authorDetail, setAuthorDetail] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes.length);
  const { userId } = useContext(AuthContext);
  const [Voted, setVoted] = useState(false);

  const isUsersPost = userId === blog?.authorId;

  useEffect(() => {
    const docRef = doc(db, "users", blog?.authorId);
    const fetchAuthorDetail = async () => {
      const result = await getDoc(docRef);
      setAuthorDetail(result.data());
    };
    fetchAuthorDetail();
  }, []);

  useEffect(() => {
    // Check if the current user's ID is in the likes array of the blog
    if (blog?.likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    if (blog?.votes.includes(userId)) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [blog?.likes, userId]);

  useEffect(() => {
    const docRef = doc(db, "users", blog?.authorId);
    const fetchAuthorDetail = async () => {
      const result = await getDoc(docRef);
      setAuthorDetail(result.data());
    };
    fetchAuthorDetail();
  }, []);

  const datecreated = moment(DateObjectFromObject(blog?.createdAt)).format(
    "lll"
  );

  const stateData = {
    ...blog,
    published: datecreated,
  };

  return (
    <motion.div // Wrap the entire component with motion.div
      initial={{ opacity: 0, y: 20 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Animation to perform when the component mounts
      transition={{ duration: 0.5 }} // Animation duration
      className=" w-full relative rounded-xl md:w-full bg-white shadow shadow-slate-200 mb-2  
      "
    >
      <Stack>
        <Box className="   relative flex flex-col justify-center items-center overflow-hidden w-full h-[300px] md:h-[250px]">
          <Image
            alt="blogcover"
            className="w-full h-full"
            fit={"cover"}
            src={blog?.cover}
          />
        </Box>
        <Stack className=" px-2 pb-3">
          <Box>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Link
                state={blog?.authorId}
                to={
                  userId === blog?.authorId
                    ? "/profile"
                    : "/user_profile/" + blog?.authorId
                }
              >
                <Flex alignItems={"center"} gap={5}>
                  <Flex
                    alignItems={"center"}
                    className="text-[12px]"
                    gap={1}
                    color={"gray"}
                  >
                    <Avatar
                      src={authorDetail?.profilepic}
                      size={"sm"}
                      borderRadius={5}
                    />
                    <div>
                      <Text>{authorDetail?.username}</Text>
                      <Flex alignItems={"center"}>
                        <MdVerified /> <p>{authorDetail?.trusts}</p>
                      </Flex>
                    </div>
                  </Flex>
                </Flex>
              </Link>
              {!isUsersPost && (
                <FollowButton
                  style={{
                    paddingTop: "15px",
                    marginRight: -1,
                    paddingBottom: "15px",
                  }}
                  friendId={blog?.authorId}
                />
              )}
            </Flex>

            <Flex mt={4} justifyContent={"space-between"} alignItems={"center"}>
              <Flex gap={2} alignItems={"center"}>
                <Tag colorScheme="blue" size={"sm"} title="Category">
                  {blog?.category}
                </Tag>
              </Flex>
            </Flex>
            <Link to={"/blog/" + blog?.id} state={stateData}>
              <Flex justifyContent={"space-between"} mt={2}>
                <Heading as="h2" size={"lg"} fontWeight={"bold"}>
                  {blog?.title?.slice(0, 100)}
                  {blog?.title?.length > 100 && "..."}
                </Heading>
              </Flex>
              <Flex gap={5} mb={2} alignItems={"center"}>
                <Flex
                  alignItems={"center"}
                  className="text-[12px] "
                  gap={1}
                  color={"gray"}
                >
                  <Icon as={FaRegClock} size={20} />
                  <Text>
                    {moment(DateObjectFromObject(blog?.createdAt)).format(
                      "MMM DD YYYY, LT"
                    )}
                  </Text>
                </Flex>
              </Flex>

              <Box className="text-[14px]">
                {blog?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150) +
                  "..."}

                <p className=" text-sm font-bold underline mb-2 text-primary">
                  Read More
                </p>
              </Box>
            </Link>
            <Flex
              justifyContent={"space-between"}
              className="gap-5 mt-5 text-[12px] flex-wrap"
            >
              <Center gap={2}>
                <WhatsappShareButton
                  title={blog?.title}
                  about={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  quote={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  url={"http://skuareblend.vercel.app/blog/" + blog?.id}
                >
                  <WhatsappIcon size={25} round={"full"} />
                </WhatsappShareButton>

                <FacebookShareButton
                  title={blog?.title}
                  about={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  quote={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  url={"http://skuareblend.vercel.app/blog/" + blog?.id}
                >
                  <FacebookIcon size={25} round={"full"} />
                </FacebookShareButton>
                <TelegramShareButton
                  title={blog?.title}
                  about={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  quote={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  url={"http://skuareblend.vercel.app/blog/" + blog?.id}
                >
                  <TelegramIcon size={25} round={"full"} />
                </TelegramShareButton>
                <LinkedinShareButton
                  title={blog?.title}
                  about={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  quote={blog?.blogContent
                    .replace(/<[^>]*>/g, "")
                    .slice(0, 150)}
                  url={"http://skuareblend.vercel.app/blog/" + blog?.id}
                >
                  <LinkedinIcon size={25} round={"full"} />
                </LinkedinShareButton>
              </Center>

              <Flex alignItems={"center"} gap={2}>
                <Link to={"/blog/" + blog?.id} state={stateData}>
                  <CommentChip postId={blog?.id} />
                </Link>
                <LikedChip
                  isPost={true}
                  feedType={"blog"}
                  path={"feed"}
                  likes={blog?.likes}
                  friendId={blog?.authorId}
                  postId={blog?.id}
                />
              </Flex>
            </Flex>
          </Box>
        </Stack>
      </Stack>
    </motion.div>
  );
}

export default BigPostBanner;
