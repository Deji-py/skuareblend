import SuggestorCard from "./SuggestorCard";
import { Box, Flex, Text } from "@chakra-ui/react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

function ChannelSuggestors() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { userId, userData } = useContext(AuthContext);

  useEffect(() => {
    // Query Firebase to get new users (change this to match your Firebase database structure)
    const collectionRef = collection(db, "users");

    const docquery = query(collectionRef, limit(5));

    // Subscribe to the query and update the state when data changes
    const unsubscribe = onSnapshot(docquery, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const isUserAlreadyFollowed =
          userId === data.uid ||
          (userData && userData.followedChannels.includes(data.uid));

        // Check if the user is not already followed
        if (!isUserAlreadyFollowed) {
          users.push(data);
        }
      });
      setSuggestedUsers(users);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [userId, userData]); // Re-run the effect when userId or userData changes

  return (
    <Box className="p-2 gap-2 w-full">
      {suggestedUsers.length > 0 && (
        <Text className="font-bold">Suggestions</Text>
      )}
      <Flex
        alignItems={"center"}
        py={2}
        w={"full"}
        overflowX={"scroll"}
        gap={2}
        className="hideScroll"
      >
        {suggestedUsers.length > 0 ? (
          suggestedUsers.map((user, index) => (
            <SuggestorCard key={index} userData={user} />
          ))
        ) : (
          <p></p>
        )}
      </Flex>
    </Box>
  );
}

export default ChannelSuggestors;
