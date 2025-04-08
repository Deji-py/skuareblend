import React from "react";
import { Avatar, Box, Center, Divider, Flex, HStack } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../../../firebaseConfig";
import { AuthContext } from "../../../../App";

function StoreChat({ store }) {
  const [storeDetail, setStoreDetail] = useState();
  const [totalMessages, setTotalMessages] = useState();
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (storeDetail) {
      const storeRef = collection(db, "stores", storeDetail.id, "messages");
      const querySnapshot = await getDocs(storeRef);
      setTotalMessages(querySnapshot.size);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchStoreDetail = async () => {
      try {
        const userStoreCollectionRef = collection(db, "users", userId, "store");
        const userStoreQuerySnapshot = await getDocs(userStoreCollectionRef);

        if (!userStoreQuerySnapshot.empty) {
          // Assuming there's only one store document per user, but you can handle multiple documents as needed
          const userStoreDoc = userStoreQuerySnapshot.docs[0];
          const storeId = userStoreDoc.id;

          const storeDocRef = doc(db, "stores", storeId);
          const storeDocSnapshot = await getDoc(storeDocRef);

          if (storeDocSnapshot.exists()) {
            setStoreDetail(storeDocSnapshot.data());
            setLoading(false);
          } else {
            console.log("Store document does not exist");
          }
        } else {
          console.log("User store document does not exist");
        }
      } catch (error) {
        console.error("Error fetching store detail:", error);
      }
    };

    // Fetch the store detail only when userId changes or on initial mount
    if (userId) {
      fetchStoreDetail();
    }
  }, [userId]); // Include userId as a dependency to re-fetch when it changes

  // Fetch messages when storeDetail changes
  useEffect(() => {
    fetchMessages();
  }, [storeDetail]);
  // Include userId as a dependency to re-fetch when it changes

  if (loading) {
    return (
      <HStack
        justify={"space-between"}
        className="px-2 py-2 w-full animate-pulse"
      >
        <HStack>
          <Box className="w-[50px] h-[50px] bg-gray-100 rounded-full"></Box>
          <Flex gap={2} flexDir={"column"}>
            <Box className="w-20 bg-gray-100 rounded-full h-4"></Box>
            <Box className="w-10 bg-gray-100 rounded-full h-3"></Box>
            <Box className="w-40 bg-gray-100 rounded-full h-3"></Box>
          </Flex>
        </HStack>
        <Box className="w-20 bg-gray-100 rounded-full h-5"></Box>
      </HStack>
    );
  }
  if (!storeDetail) {
    return;
  }

  return (
    <Link to={"/discussion/store_chats/" + store?.storeId}>
      <Flex
        alignItems={"center"}
        className="text-[14px] pt-2 mb-2 px-2 bg-white  "
      >
        <Flex gap={2} className="w-full ">
          <Center
            w={"55px"}
            h={"55px"}
            className={`relative
            bg-gradient-to-br from-primary to-purple-600 flex-none p-[2px] rounded-full `}
          >
            <Avatar
              w={"full"}
              h={"full"}
              className="border-[3px]"
              src={storeDetail?.logoUrl}
            />
          </Center>
          <Box className="w-full">
            <h1 className="font-bold text-[15px]">{storeDetail?.storeName}</h1>
            <p className="text-[12px] text-gray-500">{storeDetail?.oneLiner}</p>
            <p className="text-[12px] text-gray-400">This is your store Chat</p>
          </Box>
        </Flex>
        <Box className="border-primary border-[1.5px] text-primary px-5 flex-none  text-[10px] p-1 rounded-full">
          <p>{totalMessages} Messages</p>
        </Box>
      </Flex>
      <Divider />
    </Link>
  );
}

export default StoreChat;
