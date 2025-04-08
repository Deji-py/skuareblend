import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getBlogsByUserId = async (userId) => {
  try {
    const userBlogs = [];
    const feedRef = collection(db, "feed");

    const querySnapshot = await getDocs(
      query(
        feedRef,
        where("authorId", "==", userId),
        where("feedType", "==", "blog")
      )
    );

    querySnapshot.forEach((doc) => {
      const blogData = doc.data();
      userBlogs.push(blogData);
    });

    return userBlogs;
  } catch (error) {
    console.error("Error fetching blogs by user ID:", error);
    return [];
  }
};

export default getBlogsByUserId;
