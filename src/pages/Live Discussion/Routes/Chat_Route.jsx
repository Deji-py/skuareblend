import Chat_Input from "../Components/Chat_Input.jsx/Chat_Input";
import DateObjectFromObject from "../../../utility/DateObjectFromObject";
import Message_Item from "../Components/Message/Message_Item";
import chat2 from "../../../assets/chat2.png";
import moment from "moment";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import useFetchOnlineStatus from "../../../utility/fetchOnlineStatus";
import useFetchTypingStatus from "../../../utility/fetchTypingStatus";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { MdChevronLeft, MdCircle } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";
import { Alert_Dialogue } from "../../../components/ReUsables/Alert_Dialogue/Alert_Dialogue";
import { ClearChat } from "../Services/ClearChat_Service";

import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  Avatar,
  Box,
  Center,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

function Chat_Route() {
  const params = useParams();
  const { userId } = useContext(AuthContext);
  const friendDetail = useLocation().state;
  const [chat, setChat] = useState([]);

  const isKeyboardOpen = useDetectKeyboardOpen();
  const [loading, setLoading] = useState(false);

  const [currentlyReplying, setCurrentlyReplying] = useState(null);

  const {
    onClose: closeDialog,
    isOpen: dialogIsOpen,
    onOpen: openDialog,
  } = useDisclosure();
  const chatId = params?.id;
  const messageContainerRef = useRef(null);
  const status = useFetchOnlineStatus(friendDetail?.uid);
  const { typing } = useFetchTypingStatus(friendDetail?.uid, chatId);

  // Function to scroll to a specific message by its ID
  const scrollToMessage = (messageId) => {
    // Find the element associated with the messageId
    const messageElement = document.getElementById(`${messageId}`);

    if (messageElement) {
      // Scroll to the message element
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      messageElement.style.backgroundColor = "#DEF1F5";
      messageElement.style.transition = "ease 0.5s";
      setTimeout(() => {
        messageElement.style.backgroundColor = "transparent";
      }, [1000]);
    }
  };

  const userCollectionRef = collection(
    db,
    "users",
    userId,
    "messages",
    chatId,
    "chats"
  );

  const friendCollectionRef = collection(
    db,
    "users",
    friendDetail?.uid,
    "messages",
    chatId,
    "chats"
  );

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!friendDetail) return; // Handle null friendDetail

    const q = query(
      userCollectionRef,
      orderBy("timestamp") // Sort by timestamp
    );

    // Fetch My messages
    setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedChat = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== userId && !doc.data().isRead) {
          updateDoc(doc.ref, { isRead: true });
        }
        const data = doc.data();
        updatedChat.push(data);
      });
      setChat(updatedChat);
      scrollToBottom();
      setLoading(false);
    });

    const friendMessagesQuery = query(
      friendCollectionRef,
      where("uid", "==", friendDetail?.uid), // Filter by the friend's UID
      where("isRead", "==", false) // Filter for unread messages
    );

    const unsubscribeFriend = onSnapshot(friendMessagesQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        // Update the isRead field for each unread message in the friend's collection
        updateDoc(doc.ref, { isRead: true });
      });
    });

    return () => {
      unsubscribe();
      unsubscribeFriend();
    };
  }, [userId, chatId, friendDetail]);

  function groupChatByDay(chat) {
    const groupedChat = {};

    chat.forEach((message) => {
      const messageDate = moment(
        DateObjectFromObject(message?.timestamp)
      ).format("MMMM Do YYYY");

      if (!groupedChat[messageDate]) {
        groupedChat[messageDate] = [];
      }

      groupedChat[messageDate].push(message);
    });

    return groupedChat;
  }
  const groupedChat = useMemo(() => groupChatByDay(chat), [chat]);

  const updateTypingStatus = useCallback(
    (state) => {
      const docRef = doc(db, "users", userId, "messages", chatId);
      updateDoc(docRef, { isTyping: state });
    },
    [userId, chatId]
  );

  // Then, use the grouped data to render messages by day

  if (chat.length === 0 && loading) {
    return (
      <Center className="h-[80vh] ">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box className="w-full z-[1000] overflow-hidden  h-[100vh] overflow-y-hidden flex flex-col ">
      <Alert_Dialogue
        acceptanceText={"Yes"}
        rejectionText={"No"}
        heading={"Clear Chat"}
        description={
          <div>
            <h2 className="font-bold">
              Are you sure you want to clear all messages?
            </h2>
            <p> Please note that you cannot retrieve the chats again</p>
          </div>
        }
        handleAccept={() => ClearChat(userId, closeDialog, chatId)}
        handleDecline={closeDialog}
        isOpen={dialogIsOpen}
        onClose={closeDialog}
      />
      <Flex
        py={3}
        px={3}
        shadow={"sm"}
        width={"100vw"}
        position={"fixed"}
        zIndex={"1000"}
        alignItems={"center"}
        className="bg-white"
        justifyContent={"space-between"}
      >
        <Center>
          <Link to={"/discussion/recent_chats"}>
            <MdChevronLeft size={25} />
          </Link>
          <Avatar className="ml-2" size={"sm"} src={friendDetail?.profilepic} />
          <Box className="ml-2">
            <p className="text-[14px]">{friendDetail?.username}</p>
            {typing ? (
              <p className="text-[12px] italic text-teal-500">typing...</p>
            ) : (
              <p
                className={` ${
                  status === "online" ? "text-green-500" : "text-gray-500"
                } text-[12px]`}
              >
                {status && (
                  <>
                    {status === "online" ? (
                      <Flex alignItems={"center"} gap={1}>
                        <MdCircle size={8} /> {"Online"}
                      </Flex>
                    ) : (
                      "Offline"
                    )}
                  </>
                )}
              </p>
            )}
          </Box>
        </Center>
        <Menu>
          <MenuButton>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={openDialog} bg={"none"}>
              <MenuIcon className="mr-2">
                <IoMdTrash color="red" />
              </MenuIcon>
              Clear Chat
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <div
        ref={messageContainerRef}
        className={`w-full -300 pb-20 gap-3 ${
          isKeyboardOpen && " translate-y-[20rem] h-[55%] pb-[50px] "
        } flex flex-col pt-[80px] overflow-y-scroll `}
      >
        {chat.length === 0 && !loading ? (
          <Center className="h-[90vh] top-0  fixed w-screen">
            <Center flexDir={"column"}>
              <Image alt="chatRoute" src={chat2} className="w-[100px]" />
              <p className="mt-5">No Messages </p>
              <p className="text-[12px] opacity-[0.6]">
                You can start by saying{" "}
                <span className="text-primary">"HI!"</span> or{" "}
                <span className="text-primary">"HELLO!" &#x1F44B;</span>
              </p>
            </Center>
          </Center>
        ) : (
          <>
            {Object.keys(groupedChat).map((day, key) => (
              <Box key={key}>
                <Center className="text-[11px] text-gray-400">
                  <p>{day !== "Invalid date" && day}</p>
                </Center>
                {groupedChat[day].map((item) => (
                  <Message_Item
                    scrollToMessage={scrollToMessage}
                    friendImage={friendDetail?.profilepic}
                    message={item}
                    key={item.id}
                    setCurrentlyReplying={setCurrentlyReplying}
                  />
                ))}
              </Box>
            ))}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      <Chat_Input
        chatId={chatId}
        scrollToBottom={scrollToBottom}
        friendDetail={friendDetail}
        currentlyReplying={currentlyReplying}
        setCurrentlyReplying={setCurrentlyReplying}
        onLeave={() => updateTypingStatus(false)}
        onFocus={() => updateTypingStatus(true)}
      />
    </Box>
  );
}

export default Chat_Route;
