import { db } from "../../firebaseConfig";

import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

async function deleteBlog(blogId, userId, toast) {
  const blogRef = doc(db, "feed", blogId);
  const userRef = doc(db, "users", userId);

  toast({
    title: "Deleting",
    status: "info",
    duration: 5000,
    position: "top",
    isClosable: true,
  });
  try {
    const blogSnapshot = await getDoc(blogRef);
    if (!blogSnapshot.exists()) {
      console.error("Blog document does not exist.");
      return;
    }

    // Check if the user document exists
    const userSnapshot = await getDoc(userRef);
    if (!userSnapshot.exists()) {
      console.error("User document does not exist.");
      return;
    }
    // 1. Delete the blog document from the "blogs" collection

    await deleteDoc(blogRef);

    // 2. Remove the blogId from the currently authenticated user's blogs array
    await updateDoc(userRef, {
      blogs: arrayRemove(doc(db, "feed", blogId)),
    });

    // Show a success toast
    toast({
      title: "Blog Deleted",
      description: "The blog has been successfully deleted.",
      status: "success",
      position: "top",
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    // Show an error toast
    toast({
      title: "Error",
      description: "An error occurred while deleting the blog.",
      status: "error",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    console.error("Error deleting the blog:", error);
  }
}

export default deleteBlog;
