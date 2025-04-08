import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

function hasUnreadNotifications(userId, callback) {
  const docRef = collection(db, "users", userId, "notifications");

  // Create a query to check if there are any unread notifications
  const queryRef = query(docRef, where("isRead", "==", false));

  const unsubscribe = onSnapshot(queryRef, (snapshot) => {
    // Calculate if there are unread notifications
    const hasUnread = !snapshot.empty;

    // Call the callback function with the result
    callback(hasUnread);
  });

  // Return the unsubscribe function to stop listening to changes
  return unsubscribe;
}

export default hasUnreadNotifications;
