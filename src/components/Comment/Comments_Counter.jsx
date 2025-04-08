import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarGroup, Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function Comments_Counter({ comments }) {
  const [commenters, setCommenters] = useState(null);

  useEffect(() => {
    if (comments) {
      let commentersImagesAndName = [];
      comments?.forEach(async (item) => {
        const docRef = doc(db, "users", item.uid);
        try {
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            const userData = snapshot.data();
            commentersImagesAndName.push({
              profilepic: userData.profilepic, // Corrected the key
              name: userData.username,
              uid: userData.username, // Corrected the key
            });

            const uniqueObject = {};
            const newArray = [];

            for (let i in commentersImagesAndName) {
              const objectId = commentersImagesAndName[i]["uid"];
              uniqueObject[objectId] = commentersImagesAndName[i];
            }
            for (let i in uniqueObject) {
              newArray.push(uniqueObject[i]);
            }

            setCommenters(newArray);
          }
        } catch (e) {}
      });
    }
  }, [comments]);

  return (
    <Flex rounded={"full"} w={"60%"} alignItems={"center"} gap={1}>
      {!commenters ? (
        <></>
      ) : (
        <AvatarGroup>
          {commenters.slice(0, 3).map((item, key) => (
            <Avatar
              width={"20px"}
              height={"20px"}
              key={key}
              src={item?.profilepic}
            />
          ))}
        </AvatarGroup>
      )}
      <p className="text-[11px]">
        {commenters?.length === 1 && (
          <span>{commenters[0]?.name} </span> // Corrected the key
        )}
        {commenters?.length === 2 && (
          <span>
            {commenters[0]?.name} and {commenters[1]?.name}
          </span>
        )}
        {commenters?.length >= 3 && (
          <span>
            {commenters[0]?.name}, {commenters[1]?.name}, and{" "}
            {commenters.length - 2} others commented
          </span>
        )}
      </p>
    </Flex>
  );
}

export default Comments_Counter;
