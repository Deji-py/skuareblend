import DateObjectFromObject from "../../../utility/DateObjectFromObject";
import moment from "moment";
import { Badge, Box, Center, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { db } from "../../../../firebaseConfig";

import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function FetchLastMessage({ userId, messageId }) {
  const [lastMessage, setLastMessage] = useState();

  useEffect(() => {
    const messageCollectionRef = collection(
      db,
      "users",
      userId,
      "messages",
      messageId,
      "chats"
    );

    const q = query(
      messageCollectionRef,
      orderBy("timestamp", "desc"),
      // You can adjust the limit as needed
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const lastMessageDoc = querySnapshot.docs[0];
        const lastMessageData = lastMessageDoc.data();
        const lastMessageContent = lastMessageData;
        setLastMessage(lastMessageContent);
      } else {
        setLastMessage("No messages found");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userId, messageId]);

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"full"}
      className="pr-2"
    >
      <p className="text-[11px]">
        {lastMessage?.text
          ? lastMessage?.text.slice(0, 35) + "..."
          : "Start a Conversation"}
      </p>
      <Center className="relative ">
        {lastMessage?.uid !== userId && lastMessage?.isRead === false && (
          <Badge
            className="absolute top-[-30px]"
            bg={"red"}
            size={"sm"}
            rounded={"full"}
            color={"white"}
            padding={1}
          ></Badge>
        )}
        {lastMessage?.isRead === true && (
          <Box className="absolute top-[-30px]">
            <BsCheckAll size={15} />
          </Box>
        )}
        {lastMessage?.isRead === false && lastMessage?.uid === userId && (
          <Box className="absolute top-[-30px]">
            <BsCheck size={15} />
          </Box>
        )}
        {lastMessage?.timestamp && (
          <p className="text-[10px]">
            {moment(DateObjectFromObject(lastMessage?.timestamp)).format("LT")}
          </p>
        )}
      </Center>
    </Flex>
  );
}

export default FetchLastMessage;
