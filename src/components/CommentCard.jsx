import React, { useEffect, useState } from "react";
import { Divider, Flex, Image } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { FaHeart, FaReply } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { db } from "../../firebaseConfig";

function CommentCard({ commentData, onReplyClick, isReply }) {
  const [liked, setLiked] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    // Fetch user data based on commentData?.commentId (Assuming commentId represents a user)
    if (commentData?.commentId) {
      // Replace with your user data retrieval logic
      const userRef = doc(db, "users", commentData.commentId);

      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserData(userData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [commentData?.commentId]);

  return (
    <div className="comment-card my-2 h-fit border-[1.5px] rounded-xl relative  bg-white  shadow-gray-200 px-3 py-2">
      <div className="comment-content">
        <Flex alignItems={"center"} className=" text-sm" gap={2}>
          <Image
            alt="profilepic"
            src={userData?.profilepic} // Use user's profile image or a default image
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="text-[12px]">
            <p>{userData?.username || "Username"}</p>{" "}
            {/* Use user's username or a placeholder */}
            <Flex className="mt-[-5px]" alignItems={"center"}>
              <MdVerified />
              {userData?.trusts.length || 0}{" "}
              {/* Use user's trusts.length or 0 as a placeholder */}
            </Flex>
          </div>
        </Flex>
        <p className="comment-text p-2  text-sm">{commentData?.text}</p>
        <div className="comment-actions right-2 text-[14px] top-[5px] absolute mt-2 flex flex-row justify-end gap-5">
          {!isReply && ( // Conditionally render the "Reply" button
            <button
              className="reply-button bg-primary text-white px-2 py-1 rounded-full text-[12px] flex gap-1 flex-row justify-center items-center"
              onClick={() => onReplyClick(commentData?.id)}
            >
              <FaReply />
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
