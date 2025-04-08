import ProfileBadging from "./ProfileBadging";
import ProfileStatCount from "./ProfileStatCount";
import React, { useContext, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

function Profile_Counters({ profileData, badge, onFollowers, onFollowing }) {
  const { userId } = useContext(AuthContext);
  const [postCount, setPostCount] = useState("...");
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const [trusts, setTrusts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const CollectionRef = collection(db, "feed");
      const q = query(CollectionRef, where("uid", "==", profileData?.uid)); // Corrected the 'where' clause
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPostCount(snapshot.docs.length); // Set postCount to the number of documents in the snapshot
      });

      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    };

    fetchPosts();
  }, [userId]);

  const calculateTrust = async () => {
    if (!profileData) {
      return;
    }

    const feedRef = collection(db, "feed");
    let likes = 0;
    const q = query(
      feedRef,
      where("authorId", "==", profileData?.uid),
      where("feedType", "==", "blog")
    );

    const q2 = query(
      feedRef,
      where("uid", "==", profileData?.uid),
      where("feedType", "==", "post")
    );
    await onSnapshot(q, (snapshot) => {
      setTotalBlogs(snapshot.size);

      snapshot.forEach((item) => {
        likes += item.data().likes.length || 0;
      });
      console.log("Blog Likes", likes);
    });
    await onSnapshot(q2, (snapshot) => {
      setTotalPosts(snapshot.size);
      snapshot.forEach((item) => {
        likes += item.data().likes.length || 0;
      });
    });
    setTotalLikes(likes);
    setPostCount(totalPosts + totalBlogs);
  };

  useEffect(() => {
    if (userId) {
      calculateTrust();
    }
  }, [postCount, totalLikes, profileData]);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      w={"full"}
      flexWrap={"wrap"}
      my={2}
      gap={5}
    >
      <ProfileStatCount title={"Posts"} count={postCount} />
      <ProfileStatCount
        title={"Followers"}
        onClick={onFollowers}
        count={profileData?.followers?.length}
      />
      <ProfileStatCount
        title={"Following"}
        onClick={onFollowing}
        count={profileData?.followedChannels?.length}
      />
      <ProfileBadging icon={badge} />
    </Flex>
  );
}

export default Profile_Counters;
