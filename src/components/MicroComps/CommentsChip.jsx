import Chip from "./Chip";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FaComment } from "react-icons/fa";
import { db } from "../../../firebaseConfig";

function CommentChip({ postId }) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    // Create a reference to the comments subcollection of the post
    const commentsRef = collection(db, "feed", postId, "comments");

    // Subscribe to the comments subcollection changes
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      // Update the comment count based on the number of documents in the subcollection
      setCommentCount(snapshot.docs.length);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, [postId]);

  return (
    <Chip
      selectable={false}
      state={false} // You can customize the state logic if needed
      icon={FaComment}
      label={commentCount} // Display the comment count
    />
  );
}

export default CommentChip;
