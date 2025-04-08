import AnimateHeader from "../AnimateHeader";
import Logo from "../../assets/icons/LogoColor.svg";
import hasUnreadNotifications from "./Services/hasUnreadNotifications";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  Badge,
  HStack,
} from "@chakra-ui/react";

export default function WithSubnavigation() {
  const [hasUnsread, sethasUnread] = useState(false);
  const { userId } = useContext(AuthContext);
  const currentRoute = useLocation().pathname;
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    // Create a reference to the unsubscribe function
    let unsubscribe;

    const checkNotify = () => {
      // Call hasUnreadNotifications and provide a callback function
      unsubscribe = hasUnreadNotifications(userId, (read) => {
        sethasUnread(read);
      });
    };

    checkNotify();

    // Clean up the subscription when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);
  console.log(hasUnsread);

  return (
    <>
      <AnimateHeader>
        <Box>
          <Flex
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            w={"full"}
            left={0}
            zIndex={10000}
            justifyContent={"start"}
            alignItems={"center"}
            align={"center"}
          >
            {/* <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex> */}
            <Flex flex={1} className="relative ">
              <Flex gap={1} alignItems={"center"}>
                <Image alt="logo" src={Logo} className="w-[30px]" />
                <h1 className=" text-black text-lg md:text-md font-poppins font-extrabold  ">
                  Skuareblend
                </h1>
              </Flex>
            </Flex>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
            <HStack gap={5}>
              {/* {currentRoute === "/skuareDiscussion"} ? ( */}
              {/* <Game_Icon
                size={"25px"}
                color={"red"} // Set the color conditionally
              /> */}
              {/* ) : (
              <Game_Icon_Outline
                size={"24px"}
                color={"gray"} // Set the color conditionally
              />
              ) */}
              <Link to={"/notifications"}>
                <div className=" relative">
                  {hasUnsread && (
                    <Badge
                      className=" absolute "
                      p={1}
                      rounded={"full"}
                      bg={"red"}
                    />
                  )}
                  <BsBell size={20} className=" text-gray-500" />
                </div>
              </Link>
            </HStack>
            {/* on authentication handle this */}
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              hidden={true}
              direction={"row"}
              spacing={6}
              ml={10}
            >
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                href={"#"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Flex>
        </Box>
      </AnimateHeader>
      {/* <MobileNav
        NAV_ITEMS={NAV_ITEMS}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
      /> */}
    </>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const NAV_ITEMS = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
