import React, { useContext, useEffect, useState } from "react";
import SmallPodcastCard from "../SmallPodcastCard";
import { Center, Flex } from "@chakra-ui/react";
import { db } from "../../../../../firebaseConfig";
import { AuthContext } from "../../../../App";
import { AudioContext } from "../../../../components/PodCastPlayer/context/AudioContext";

import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

function Updates() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Reference to the "podcasts" collection in your Firestore database
    const podcastsCollection = collection(db, "podcasts");

    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        const unsubscribe = onSnapshot(podcastsCollection, (snapshot) => {
          const podcastData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPodcasts(podcastData);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Center gap={5} flexDir={"column"} mb={"200px"} mt={10} px={2}>
      <Flex
        className="w-full"
        alignItems={"center"}
        px={3}
        mt={3}
        justifyContent={"space-between"}
      >
        <h2 className="font-poppins ">New Update</h2>
        <p className="text-cyan-700 text-[14px]">See All</p>
      </Flex>
      {podcasts.map((podcast, index) => (
        <SmallPodcastCard index={index} key={index} podcast={podcast} />
      ))}
    </Center>
  );
}

export default Updates;
