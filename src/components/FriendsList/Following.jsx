import LoaderScreen from "../Loader/LoaderScreen";
import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

function Following({ isOpen, onOpen, onClose, friendData }) {
  const { userData, userId } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [followerData, setFollowerData] = useState([]);

  // Function to fetch follower data based on followerId
  const fetchFollowerData = async () => {
    setLoading(true);
    if (friendData) {
      setFollowers(friendData?.followedChannels);
    } else {
      setFollowers(userData?.followedChannels);
    }
    const followerDataPromises = followers.map(async (followerId) => {
      const followerDocRef = doc(db, "users", followerId);
      const followerSnapshot = await getDoc(followerDocRef);
      return { id: followerSnapshot.id, ...followerSnapshot.data() };
    });

    const followerDataResult = await Promise.all(followerDataPromises);
    setFollowerData(followerDataResult);

    setLoading(false);
  };

  useEffect(() => {
    // Fetch follower data when the modal is opened
    fetchFollowerData();
  }, [isOpen, friendData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bottom={-20} position={"absolute"}>
        <ModalHeader>
          <p>Following</p>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <p>
              <Center className="h-[70%] mb-10">
                <Spinner />
              </Center>
            </p>
          ) : (
            <>
              <Flex flexDir={"column"} className=" mb-10 gap-4">
                {followerData.map((follower) => (
                  <Link
                    onClick={() => {
                      onClose();
                    }}
                    key={follower?.uid}
                    state={follower?.uid}
                    href={
                      follower?.uid === userId
                        ? "/profile"
                        : "/user_profile/" + follower?.uid
                    }
                  >
                    <Flex alignItems={"center"} gap={2}>
                      <Avatar
                        name={follower.username}
                        src={follower.profilepic}
                      />
                      {follower.username}
                    </Flex>
                  </Link>
                ))}
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default Following;
