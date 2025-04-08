import InitializeChat from "../../Services/InitializeChat";
import useFetchOnlineStatus from "../../../../utility/fetchOnlineStatus";
import { Avatar, Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MdCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../App";

function Pick_Chat_Item({ item }) {
  const { userId } = useContext(AuthContext);
  const alternative = item?.uid + userId;
  const messageId = userId + item?.uid;
  const friendId = item?.uid;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const status = useFetchOnlineStatus(item?.uid);

  const handleSaveRecent = async () => {
    setLoading(true);
    InitializeChat(
      setLoading,
      item,
      friendId,
      userId,
      navigate,
      messageId,
      alternative
    );
  };

  return (
    <>
      <Flex
        onClick={handleSaveRecent}
        className="text-[14px] relative w-full p-3"
      >
        {loading && (
          <Center className="absolute bg-[rgba(255,255,255,0.5)] z-[1000] w-full h-[80%]">
            <Spinner />
          </Center>
        )}

        <Flex alignItems={"center"} className="w-full flex-1">
          <Box>
            <Avatar w={"50px"} h={"50px"} src={item?.profilepic} />
          </Box>
          <Box ml={4}>
            <h1 className="font-bold">{item?.username}</h1>
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
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Pick_Chat_Item;
