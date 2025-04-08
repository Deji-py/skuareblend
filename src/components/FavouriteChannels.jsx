import ChannelsCard from "./MicroComps/ChannelsCard";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../App";

function FavouriteChannels() {
  const [data, setData] = useState([]);
  const { userData } = useContext(AuthContext);
  const [loading, setLoadng] = useState(false);

  useEffect(() => {
    setLoadng(true);
    if (!userData) return; // Make sure userData is available before proceeding

    if (userData?.followedChannels) {
      // Create a reference to the "users" collection
      const usersCollectionRef = collection(db, "users");

      // Create a query to fetch documents based on the followedChannels array
      const q = query(
        usersCollectionRef,
        where("uid", "in", userData.followedChannels)
      );

      // Subscribe to changes in the followedChannels array
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const channelsData = [];
        querySnapshot.forEach((doc) => {
          const channelData = doc.data();
          channelsData.push(channelData);
        });
        setData(channelsData);
        setLoadng(false);
      });
      return () => {
        unsubscribe(); // Clean up the subscription when the component unmounts
      };
    } else {
      setData([]);
    }
  }, [userData]);

  return (
    <>
      {data && (
        <>
          <Box
            className="w-full md:w-[100vw]"
            pb={2}
            overflow={"hidden"}
            pos={"relative"}
          >
            <Flex
              gap={5}
              className="hideScroll"
              alignItems={"center"}
              overflow={"hidden"}
              w={"full"}
              overflowX={"scroll"}
              p={2}
              pl={5}
              pr={100}
            >
              {data?.map((channel, key) => (
                <ChannelsCard key={key} channel={channel} />
              ))}
            </Flex>
            {data.length >= 10 && (
              <Center className="absolute ml-2 bg-white h-full p-2 top-0 shadow-xl right-0">
                <Button bg={"whitesmoke"} fontSize={"sm"}>
                  All
                </Button>
              </Center>
            )}
            <Divider />
          </Box>
        </>
      )}
    </>
  );
}

export default FavouriteChannels;
