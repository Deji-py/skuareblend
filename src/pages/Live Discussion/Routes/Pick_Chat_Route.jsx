import Fetch_All_Chats from "../Services/Fetch_All_Chats";
import Pick_Chat_Item from "../Components/Chat_List_Item/Pick_Chat_Item";
import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { Center, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { CgChevronLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

function Pick_Chat_Route() {
  const [channelData, setChannelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData, userId } = useContext(AuthContext);

  useEffect(() => {
    Fetch_All_Chats(userData, setChannelData, setLoading, userId);
  }, [userData?.followedChannels]);

  return (
    <div>
      <Flex
        py={4}
        pr={5}
        pl={2}
        className="w-screen"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={"/discussion/recent_chats"}>
          <IconButton
            padding={0}
            px={0}
            size={"sm"}
            bg={"none"}
            rounded={"full"}
            icon={<CgChevronLeft size={20} />}
          />
        </Link>
        <p>New Conversation</p>
        <Search2Icon />
      </Flex>
      {loading ? (
        <Center className="h-[50vh] w-screen">
          <Spinner />
        </Center>
      ) : channelData.length > 0 ? (
        <div>
          {channelData.map((item, key) => (
            <Pick_Chat_Item key={key} item={item} />
          ))}
        </div>
      ) : (
        <p>No channels found.</p>
      )}
    </div>
  );
}

export default Pick_Chat_Route;
