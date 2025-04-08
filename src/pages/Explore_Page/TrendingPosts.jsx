import React, { useEffect, useState } from "react";
import TrendingPostCard from "./components/TrendingPostCard";
import { Flex } from "@chakra-ui/react";
import { db } from "../../../firebaseConfig";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function TrendingPosts() {
  const [trendingList, setTrendingList] = useState();

  useEffect(() => {
    // Define a function to fetch trending posts
    const fetchTrendingPosts = async () => {
      try {
        // Create a Firestore query to order posts by the number of likes (length of "likes" array) in descending order
        const q = query(
          collection(db, "feed"),
          orderBy("likes", "desc") // Assuming "likes" is an array field
        );

        // Execute the query and get the documents
        const querySnapshot = await getDocs(q);

        // Create an array to store the trending posts
        const trendingPosts = [];

        // Loop through the documents and add them to the array
        querySnapshot.forEach((doc) => {
          trendingPosts.push(doc.data());
        });

        // Set the trending posts in the state
        setTrendingList(
          trendingPosts.filter((item) => item.feedType === "post")
        );
      } catch (error) {
        console.error("Error fetching trending posts: ", error);
      }
    };

    // Call the fetchTrendingPosts function
    fetchTrendingPosts();
  }, []); // Run this effect only once on component mount

  return (
    <div className="w-full overflow-hidden">
      {trendingList && trendingList.length > 0 && (
        <h2 className="text-sm font-bold font-poppins p-2">Trending Posts</h2>
      )}
      <Flex className="gap-2 px-2 hideScroll w-full overflow-x-scroll">
        {trendingList?.map((post, index) => (
          <TrendingPostCard item={post} key={index} />
          // Replace 'title' with the field you want to display
        ))}
      </Flex>
    </div>
  );
}

export default TrendingPosts;
