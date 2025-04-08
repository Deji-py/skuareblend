import Chip from "./Chip";
import Notifier from "../../pages/Notifications/Services/Notifier";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function LikedChip({
  friendId,
  subCommentpostId,
  likes,
  path,
  parentId,
  postId,
  subcommentId,
  commentId,
  isPost,
  feedType,
}) {
  const { userId } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(likes?.length);
  const [liked, setLiked] = useState(likes?.includes(userId) || false);

  const handleLikeClick = async () => {
    try {
      let docRef;
      if (parentId && subcommentId) {
        // If there is both parentId and subcommentId, update a sub-subcollection
        const mainDocRef = doc(
          db,
          path,
          subCommentpostId,
          "comments",
          parentId
        );
        const subDocRef = doc(mainDocRef, "comments", subcommentId);

        // Check if the document exists before updating
        const docSnapshot = await getDoc(subDocRef);

        if (docSnapshot.exists()) {
          // Toggle liked state for the comment within the sub-subcollection
          if (liked) {
            setLikeCount((likeCount) => likeCount - 1);
            setLiked((prevLiked) => !prevLiked);
            await updateDoc(subDocRef, {
              likes: arrayRemove(userId),
            });
          } else {
            setLikeCount((likeCount) => likeCount + 1);
            setLiked((prevLiked) => !prevLiked);
            await updateDoc(subDocRef, {
              likes: arrayUnion(userId),
            });
            await Notifier(userId, friendId, postId, "liked", null, feedType);
          }
        }
      } else {
        // If there is no parent ID, we're dealing with a regular document
        if (isPost) {
          docRef = doc(db, path, postId);
        } else {
          docRef = doc(db, path, postId, "comments", commentId);
        }
        // Check if the document exists before updating
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          // Toggle liked state for the regular document
          if (liked) {
            setLikeCount((likeCount) => likeCount - 1);
            setLiked((prevLiked) => !prevLiked);
            await updateDoc(docRef, {
              likes: arrayRemove(userId),
            });
          } else {
            setLikeCount((likeCount) => likeCount + 1);
            setLiked((prevLiked) => !prevLiked);
            await updateDoc(docRef, {
              likes: arrayUnion(userId),
            });
            await Notifier(userId, friendId, postId, "liked", null, feedType);
          }
        }
      }
    } catch (error) {
      console.error("Error liking/unliking the post:", error);
    }
  };
  useEffect(() => {
    if (Array.isArray(likes)) {
      setLiked(likes.includes(userId));
    } else {
      // Handle the case where `likes` or `userId` is undefined or not an array
      setLiked(false); // Set it to an appropriate default value
    }
  }, [likes, userId]);

  return (
    <Chip
      selectable={true}
      state={liked}
      handleState={handleLikeClick}
      selectedBgColor={"rgba(255,0,0,0.05)"}
      color={"red"}
      textColor="#708090"
      icon={FaHeart}
      label={likeCount}
    />
  );
}

export default LikedChip;
