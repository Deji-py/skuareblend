import DateObjectFromObject from "../../../utility/DateObjectFromObject";
import FollowButton from "../../../components/FollowBtn/FollowButton";
import React, { useEffect, useLayoutEffect, useState } from "react";
import fetchUser from "../../../Services/fetchUser";
import moment from "moment";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { BsHeartFill } from "react-icons/bs";
import { FaComments, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../../../firebaseConfig";

import {
  Avatar,
  Badge,
  Box,
  Center,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react";

const NotificationHead = ({ variant, src }) => {
  return (
    <Box className="relative ">
      <Avatar width={"40px"} height={"40px"} src={src} />
      {variant === "followed" && (
        <Center className="bg-primary border-2 border-white absolute top-[-5px] left-[-5px] p-1 w-5 h-5 rounded-full">
          <FaUserFriends size={10} color="white" />
        </Center>
      )}
      {variant === "liked" && (
        <Center className="bg-red-500 border-2 border-white absolute top-[-5px] left-[-5px] p-1 w-5 h-5 rounded-full">
          <BsHeartFill size={10} color="white" />
        </Center>
      )}
      {variant === "commented" && (
        <Center className="bg-green-600 border-2 border-white absolute top-[-5px] left-[-5px] p-1 w-5 h-5 rounded-full">
          <FaComments size={10} color="white" />
        </Center>
      )}
    </Box>
  );
};

const NotificationMessageVariant = ({
  userDetail,
  postId,
  variant,
  name,
  timestamp,
  comment,
}) => {
  const [postDetail, setPostDetail] = useState();
  useEffect(() => {
    if (postId) {
      const postRef = doc(db, "feed", postId);
      onSnapshot(postRef, (snapshot) => {
        setPostDetail({ ...snapshot.data(), id: snapshot.id });
      });
    }
  }, []);

  if (variant === "liked") {
    return (
      <Box className="text-[12px] w-full h-[50px]">
        <Flex alignItems={"center"} className="w-full h-full" gap={2}>
          <p className="flex-1">
            <span className="font-bold">{name}</span> liked your{" "}
            {postDetail?.feedType === "blog" ? "blog" : "post"}
            <span className="font-bold">
              {" "}
              {postDetail?.feedType === "post"
                ? postDetail?.text?.slice(0, 50) + "..."
                : postDetail?.title?.slice(0, 50) + "..."}
            </span>
            <p className="text-[11px] text-gray-500">
              {moment(DateObjectFromObject(timestamp)).fromNow()}
            </p>
          </p>
          <Box className="w-[20%] h-full flex-none bg-gray-300 ov rounded-md">
            <Image
              alt="notificationImg"
              className="w-full h-full object-cover "
              src={
                postDetail?.feedType === "post"
                  ? postDetail?.images[0].src
                  : postDetail?.cover
              }
            />
          </Box>
        </Flex>
      </Box>
    );
  }

  if (variant === "followed") {
    return (
      <Flex
        alignItems={"center"}
        gap={2}
        className="text-[12px] w-full h-[50px]"
      >
        <Box className="text-[12px] flex-1">
          <p>
            <span className="font-bold">{name}</span> started following you
          </p>
          <p className="text-[11px] text-gray-500">
            {moment(DateObjectFromObject(timestamp)).fromNow()}
          </p>
        </Box>
      </Flex>
    );
  }
  if (variant === "commented") {
    return (
      <Flex
        alignItems={"center"}
        gap={2}
        className="text-[12px] w-full h-[50px]"
      >
        <p className="flex-1">
          <span className="font-bold">{name}</span> Commented on your{" "}
          {postDetail?.feedType === "blog" ? "blog" : "post"}
          <span> "{comment?.slice(0, 50) + "..."}"</span>
          <p className="text-[11px] text-gray-500">
            {moment(DateObjectFromObject(timestamp)).fromNow()}
          </p>
        </p>
        <Box className="w-[20%] h-full flex-none bg-gray-300 ov rounded-md">
          <Image
            alt="notificationImg"
            className="w-full h-full object-cover "
            src={
              postDetail?.feedType === "post"
                ? postDetail?.images[0].src
                : postDetail?.cover
            }
          />
        </Box>
      </Flex>
    );
  }
};

function Notification_Card({
  postId,
  variant,
  isRead = true,
  timestamp,
  uid,
  comment,
  feedType,
}) {
  const [userDetail, setUserDetail] = useState();
  const [routeTo, setRouteTo] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", uid), (snapshot) => {
      setUserDetail(snapshot.data());
    });

    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    switch (feedType) {
      case "post":
        setRouteTo("/post/" + postId);
        break;
      case "blog":
        setRouteTo("/blog/" + postId);
        break;
      default:
        setRouteTo("/user_profile/" + uid);
        break;
    }
  }, []);

  return (
    <Link to={routeTo}>
      <HStack
        className={`p-3 py-4  border-b-[1.2px] border-gray-100 w-screen ${
          !isRead && "bg-blue-50"
        }`}
      >
        <NotificationHead src={userDetail?.profilepic} variant={variant} />
        <NotificationMessageVariant
          userDetail={userDetail}
          comment={comment}
          postId={postId}
          name={userDetail?.username}
          timestamp={timestamp}
          variant={variant}
        />
      </HStack>
    </Link>
  );
}

export default Notification_Card;
