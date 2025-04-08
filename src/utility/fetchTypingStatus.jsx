import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

// Function to listen to the online status of a specific user
function useFetchTypingStatus(userId, messageId) {
  const [typing, setTyping] = useState(false);
  const [friendUid, setFriendUid] = useState(false);

  useEffect(() => {
    if (userId) {
      const userDocRef = doc(db, "users", userId, "messages", messageId);
      const unsubscribe = onSnapshot(userDocRef, (userSnapshot) => {
        try {
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setTyping(userData?.isTyping);
            setFriendUid(userData?.uid); // Return the typing data
          } else {
            console.error("User document does not exist");
            // Handle the case where the user document doesn't exist
          }
        } catch (error) {
          console.error("Error fetching typing typing:", error);
          // Handle the error in an appropriate way for your application
        }
      });

      // Clean up the listener when the component unmounts or when userId changes.
      return () => unsubscribe();
    }
  }, []);

  return { typing, friendUid };
}

export default useFetchTypingStatus;
