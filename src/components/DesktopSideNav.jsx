import { Box, Divider, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPersonFill, BsSoundwave } from "react-icons/bs";
import { CgFeed } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { IoIosCreate } from "react-icons/io";
import { MdForum } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function DesktopSideNav() {
  const [currentRoute, setCurrentRoute] = useState();
  const route = useLocation().pathname;

  useEffect(() => {
    setCurrentRoute(route);
  }, [route]);

  const navItems = [
    {
      path: "/home",
      icon: <GoHomeFill />,
      label: "Home",
    },
    {
      path: "/explore",
      icon: <CgFeed />,
      label: "Explore",
    },
    {
      path: "/podcasts",
      icon: <BsSoundwave />,
      label: "Podcasts",
    },
    {
      path: "/forum",
      icon: <MdForum />,
      label: "Forum",
    },
    {
      path: "/profile",
      icon: <IoIosCreate />,
      label: "profile",
    },
  ];

  return (
    <Box
      w="300px"
      className=" top-0 flex-none text-[18px] block md:hidden"
      h="100vh"
    >
      <Box w="300px" className="h-full bg-white pt-10 shadow-xl fixed">
        <Stack spacing={5} mt={10} pl={4}>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <Flex
                as="a"
                href="#"
                py={2}
                pl={2}
                pr={4}
                className={`${
                  item.path === currentRoute
                    ? " text-primary bg-orange-50"
                    : "text-gray-500"
                }`}
                bg=""
                color=""
                _hover={{ color: "black", bg: "rgba(0,0,0,0.03)" }}
                align="center"
              >
                <Box>{item.icon}</Box>
                <Box ml={2}>{item.label}</Box>
              </Flex>
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default DesktopSideNav;
