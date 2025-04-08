import BigPostBanner from "../BigPostBanner";
import FabMainButton from "../ReUsables/FAB/FabMainButton";
import Post_Card from "../../pages/Post_Page/components/Post_Card";
import React, { useContext, useEffect, useState } from "react";
import SmallCard from "../SmallCard";
import emptypost from "../../assets/media.png";
import { Button, Center, Image } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

function FriendPostPage({ friendId }) {
  const [loading, setLoading] = useState(true);
  const [friendPosts, setFriendPosts] = useState([]);

  useEffect(() => {
    const fetchFriendPosts = async () => {
      try {
        setLoading(true);

        // Create a query to retrieve posts belonging to the friend
        const friendPostsQuery = query(
          collection(db, "feed"),
          where("uid", "==", friendId),
          where("feedType", "==", "post")
        );

        const querySnapshot = await getDocs(friendPostsQuery);
        const posts = [];

        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        const filteredPosts = posts.filter(
          (item) => item.isDiscreet === false || item.isDiscreet === undefined
        );
        setFriendPosts(filteredPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friend posts:", error);
        setLoading(false);
      }
    };

    fetchFriendPosts();
  }, [friendId]);

  if (loading) {
    return (
      <Center className="  w-full h-[50vh] z-50 bg-[rgba(255,255,255,0.8)] ">
        <PulseLoader
          color={"#004E64"}
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Center>
    );
  }

  return (
    <div className=" relative  w-full mb-[120px]">
      {friendPosts.length === 0 ? (
        <Center h={"full"} py={20} flexDirection={"column"}>
          <Image
            alt="emptyblog"
            src={emptypost}
            className="w-[100px] h-[100px]"
          />
          <h2 className="text-2xl my-2 text-gray-700 font-bold">No Posts</h2>
        </Center>
      ) : (
        <div className="md:flex flex-col gap-5 grid grid-cols-2">
          {friendPosts.map((post) => (
            <Post_Card key={post.id} item={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FriendPostPage;
