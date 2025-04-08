import FetchLastMessage from "../../Logic/FetchLastMessage";
import useFetchOnlineStatus from "../../../../utility/fetchOnlineStatus";
import useFetchTypingStatus from "../../../../utility/fetchTypingStatus";
import { Avatar, Box, Center, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { MdCircle } from "react-icons/md";
import { AuthContext } from "../../../../App";

function Chat_List_Item({ uid, profilePic, username, messageId }) {
  const { userId } = useContext(AuthContext);
  const status = useFetchOnlineStatus(uid);
  const { typing } = useFetchTypingStatus(uid, messageId);

  return (
    <Flex className="text-[14px] py-2 px-2 bg-white  ">
      <Flex gap={2} className="w-full ">
        <Center
          w={"60px"}
          h={"60px"}
          className={`relative flex-none p-[2px] rounded-full `}
        >
          <Avatar
            w={"full"}
            h={"full"}
            className="border-[3px]"
            src={profilePic}
          />
        </Center>
        <Box className="w-full">
          <h1 className="font-bold text-[15px]">{username}</h1>
          <p
            className={` ${
              status === "online" ? "text-orange-600" : "text-gray-500"
            } text-[12px]`}
          >
            {typing ? (
              <p className="text-[12px] italic text-teal-600">typing...</p>
            ) : (
              <p
                className={` ${
                  status === "online" ? "text-green-500" : "text-gray-500"
                } text-[12px]`}
              >
                {status ? (
                  <>
                    {status === "online" ? (
                      <Flex alignItems={"center"} gap={1}>
                        <MdCircle size={8} /> {"Online"}
                      </Flex>
                    ) : (
                      "Offline"
                    )}
                  </>
                ) : (
                  "..."
                )}
              </p>
            )}
          </p>
          <p className=" text-[13px] text-gray-500">
            <FetchLastMessage userId={userId} messageId={messageId} />
          </p>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Chat_List_Item;
