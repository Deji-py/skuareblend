import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarGroup, Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function TotalComments({ comments }) {
  const [commenter, setCommenter] = useState(null);

  useEffect(() => {
    let commenterImagesAndName = [];
    comments?.forEach(async (item) => {
      const docRef = doc(db, "users", item?.uid);
      try {
        await getDoc(docRef).then((snapshot) => {
          commenterImagesAndName.push({
            profilepic: snapshot.data().profilepic,
            name: snapshot.data().username,
          });
        });
        setCommenter(commenterImagesAndName);
      } catch (e) {
        console.log(e.message);
      }
    });
  }, []);

  return (
    <Flex
      bg={"whitesmoke"}
      px={2}
      rounded={"full"}
      alignItems={"center"}
      gap={1}
    >
      {!commenter ? (
        <AvatarGroup size={"xs"}>
          <Avatar width={"20px"} height={"20px"} />
          <Avatar width={"20px"} height={"20px"} />
          <Avatar width={"20px"} height={"20px"} />
        </AvatarGroup>
      ) : (
        <AvatarGroup>
          {commenter.slice(0, 3).map((item, key) => (
            <Avatar
              width={"20px"}
              height={"20px"}
              key={key}
              src={item?.profilepic}
            />
          ))}
        </AvatarGroup>
      )}
      <p className="text-[12px]"> {commenter?.length} commented</p>
    </Flex>
  );
}

export default TotalComments;
