import Categories from "../../components/ReUsables/Categories/Categories";
import FollowButton from "../../components/FollowBtn/FollowButton";
import React, { useContext, useEffect, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Spinner,
  VStack,
} from "@chakra-ui/react";

import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";

function Searcher({ onClose }) {
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  const [queryString, setQueryString] = useState(""); // Input query
  const [UserSuggestion, setUserSuggestion] = useState();
  const [blogSuggestion, setBlogSuggestion] = useState(); // Suggestions from Firestore
  const [postSuggestion, setPostSuggestion] = useState(); // Suggestions from Firestore

  useEffect(() => {
    const lower_queryString = queryString.toLowerCase();

    const fetchData = async () => {
      setLoading(true);
      try {
        const blogQuery = query(
          collection(db, "feed"),
          orderBy("title_lower"),
          startAt(lower_queryString),
          endAt(lower_queryString + "\uf8ff")
        );

        const postQuery = query(
          collection(db, "feed"),
          orderBy("text_lower"),
          startAt(lower_queryString),
          endAt(lower_queryString + "\uf8ff")
        );

        const userQuery = query(
          collection(db, "users"),
          orderBy("username_lower"),
          startAt(lower_queryString),
          endAt(lower_queryString + "\uf8ff")
        );

        const blogSnapshot = await getDocs(blogQuery);
        const postSnapshot = await getDocs(postQuery);
        const userSnapshot = await getDocs(userQuery);
        const blogsuggestionList = blogSnapshot.docs.map((doc) => doc.data());
        const postsuggestionList = postSnapshot.docs.map((doc) => doc.data());
        const usersuggestionList = userSnapshot.docs.map((doc) => doc.data());

        setBlogSuggestion(blogsuggestionList);
        setPostSuggestion(postsuggestionList);
        setUserSuggestion(usersuggestionList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (queryString.trim() === "") {
      // Clear suggestions when the query is empty
      setBlogSuggestion([]);
      setUserSuggestion([]);
      setPostSuggestion([]);
      return;
    } else {
      fetchData();
    }
  }, [queryString]);

  const handleInputChange = (e) => {
    const inputQuery = e.target.value;
    setQueryString(inputQuery); // Convert the query to lowercase
  };

  return (
    <Box className="w-full fixed z-[1000] top-0 bg-slate-100 h-screen">
      <Box className="w-full">
        <Flex
          alignItems={"center"}
          className="bg-gray-50  m-2 p-2 border-[1.5px] rounded-md"
        >
          <input
            type="text"
            autoFocus={true}
            placeholder="Search"
            className="flex-1 bg-gray-50"
            value={queryString}
            onChange={handleInputChange}
          />
          <Button onClick={onClose} size={"xs"} bg={""}>
            {!loading ? <BsX size={20} /> : <Spinner size={"sm"} />}
          </Button>
        </Flex>
        {loading ? (
          <VStack gap={2}>
            {Array.from({ length: 8 }, (_, index) => index + 1).map(() => (
              <HStack className="text-[14px] animate-pulse bg-white shadow-sm text-gray-500 w-full border-gray-200 pr-5 p-2 border-l-2 ">
                <HStack className="flex-1">
                  <Box className=" bg-gray-100 rounded-xl flex-none object-cover w-10 h-10" />
                  <Box>
                    <p className="w-40 h-3 rounded-full mb-2 bg-gray-100"></p>
                    <p className="text-[12px] w-10 h-3 rounded-full bg-gray-100"></p>
                  </Box>
                </HStack>
                <Box className="w-[20px] h-[10px] bg-gray-100" />
              </HStack>
            ))}
          </VStack>
        ) : (
          <>
            {(!blogSuggestion || blogSuggestion.length === 0) &&
            (!postSuggestion || postSuggestion.length === 0) &&
            (!UserSuggestion || UserSuggestion.length === 0) ? (
              <Center flexDir={"column"} className="h-[70vh]">
                <FaSearch size={20} className="mb-2" />
                {blogSuggestion?.length === 0 &&
                UserSuggestion.length === 0 &&
                postSuggestion.length === 0 &&
                queryString !== "" ? (
                  <p>
                    Cant Find Result for <span>"{queryString}"</span>
                  </p>
                ) : (
                  <p>Start Typing Search...</p>
                )}
                <p className="text-[12px] text-gray-500">
                  Search results will appear as you type
                </p>
              </Center>
            ) : (
              <ul className="p-2 w-full">
                {UserSuggestion?.filter((item) => item.uid !== userId).length >
                  0 && (
                  <>
                    <p className="text-gray-600 font-bold">Users</p>
                    <Divider />
                    {UserSuggestion.filter((item) => item.uid !== userId).map(
                      (suggestion, index) => (
                        <Link
                          key={index}
                          to={"/user_Profile/" + suggestion?.uid}
                        >
                          <li className="text-[14px] bg-white shadow-sm text-gray-500 my-2 border-primary pr-5 p-2 border-l-2 ">
                            <HStack className="h-full w-full">
                              <HStack className="flex-1">
                                <Avatar
                                  src={suggestion?.profilepic}
                                  className=" flex-none object-cover w-10 h-10"
                                />
                                <Box>
                                  <p>
                                    {suggestion.username?.slice(0, 80) + "..."}
                                  </p>
                                  <p className="text-[12px]">
                                    {suggestion.followers.length} Followers
                                  </p>
                                </Box>
                              </HStack>
                              <FollowButton
                                friendId={suggestion?.uid}
                                style={{
                                  padding: "15px 20px",
                                  marginRight: "-10px",
                                }}
                              />
                            </HStack>
                          </li>
                        </Link>
                      )
                    )}
                  </>
                )}
                {blogSuggestion?.length > 0 && (
                  <>
                    <p className="text-gray-600 font-bold">Blogs</p>
                    <Divider />
                    {blogSuggestion.map((suggestion, index) => (
                      <Link to={"/blog/" + suggestion?.id}>
                        <li className="text-[14px] bg-white shadow-sm text-gray-500 my-2 border-primary pr-5 p-2 border-l-2 ">
                          <HStack className="h-full w-full">
                            {suggestion?.cover && (
                              <Image
                                alt="cover"
                                src={suggestion?.cover}
                                className=" flex-none object-cover w-10 h-10"
                              />
                            )}
                            <p>{suggestion.title?.slice(0, 80) + "..."}</p>
                          </HStack>
                        </li>
                      </Link>
                    ))}
                  </>
                )}
                {postSuggestion?.length > 0 && (
                  <>
                    <p className="text-gray-600 mt-5 font-bold">Posts</p>
                    <Divider />
                    {postSuggestion.map((suggestion, index) => (
                      <Link key={index} to={"/post/" + suggestion?.id}>
                        <li
                          className="text-[14px] bg-white shadow-sm text-gray-500 my-2 border-primary pr-5 p-2 border-l-2 "
                          key={index}
                        >
                          <HStack className="h-full w-full">
                            {suggestion?.images &&
                              suggestion?.images?.length > 0 && (
                                <Image
                                  alt="cover"
                                  src={suggestion?.images[0].src}
                                  className="w-10 h-10 flex-none object-cover"
                                />
                              )}
                            <p>{suggestion.text?.slice(0, 80) + "..."}</p>
                          </HStack>
                        </li>
                      </Link>
                    ))}
                  </>
                )}
              </ul>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Searcher;
