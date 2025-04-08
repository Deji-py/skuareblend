import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const fetchProfileDetail = (userId, callback) => {
  const userDocRef = doc(db, `users/${userId}`);

  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const profileData = docSnapshot.data();
      callback({ loading: false, error: null, profileData });
    } else {
      callback({
        loading: false,
        error: new Error("User not found"),
        profileData: null,
      });
    }
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};

export default fetchProfileDetail;
