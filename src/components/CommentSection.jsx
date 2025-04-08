import CommentCard from "./CommentCard";
import Notifier from "../pages/Notifications/Services/Notifier";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Box, Button, Center, Flex, Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../App";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function CommentSection({ blogId, friendId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { userId } = useContext(AuthContext);
  const [showReply, setShowReply] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [isInputVisible, setInputVisible] = useState(false);

  const slideInAnimation = {
    hidden: { translateY: "100%" },
    visible: { translateY: "0%" },
  };

  const slideOutAnimation = {
    hidden: { translateY: "0%" },
    visible: { translateY: "100%" },
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const id = uuidv4();

  const handleCommentSubmit = async () => {
    setInputVisible(false);
    if (comment.trim() !== "") {
      const commentData = {
        id: id,
        text: comment,
        commentId: userId,
        likes: [],
        replies: [],
      };
      try {
        const blogRef = doc(db, "feed", blogId);
        const commentsRef = collection(blogRef, "comments");

        if (parentCommentId) {
          // Reply to a comment
          const parentCommentRef = doc(commentsRef, parentCommentId);
          const parentCommentSnapshot = await getDoc(parentCommentRef);

          if (parentCommentSnapshot.exists()) {
            const parentCommentData = parentCommentSnapshot.data();
            parentCommentData.replies.push(commentData); // Add the reply to the array

            // Update the parent comment with the updated replies array
            await updateDoc(parentCommentRef, {
              replies: parentCommentData.replies,
            });
          } else {
            console.error("Parent comment not found.");
          }
        } else {
          // Add a new top-level comment with the custom ID
          const newCommentRef = doc(commentsRef, id); // Use the custom ID
          await setDoc(newCommentRef, {
            ...commentData,
            replies: [], // Initialize replies as an empty array for top-level comments
          });
        }
        await Notifier(userId, friendId, blogId, "commented", comment, "blog");
        setComment("");
        setParentCommentId(null); // Clear the parent comment ID
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleReplyClick = (commentId) => {
    // Slide the input out when replying
    setInputVisible(true);
    setShowReply(!showReply);
    // Set the parent comment ID that you are replying to
    setParentCommentId(commentId);
  };

  useEffect(() => {
    // Load comments from Firestore
    const blogRef = doc(db, "feed", blogId);
    const commentsRef = collection(blogRef, "comments");

    const unsubscribe = onSnapshot(commentsRef, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
      console.log(commentsData);
    });

    return () => {
      unsubscribe();
    };
  }, [blogId]);

  const renderComments = (commentData, depth = 0, isReply = false) => {
    return (
      <div
        key={commentData.id}
        className={` border-l-2 px-1 w-full
         comment-depth-${depth}`}
      >
        <CommentCard
          commentData={commentData}
          onReplyClick={handleReplyClick}
          onCommentSubmit={handleCommentSubmit}
          isReply={isReply}

          // Pass the reply target
        />

        <>
          {commentData?.replies.length > 0 && (
            <div className="ml-4 ">
              {commentData.replies.map((reply) =>
                renderComments(reply, depth + 1, (isReply = true))
              )}
            </div>
          )}
        </>
      </div>
    );
  };

  return (
    <div className="comment-section   rounded-lg pb-5 my-5">
      {/* Input field for new comment */}
      <Box className=" mt-5">
        <Button
          bg={"md"}
          size={"sm"}
          onClick={() => setInputVisible(!isInputVisible)}
          _hover={{ bg: "black" }}
          color={"white"}
          className=" bg-primary"
        >
          Add Comment
        </Button>
      </Box>
      <motion.div
        className={`border-t-[2px] z-[10] w-full left-0  comment-input-container  fixed bg-white bottom-[50px] ${
          isInputVisible ? " translate-y-[-100%]" : " translate-y-44"
        }`}
        variants={isInputVisible ? slideInAnimation : slideOutAnimation}
        initial="hidden"
        animate={{
          y: isInputVisible ? 0 : 100,
        }}
        exit={{ y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Box left={0} px={3} pt={3} bg={"white"} pb={4}>
          <Flex gap={2} className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              className="flex-1 rounded-full"
              onChange={handleCommentChange}
            />
            <Button
              rounded={"full"}
              bg=""
              color="white"
              className=" bg-gray-800 comment-Button"
              onClick={() => handleCommentSubmit()} // Pass the reply target
            >
              <MdSend />
            </Button>
          </Flex>
        </Box>
      </motion.div>
      <Center flexDir={"column"} className="w-full mb-10 ">
        {comments.length === 0 ? (
          <p className="mt-10 text-gray-500 text-[14px] text-center">
            No comments.
            <br /> Be the first to comment.
          </p>
        ) : (
          comments.map((commentData) => renderComments(commentData))
        )}
      </Center>
    </div>
  );
}

export default CommentSection;
