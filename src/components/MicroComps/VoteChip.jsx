import Chip from "./Chip";
import React, { useContext, useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FaHeart, FaVoteYea } from "react-icons/fa";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

function VoteChip({ votes, id }) {
  const { userId } = useContext(AuthContext);
  const [voteCount, setVoteCount] = useState(votes?.length);
  const [voted, setVoted] = useState(false);

  const handleLikeClick = async () => {
    try {
      setVoteCount(voteCount + 1);
      const blogDocRef = doc(db, "blogs", id);

      if (!voted) {
        // If the user hasn't voted the post, add their userId to the 'votes' array
        setVoted(true); // Set voted to true
        await updateDoc(blogDocRef, {
          votes: arrayUnion(userId),
        });
      } else {
        setVoteCount(voteCount - 1);
        // If the user has already voted the post, remove their userId from the 'votes' array
        setVoted(false); // Set voted to false
        await updateDoc(blogDocRef, {
          votes: arrayRemove(userId),
        });
      }
    } catch (error) {
      console.error("Error liking/unliking the blog post:", error);
    }
  };

  useEffect(() => {
    // Check if the current user's ID is in the votes array of the blog
    if (votes.includes(userId)) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [votes, userId]);

  return (
    <Chip
      selectable={true}
      state={voted}
      handleState={handleLikeClick}
      selectedBgColor={"rgba(238, 210, 255,0.5)"}
      color={"purple"}
      icon={FaVoteYea}
      label={voteCount}
    />
  );
}

export default VoteChip;
