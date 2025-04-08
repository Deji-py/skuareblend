import BlogTTS from "../BlogTTS";
import CommentChip from "../MicroComps/CommentsChip";
import CommentSection from "../CommentSection";
import DateObjectFromObject from "../../utility/DateObjectFromObject";
import FollowButton from "../FollowBtn/FollowButton";
import LikedChip from "../MicroComps/LikedChip";
import LoginPopUp from "../Authentication/LoginPopUp";
import SanitizedHTML from "../SanitizeHTML";
import SimilarBlog from "./SimilarBlog";
import moment from "moment";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BsChevronLeft } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  Center,
  Flex,
  Divider,
  IconButton,
  Spinner,
  Button,
  Icon,
  HStack,
  Tag,
} from "@chakra-ui/react";

const BlogLayout = () => {
  const { userId } = useContext(AuthContext);
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAlert, setShowAlert] = useState();

  useEffect(() => {
    if (!userId) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, []);

  const [authorData, setAuthorData] = useState({
    authorName: "",
    authorPic: "",
  });

  const fetchPost = async () => {
    setLoading(true);
    if (params) {
      try {
        const postRef = doc(db, "feed", params.id); // Assuming "feed" is your Firestore collection
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          setPost(postData);
        } else {
          // Handle the case where the post doesn't exist
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [params]);

  // Fetch author details
  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const authorDocRef = doc(db, "users", post?.authorId);
        const authorSnapshot = await getDoc(authorDocRef);
        if (authorSnapshot.exists()) {
          const authorDetails = authorSnapshot.data();
          setAuthorData({
            authorName: authorDetails.username,
            authorPic: authorDetails.profilepic,
            trusts: authorDetails.trusts,
          });
        }
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };

    if (post?.authorId) {
      fetchAuthorDetails();
    }
  }, [post?.authorId]);

  if (!post || loading) {
    return (
      <Center h={"70vh"} w={"full"}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Container px={2} className="mb-[100px] mt-10 md:mt-0">
      {/* Main Image */}

      <LoginPopUp
        isBlog={true}
        url={"/blog/" + post?.id}
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
      />

      <Helmet>
        <title>{authorData?.authorName}— Blog</title>
        <meta
          name="description"
          content={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 100)}
        />

        <meta
          property="og:url"
          content="https://www.skuareblend.com/blog/dec7a2a3-e427-4211-ad8d-ca123f50c556"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={post.title?.slice(0, 65)} />
        <meta
          property="og:description"
          content={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 100)}
        />
        <meta property="og:image" content={post.cover} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="skuareblend.com" />
        <meta
          property="twitter:url"
          content="https://www.skuareblend.com/blog/dec7a2a3-e427-4211-ad8d-ca123f50c556"
        />
        <meta name="twitter:title" content={post.title?.slice(0, 65)} />
        <meta
          name="twitter:description"
          content={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 100)}
        />

        <meta name="twitter:image" content={post.cover} />
        <link rel="canonical" href="/blog" />
      </Helmet>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        className="my-2"
      >
        <Link to="/home">
          <IconButton
            w={"20px"}
            h={"20px"}
            bg="none"
            p={0}
            icon={<BsChevronLeft />}
          />
        </Link>
        {userId ? (
          <>
            {userId !== post?.authorId && (
              <FollowButton
                style={{ paddingTop: "15px", paddingBottom: "15px" }}
                friendId={post?.authorId}
              />
            )}
          </>
        ) : (
          <Button
            onClick={() => setShowAlert(true)}
            color={"white"}
            bg={""}
            _hover={{ bg: "black" }}
            size={"sm"}
            px={6}
            rounded={"full"}
            className="bg-primary"
          >
            Sign in
          </Button>
        )}
      </Flex>
      <div className="relative">
        <Image
          src={post.cover}
          alt="Blog Cover Image"
          w="100%"
          h="200px"
          maxH="400px"
          borderRadius={10}
          objectFit="cover"
        />
      </div>

      {/* Blog Title */}
      <VStack className=" relative" mt={4} align="start">
        <HStack className="w-full" justify={"space-between"}>
          <Flex gap={2} alignItems={"center"} position={"relative"}>
            <Image
              alt="authorPic"
              src={authorData?.authorPic}
              className=" w-[30px] bg-gray-200 h-[30px] rounded-md object-cover"
            />
            <Box>
              <h1 className={" text-[12px]"}>{authorData?.authorName}</h1>
              <HStack gap={1} className={" text-gray-500 text-[12px]"}>
                <MdVerified />
                <p className="text-[12px]">{authorData?.trusts}</p>
              </HStack>
            </Box>
          </Flex>
          <Tag colorScheme="blue" className="mr-2" size={"sm"}>
            {post?.category}
          </Tag>
        </HStack>
        <Heading size="lg">{post?.title}</Heading>
        <Flex
          gap={5}
          mb={2}
          className="w-full"
          justify={"space-between"}
          alignItems={"center"}
        >
          <Flex
            alignItems={"center"}
            className="text-[14px]"
            gap={1}
            color={"gray"}
          >
            <p>Published </p>
            <Flex
              alignItems={"center"}
              className="text-[12px] "
              gap={1}
              color={"gray"}
            >
              <Icon as={FaRegClock} size={20} />
              <Text>
                {moment(DateObjectFromObject(post?.createdAt)).format(
                  "MMM DD YYYY, LT"
                )}
              </Text>
            </Flex>
          </Flex>
          <Center gap={2}>
            <WhatsappShareButton
              title={post?.title}
              about={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              quote={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              url={"http://skuareblend.com/blog/" + post?.id}
            >
              <WhatsappIcon size={25} round={"full"} />
            </WhatsappShareButton>

            <FacebookShareButton
              title={post?.title}
              about={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              quote={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              url={"http://skuareblend.com/blog/" + post?.id}
            >
              <FacebookIcon size={25} round={"full"} />
            </FacebookShareButton>
            <TelegramShareButton
              title={post?.title}
              about={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              quote={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              url={"http://skuareblend.com/blog/" + post?.id}
            >
              <TelegramIcon size={25} round={"full"} />
            </TelegramShareButton>
            <LinkedinShareButton
              title={post?.title}
              about={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              quote={post?.blogContent.replace(/<[^>]*>/g, "").slice(0, 150)}
              url={"http://skuareblend.com/blog/" + post?.id}
            >
              <LinkedinIcon size={25} round={"full"} />
            </LinkedinShareButton>
          </Center>
        </Flex>
        <Flex gap={2} my={2}>
          <CommentChip postId={post?.id} />
          <LikedChip
            feedType={"blog"}
            isPost={true}
            path={"feed"}
            likes={post?.likes}
            postId={post?.id}
          />
        </Flex>
      </VStack>

      {/* Blog Content */}

      <Box className="relative">
        {!userId && (
          <Center className=" bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-white to-white z-[1000] w-full left-0 h-[50%] absolute top-[50%] ">
            <Button
              onClick={() => setShowAlert(true)}
              color={"white"}
              bg={""}
              _hover={{ bg: "black" }}
              size={"sm"}
              px={6}
              rounded={"full"}
              className="bg-primary absolute"
            >
              Continue Reading
            </Button>
          </Center>
        )}
        <Text fontSize="sm">
          <SanitizedHTML hideText={!userId} htmlString={post.blogContent} />
        </Text>
        {/* Add more content here */}
      </Box>
      <Divider />
      {userId && <CommentSection friendId={post?.authorId} blogId={post?.id} />}

      {/* <MorePosts /> */}
      <SimilarBlog category={post?.category} postId={params?.id} />
    </Container>
  );
};

export default BlogLayout;
