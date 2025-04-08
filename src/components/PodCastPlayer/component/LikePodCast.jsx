import React, { useContext, useLayoutEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

function LikePodCast({ podcast }) {
  const { userId } = useContext(AuthContext);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    console.log("working");
    const docRef = doc(db, "podcasts", podcast?.id);
    if (like) {
      setLike(false);

      updateDoc(docRef, { likes: arrayRemove(userId) }).then(() => {
        console.log("iunliked");
      });
    } else {
      setLike(true);

      updateDoc(docRef, { likes: arrayUnion(userId) });
    }
  };

  useLayoutEffect(() => {
    if (podcast?.likes?.includes(userId)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [podcast]);
  return (
    <IconButton
      bg={"none"}
      rounded={"full"}
      icon={
        like ? (
          <BsHeartFill color="red" size={15} />
        ) : (
          <BsHeart color="gray" size={15} />
        )
      }
      onClick={handleLike}
    />
  );
}

export default LikePodCast;
