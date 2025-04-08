import Notifier from "../../pages/Notifications/Services/Notifier";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

function FollowButton({ friendId, style }) {
  const [following, setFollowing] = useState(null);
  const { userId, userData } = useContext(AuthContext);
  const alert = useToast();

  const handleFollowing = async () => {
    const docRef = doc(db, "users", userId);
    const friendDocRef = doc(db, "users", friendId);
    try {
      if (!following) {
        // Follow the friend
        setFollowing(true);
        await updateDoc(docRef, { followedChannels: arrayUnion(friendId) });
        await updateDoc(friendDocRef, { followers: arrayUnion(userId) });
        await Notifier(userId, friendId, null, "followed", null, null);
      } else {
        // Unfollow the friend
        console.log("unfollowed");
        setFollowing(false);
        await updateDoc(docRef, { followedChannels: arrayRemove(friendId) });
        await updateDoc(friendDocRef, { followers: arrayRemove(userId) });
      }
    } catch (e) {
      alert({
        title: "Error",
        position: "top",
        description: "Something went wrong" + e,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useLayoutEffect(() => {
    if (userData?.followedChannels?.includes(friendId)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, []);

  if (following !== null) {
    return (
      <Button
        bg={following ? "whitesmoke" : "black"}
        rounded={"full"}
        color={following ? "black" : "white"}
        size={"xs"}
        px={5}
        m={2}
        _hover={{
          background: following ? "whitesmoke" : "#101010",
        }}
        style={style}
        onClick={handleFollowing}
      >
        {following ? "Following" : "Follow"}
      </Button>
    );
  }
}

export default FollowButton;
