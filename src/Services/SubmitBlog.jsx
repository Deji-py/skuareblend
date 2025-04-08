import { db } from "../../firebaseConfig";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

// Function to submit a new blog
const submitBlog = async (userId, blogData, blogId) => {
  try {
    // Step 1: Create a reference to the new blog document using the provided blogId
    const newBlogRef = doc(db, "feed", blogId);

    // Step 2: Set the data for the new blog document
    await setDoc(newBlogRef, blogData);

    // Step 3: Update the user's document to include a reference to the new blog
    const userDocRef = doc(db, "users", userId);
    await setDoc(
      userDocRef,
      { blogs: arrayUnion(newBlogRef) },
      { merge: true }
    );

    console.log("Blog submitted successfully.");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error submitting blog:", error);
    return false; // Return false to indicate failure
  }
};

export default submitBlog;
