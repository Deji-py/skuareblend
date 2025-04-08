import Chip from "../MicroComps/Chip";
import CommentPlayer from "./CommentPlayer";
import DateObjectFromObject from "../../utility/DateObjectFromObject";
import LikedChip from "../MicroComps/LikedChip";
import fetchUser from "../../Services/fetchUser";
import moment from "moment";
import { Avatar, Box, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { db } from "../../../firebaseConfig";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function CommentCard({
  isReply,
  commentData,
  setSelectedCommentIndex,
  parentId,
  setIsReplying,
  index,
  postId,
  subcommentId,
  subCommentpostId,
  hideReplies,
}) {
  const [subComments, setSubComments] = useState([]);
  const [showSubComments, setShowSubComments] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (!isReply) {
      fetchSubComments();
    }
  }, [isReply]);

  useEffect(() => {
    if (commentData.uid) {
      const getUserData = async () => {
        const userData = await fetchUser(commentData.uid);
        setUserDetail(userData);
      };
      getUserData();
    }
  }, [commentData.uid]);

  const fetchSubComments = async () => {
    try {
      let subCommentQuery;

      if (!commentData?.parentId) {
        const commentRef = doc(db, "feed", postId, "comments", commentData?.id);
        subCommentQuery = query(
          collection(commentRef, "comments"),
          orderBy("createdAt")
        );
        onSnapshot(subCommentQuery, (dataSnapshot) => {
          const replies = [];

          dataSnapshot.forEach((doc) => {
            // Access the data of each document and push it to the replies array
            replies.push(doc.data());
          });
          setSubComments(replies);
        });
      } else {
        const commentRef = doc(db, "feed", postId, "comments", parentId);
        subCommentQuery = query(collection(commentRef), orderBy("createdAt"));
        const subCommentSnapshot = await getDocs(subCommentQuery);
        const subCommentsData = subCommentSnapshot.docs.map((doc) =>
          doc.data()
        );
        console.log("Subcomments Data:", subCommentsData);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleReply = () => {
    setIsReplying(true);
    setSelectedCommentIndex(index);
  };

  const toggleSubComments = () => {
    setShowSubComments(!showSubComments);
  };

  return (
    <Flex
      flexDir={"column"}
      className="px-2 bg-white pb-2 rounded-xl  shadow-md shadow-gray-100 pt-3 border-[1.5px]"
    >
      <Flex justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
          <Avatar width={"30px"} height={"30px"} src={userDetail?.profilepic} />
          <Box>
            <p className="text-[12px] font-bold">{userDetail?.username}</p>
            <p className="text-[11px] text-gray-500">
              {moment(DateObjectFromObject(commentData?.createdAt)).fromNow()}
            </p>
          </Box>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <LikedChip
            postId={postId}
            subCommentpostId={subCommentpostId}
            subcommentId={subcommentId?.id}
            parentId={parentId}
            isCollection={true}
            path={"feed"}
            commentId={commentData?.id}
            likes={commentData?.likes}
          />
        </Flex>
      </Flex>

      <Flex mb={"-15px"} flexDir={"column"}>
        <Box className="ml-3 mt-2  text-[12px]">
          {!commentData?.audioUrl && commentData?.text && (
            <p className="">{commentData?.text.slice(0, 200) + "..."}</p>
          )}
          {commentData?.audioUrl && !commentData?.text && (
            <CommentPlayer src={commentData?.audioUrl} />
          )}
          {commentData?.audioUrl && commentData?.text && (
            <>
              <CommentPlayer src={commentData?.audioUrl} />
              <p className="">{commentData?.text.slice(0, 200) + "..."}</p>
            </>
          )}
        </Box>
        {!hideReplies && (
          <>
            {!isReply && (
              <Flex
                alignItems={"center"}
                mt={2}
                ml={3}
                justifyContent={"space-between"}
              >
                <button onClick={toggleSubComments}>
                  <Chip
                    label={`View ${
                      showSubComments ? "Less" : "More"
                    } Replies (${
                      Array.isArray(subComments) ? subComments.length : 0
                    })`}
                  />
                </button>
                <button onClick={handleReply}>
                  <Chip
                    bgColor="black"
                    textColor={"white"}
                    icon={FaReply}
                    label={"Reply"}
                  />
                </button>
              </Flex>
            )}
          </>
        )}
      </Flex>

      <Stack gap={2} ml={5} mt={5}>
        {showSubComments &&
          subComments.map((subComment, subIndex) => (
            <CommentCard
              key={subComment.id}
              isReply={true}
              subCommentpostId={subComment.postId}
              commentData={subComment}
              setSelectedCommentIndex={setSelectedCommentIndex}
              parentId={subComment.parentId}
              setIsReplying={setIsReplying}
              index={subIndex}
              subcommentId={subComment}
            />
          ))}
      </Stack>
    </Flex>
  );
}

export default CommentCard;
