import Game_Icon from "../icons/Game_Icon";
import Game_Icon_Outline from "../icons/Game_Icon_Outline";
import Group_Icon from "../icons/Group_Icon";
import Group_Icon_Outline from "../icons/Group_Icon_Outline";
import Home_Icon from "../icons/Home_Icon";
import Home_Icon_Outline from "../icons/Home_Icon_Outline";
import Square_Discussion from "../icons/Square_Discussion";
import Square_Discussion_Outline from "../icons/Square_Discussion_Outline";
import fetchUser from "../../../../Services/fetchUser";
import { Avatar, Badge, Box, Flex, IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../../../App";
import { useChat } from "../../../../pages/Live Discussion/Context/ChatContext";

function BottomNavBar() {
  const { userData, userId } = useContext(AuthContext);

  const [currentRoute, setCurrentRoute] = useState();
  const route = useLocation().pathname;
  const activeColor = "#4169E1";
  const inActiveColor = "#616161";
  const { hasUnreadMessages } = useChat();
  const [hasUnread, setHasUnread] = useState();

  const location = useLocation().pathname;

  useEffect(() => {
    setHasUnread(hasUnreadMessages);
  }, [hasUnreadMessages]);

  useEffect(() => {
    setCurrentRoute(route);
  }, [route]);

  const navList = [
    {
      path: "/home",
      icon:
        currentRoute === "/home" ? (
          <Home_Icon
            size={"24px"}
            color={activeColor} // Set the color conditionally
          />
        ) : (
          <Home_Icon_Outline
            size={"23px"}
            color={inActiveColor} // Set the color conditionally
          />
        ),
    },
    {
      path: "/explore",
      icon:
        currentRoute === "/explore" ? (
          <Group_Icon
            size={"23px"}
            color={activeColor} // Set the color conditionally
          />
        ) : (
          <Group_Icon_Outline
            size={"23px"}
            color={inActiveColor} // Set the color conditionally
          />
        ),
    },

    {
      path: "/skuareDiscussion",
      icon:
        currentRoute === "/skuareDiscussion" ? (
          <Game_Icon
            size={"25px"}
            color={activeColor} // Set the color conditionally
          />
        ) : (
          <Game_Icon_Outline
            size={"24px"}
            color={inActiveColor} // Set the color conditionally
          />
        ),
    },
    {
      path: "/discussion/recent_chats",
      icon:
        currentRoute === "/discussion/recent_chats" ||
        currentRoute === "/discussion/pick_chat" ? (
          <Square_Discussion size={"26px"} color={activeColor} />
        ) : (
          <Square_Discussion_Outline size={"24px"} color={inActiveColor} />
        ),
    },
    {
      path: "/profile",
      icon: (
        <Box border={"2px"} rounded={"full"}>
          <Avatar
            width={6}
            height={6}
            className="p-[2px]"
            src={userData?.profilepic}
            size={"xs"}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box
      style={{ boxShadow: "-2px -2px 10px rgba(0,0,0,0.03)" }}
      className={`hidden z-[50] border-t-[1px] border-gray-100  md:${
        location.includes("post") ? "hidden" : "flex"
      } bg-white fixed w-full z-[20] bottom-0 flex-row justify-around items-center`}
    >
      <Flex
        justify="space-around"
        w="full"
        bg="white"
        h="50px"
        className="shadow-lg"
      >
        {navList.map((item, key) => (
          <Link key={key} className="relative cursor-default" to={item.path}>
            {item.path === "/discussion/recent_chats" && hasUnread && (
              <Badge
                bg={"red"}
                pos={"absolute"}
                className="top-3 right-2 z-[100]"
                padding={1}
                rounded={"full"}
              />
            )}
            <IconButton
              rounded="none"
              pt="2"
              bg={"none"}
              color=""
              _hover={{ bg: "white" }}
              className={` cursor-auto  ${
                currentRoute === item.path
                  ? " text-primary border-teal-500"
                  : "text-white"
              }`}
            >
              {item.icon}
            </IconButton>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}

export default BottomNavBar;
