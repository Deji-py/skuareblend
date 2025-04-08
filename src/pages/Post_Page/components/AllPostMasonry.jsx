import "./masonrygrid.css";
import Chip from "../../../components/MicroComps/Chip";
import Masonry from "react-masonry-css";
import React, { useContext, useEffect, useState } from "react";
import YouTubePlayer from "../../../components/ReUsables/YoutubePlayer";
import { BsHeartFill, BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
} from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

// Style object to set the height

const PostItem = React.memo(({ item }) => {
  const randomHeight = item?.text && !item?.images ? 100 : 200;

  // Generate a random height between 200 and 400 pixels

  const cardStyle = {
    height: `${randomHeight}px`,
  };

  const deletePost = async (postId) => {
    const docRef = doc(db, "feed", postId);
    await deleteDoc(docRef);
  };

  return (
    <div
      className="grid-item overflow-hidden relative rounded-xl border-[1.5px] bg-gray-100    flex flex-col justify-start items-start"
      style={cardStyle}
      key={item.id}
    >
      {item?.images && (
        <Link
          to={"/post/" + item?.id}
          className="w-full h-full absolute rounded-xl bg-gradient-to-b from-black via-transparent to-transparent"
        />
      )}

      {item?.text && (
        <p
          className="text-xs"
          style={{
            position: "absolute",

            padding: "5px",
            color:
              item?.images || item?.youtubeLinks.length > 0 ? "white" : "black",
          }}
        >
          {item.text.slice(0, 100) + "..."}
        </p>
      )}

      <Flex
        w={"full"}
        className=" absolute bottom-0 p-2 z-auto"
        justifyContent={"space-between"}
      >
        <Center className="mt-1  bottom-2 left-1">
          {item?.images && (
            <Tag size={"sm"} color={"white"} bg={"rgba(0,0,0,0.8)"}>
              {item?.images?.length}
            </Tag>
          )}
          <Button
            className={
              !item?.images ||
              (!item?.youtubeLinks ? "text-black" : "text-white")
            }
            color={""}
            size={"xs"}
            bg={"none"}
            rounded={"full"}
          >
            <BsHeartFill className="mr-1" size={8} />
            <p className="text-[10px]">{item.likes?.length}</p>
          </Button>
        </Center>
        <Menu>
          <MenuButton onClick={() => deletePost(item?.docId)}>
            <IoMdTrash
              color={!item?.images || !item?.youtubeLinks ? "red" : "white"}
            />
          </MenuButton>
        </Menu>
      </Flex>
      <Link className="w-full h-full" to={"post" + item?.id}>
        {item?.images && (
          <img
            src={item?.images[0]?.src}
            className="w-full h-full rounded-xl flex-1 object-cover"
            alt={item.title}
          />
        )}
      </Link>

      {item?.images.length === 0 && item?.youtubeLinks.length > 0 && (
        <Link className="w-full h-full" to={"post" + item?.id}>
          <YouTubePlayer
            height={randomHeight}
            youtubeUrl={item?.youtubeLinks[0]}
          />
        </Link>
      )}
    </div>
  );
});

function AllPostMasonry() {
  const { userData, userId } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userData) {
      const userPostsQuery = query(
        collection(db, "feed"),
        where("feedType", "==", "post"),
        where("uid", "==", userId)
      );

      const unsubscribe = onSnapshot(userPostsQuery, (snapshot) => {
        const userPosts = [];
        snapshot.forEach((doc) => {
          userPosts.push({ docId: doc.id, ...doc.data() });
        });
        setPosts(userPosts);
      });

      return () => unsubscribe();
    }
  }, [userData]);
  console.log(posts);

  const breakpointColumnsObj = {
    default: 2,
    1100: 3,
    700: 2,
    500: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts.map((item) => (
        <PostItem item={item} key={item.id} />
      ))}
    </Masonry>
  );
}

export default AllPostMasonry;
