import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

// Function to listen to the online status of a specific user
function useFetchOnlineStatus(userId) {
  const userDocRef = doc(db, "users", userId);
  const [status, setStatus] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (userSnapshot) => {
      try {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setStatus(userData.status); // Return the status data
        } else {
          console.error("User document does not exist");
          // Handle the case where the user document doesn't exist
        }
      } catch (error) {
        console.error("Error fetching online status:", error);
        // Handle the error in an appropriate way for your application
      }
    });

    // Clean up the listener when the component unmounts or when userId changes.
    return () => unsubscribe();
  }, [userId, userDocRef]);

  return status;
}

export default useFetchOnlineStatus;
