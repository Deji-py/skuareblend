import CommentChip from "../../../components/MicroComps/CommentsChip";
import Comments_Counter from "../../../components/Comment/Comments_Counter";
import DateObjectFromObject from "../../../utility/DateObjectFromObject";
import FollowButton from "../../../components/FollowBtn/FollowButton";
import HighlightHashTags from "../../../utility/HighlightHashTags";
import LikedChip from "../../../components/MicroComps/LikedChip";
import PostCardImages from "./PostCardImages";
import YouTubePlayer from "../../../components/ReUsables/YoutubePlayer";
import anonymous from "../../../assets/anonymous.png";
import fetchUser from "../../../Services/fetchUser";
import moment from "moment";
import { Avatar, Box, Center, Flex, IconButton } from "@chakra-ui/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

function Post_Card({ item, isPage }) {
  const [userDetail, setUserDetail] = useState(null);
  const [comment, setComment] = useState(null);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    // Check if item exists and has an id before fetching user data
    if (item?.uid) {
      const getUserData = async () => {
        const userData = await fetchUser(item.uid);
        setUserDetail(userData);
      };
      getUserData();
    }
  }, [item]);

  const fetchComments = () => {
    if (item) {
      const commentsRef = collection(db, "feed", item?.id, "comments");
      const commentsQuery = query(commentsRef);

      return onSnapshot(commentsQuery, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(commentsData);
        setComment(commentsData);
      });
    }
    return () => {}; // Return an empty function if there's no postId
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Memoize the userDetail data to prevent unnecessary re-fetching
  const memoizedUserDetail = useMemo(() => userDetail, [userDetail]);

  return (
    <div className=" text-[14px]   bg-white  shadow shadow-slate-200">
      <Flex alignItems={"center"} py={2} justifyContent={"space-between"}>
        {!memoizedUserDetail ? (
          <Center gap={2} px={2} className=" animate-pulse">
            <Box className="w-[35px] h-[35px] rounded-md bg-gray-200" />
            <Box>
              <p className="text-[12px]  w-20 h-3 rounded-full bg-gray-200" />
              <p className="text-[12px] mt-2 rounded-full bg-gray-200 w-10 h-3" />
            </Box>
          </Center>
        ) : (
          <Center px={2} gap={2}>
            {item?.isDiscreet ? (
              <>
                <Avatar src={anonymous} size={"sm"} />
                <p className="text-gray-600 text-[12px] bg-gray-200 rounded-full px-2">
                  Anonymous
                </p>
              </>
            ) : (
              <>
                <Link
                  to={
                    memoizedUserDetail?.uid === userId
                      ? "/profile"
                      : "/user_profile/" + memoizedUserDetail?.uid
                  }
                >
                  <Center gap={2}>
                    <Avatar
                      w={"35px"}
                      borderRadius={"md"}
                      height={"35px"}
                      src={memoizedUserDetail?.profilepic}
                    />
                    <Box>
                      <p className="text-[12px]">
                        {memoizedUserDetail?.username}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        {memoizedUserDetail?.nickname}
                      </p>
                    </Box>
                  </Center>
                </Link>
              </>
            )}
          </Center>
        )}

        <Center>
          {userId !== item?.uid && !item.isDiscreet && (
            <FollowButton
              friendId={item?.uid}
              style={{ padding: "15px 20px" }}
            />
          )}
          <IconButton
            ml={-2}
            bg={""}
            icon={<BsThreeDotsVertical />}
            size={"sm"}
          />
        </Center>
      </Flex>
      {item?.images && item?.images.length > 0 && (
        <PostCardImages item={item} />
      )}
      {item?.youtubeLinks?.length > 0 && (
        <Box className="w-screen mt-1">
          <YouTubePlayer youtubeUrl={item?.youtubeLinks[0]} />
        </Box>
      )}
      <Box className="p-2">
        <Link to={"/post/" + item?.id}>
          <Box className="pb-2">
            <p className="text-[12px] text-gray-500">
              {moment(DateObjectFromObject(item?.createdAt)).format("lll")}
            </p>

            <Box className=" text-[14px] ">
              <HighlightHashTags text={item?.text} />
            </Box>
          </Box>
        </Link>

        <Flex
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="mt-3"
        >
          <Comments_Counter comments={comment} />
          <Center gap={3}>
            <Link to={"/post/" + item?.id}>
              <CommentChip id={item?.uid} postId={item?.id} />
            </Link>
            <LikedChip
              friendId={memoizedUserDetail?.uid}
              likes={item?.likes}
              path={"feed"}
              isPost={true}
              postId={item?.id}
            ></LikedChip>
          </Center>
        </Flex>
      </Box>
    </div>
  );
}

export default Post_Card;
