import CommentPlayer from "./CommentPlayer";
import DateObjectFromObject from "../../utility/DateObjectFromObject";
import LikedChip from "../MicroComps/LikedChip";
import moment from "moment";
import { Avatar, Box, Center, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

function CommentStateCard({ commentData, parentId, setIsReplying }) {
  const [userDetail, setUserDetail] = useState(null);

  return (
    <Center className="px-2 fixed bottom-[150px] w-full ">
      <div className="px-2 bg-white  w-full rounded-xl shadow py-2 border-[1.5px]">
        <Flex justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap={2}>
            <Avatar
              width={"30px"}
              height={"30px"}
              src={userDetail?.profilepic}
            />
            <Box>
              <p className="text-[12px] font-bold">{userDetail?.username}</p>
              <p className="text-[11px] text-gray-500">
                {moment(DateObjectFromObject(commentData?.createdAt)).fromNow()}
              </p>
            </Box>
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <LikedChip
              feedType={"post"}
              id={commentData?.id}
              parentId={parentId}
              isCollection={true}
              path={"feed"}
              likes={commentData?.likes}
            />
          </Flex>
        </Flex>
        <Box className=" ml-3 mt-2 text-[12px]">
          {!commentData?.audioUrl && commentData?.text && (
            <p className="">{commentData?.text.slice(0, 200) + "..."}</p>
          )}
          {commentData?.audioUrl && !commentData?.text && (
            <CommentPlayer src={commentData?.audioUrl} />
          )}
          {commentData?.audioUrl && commentData?.text && (
            <>
              <CommentPlayer src={commentData?.audioUrl} />
              <p className="">{commentData?.text.slice(0, 200) + "..."}</p>
            </>
          )}
        </Box>
      </div>
    </Center>
  );
}

export default CommentStateCard;
