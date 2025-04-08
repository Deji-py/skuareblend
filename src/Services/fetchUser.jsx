import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

async function fetchUser(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      // Handle the case where the document doesn't exist (user not found)
      return null;
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching user:", error);
    return null;
  }
}

export default fetchUser;
