import Categories from "../../components/ReUsables/Categories/Categories";
import ChannelPreviewCard from "./components/ChennelPreviewCard";
import ChannelSuggestors from "./components/ChannelSuggestors";
import FavouriteChannels from "../../components/FavouriteChannels";
import Fetch_All_Chats from "../Live Discussion/Services/Fetch_All_Chats";
import Fetch_All_Users from "./Services/Fetch_All_Users";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import Searcher from "./Searcher";
import TrendingBlogs from "./TrendingBlogs";
import TrendingPosts from "./TrendingPosts";
import { Search2Icon } from "@chakra-ui/icons";
import { collection, getDocs } from "firebase/firestore";
import { CgChevronLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Spinner,
} from "@chakra-ui/react";

function Explore_Page() {
  const [usersList, setUsersList] = useState(null);
  const [queryText, setQueryText] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData, userId } = useContext(AuthContext);
  const [openSearcher, setOpenSearcher] = useState(false);

  useEffect(() => {
    Fetch_All_Users(setUsersList, setLoading, userId);
  }, [userData]);

  const handleSearch = () => {
    setOpenSearcher(true);
  };

  return (
    <div className="w-full h-screen pb-20 overflow-y-scroll">
      <Flex
        py={4}
        px={5}
        className="w-screen"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <p className="text-bold font-poppins text-lg">Explore</p>
        <Search2Icon onClick={handleSearch} />
      </Flex>
      {!usersList ? (
        <Center className="h-[50vh]">
          <Spinner />
        </Center>
      ) : (
        <>
          {/* <FavouriteChannels /> */}

          {usersList.length === 0 ? (
            <Center>
              <p>No users found</p>
            </Center>
          ) : (
            usersList.map((user) => (
              <ChannelPreviewCard userData={user} key={user.id} />
            ))
          )}
        </>
      )}
      <TrendingPosts />
      <br />
      <TrendingBlogs />
      {openSearcher && <Searcher onClose={() => setOpenSearcher(false)} />}
    </div>
  );
}

export default Explore_Page;
