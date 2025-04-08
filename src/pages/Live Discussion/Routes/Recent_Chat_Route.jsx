import Chat_List_Item from "../Components/Chat_List_Item/Chat_List_Item";
import FabMainButton from "../../../components/ReUsables/FAB/FabMainButton";
import StoreChat from "../Components/Chat_List_Item/StoreChat";
import noChat from "../../../assets/comments.png";
import { Box, Center, Flex, Image, Spinner } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAddComment } from "react-icons/md";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";
import { useChat } from "../Context/ChatContext";

function Recent_Chat_Route() {
  const { userId } = useContext(AuthContext);
  const { recentChats, setHasUnreadMessages, hasUnreadMessages } = useChat();

  useEffect(() => {
    setHasUnreadMessages(false);
  }, []);

  if (!recentChats) {
    return (
      <Center className="h-[70vh]">
        <Spinner />
      </Center>
    );
  }

  return (
    <Box className="w-full flex flex-col ">
      <Flex
        py={4}
        px={3}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <h2 className="font-bold text-[18px] ">Chats</h2>
        <BsThreeDotsVertical />
      </Flex>

      {/* <StoreChat store={store} /> */}

      <>
        {recentChats?.length === 0 ? (
          <>
            <Center flexDir={"column"} height={"70vh"} className="h-full">
              <Image
                alt="recentChatCover"
                src={noChat}
                width={"120px"}
                height={"120px"}
              />
              <h1 className="font-bold mt-5 ">No Recent Chats</h1>
              <p className=" text-center text-[14px] w-[50%] text-gray-400">
                Click the Message Icon below to start a new conversation
              </p>
            </Center>
          </>
        ) : (
          <>
            {recentChats?.map((item, index) => (
              <Link
                key={index}
                state={{
                  profilepic: item?.profilepic,
                  username: item?.username,
                  uid: item?.uid,
                }}
                to={"/discussion/chat/" + item.messageId}
              >
                <Chat_List_Item
                  profilePic={item.profilepic}
                  username={item.username}
                  item={item}
                  messageId={item.messageId}
                  status={item.status}
                  uid={item.uid}

                  // Add messageId or other props as needed
                />
              </Link>
            ))}
          </>
        )}
      </>

      <Link to={"/discussion/pick_chat"}>
        <FabMainButton onClick={() => {}} icon={<MdAddComment size={20} />} />
      </Link>
    </Box>
  );
}

export default Recent_Chat_Route;
