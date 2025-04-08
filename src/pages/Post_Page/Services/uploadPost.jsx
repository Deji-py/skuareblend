import compressImagesForUpload from "../../../utility/compressImageForUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "../../../../firebaseConfig";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

export const uploadPostToFirestore = async (
  currentUser,
  text,
  youtubeLinks,
  images,
  setText,
  setImages,
  setYoutubeLinks,
  setYoutubeLink,
  setOpenPostCreator,
  setLoading,
  toast,
  isDiscreet,
  tags
) => {
  if (text.trim() === "") {
    return;
  }
  const customId = v4(); // Generate a custom ID using uuid

  try {
    setLoading(true);

    // Compress the images
    let compressedImages = await compressImagesForUpload(images);

    // Create a new post object with the custom ID and compressed images
    const newPost = {
      id: customId, // Use the custom ID
      uid: currentUser,
      text,
      createdAt: serverTimestamp(),
      likes: [],
      comments: [],
      votes: [],
      youtubeLinks: youtubeLinks,
      feedType: "post",
      isDiscreet,
      tags,
      images: [],
      text_lower: text.toLowerCase(), // Initialize the images array
    };

    // Upload compressed images to Firestore storage if there are images
    if (compressedImages.length > 0) {
      for (const compressedImage of compressedImages) {
        const imageRef = ref(
          storage,
          `${currentUser}/postImages/${customId}/${compressedImage.name}`
        );
        await uploadBytes(imageRef, compressedImage);
        const imageUrl = await getDownloadURL(imageRef);
        newPost.images.push({ src: imageUrl });
      }
    }

    // Add YouTube links to the post if there are any

    // Add the post to Firestore with the custom ID and image URLs
    await setDoc(doc(db, "feed", customId), newPost);

    // Update the current user's document with the post ID
    const userRef = doc(db, "users", currentUser);
    await updateDoc(userRef, {
      posts: arrayUnion(customId),
    });

    // Reset form data
    setText("");
    setImages([]);
    setYoutubeLinks([]);
    setYoutubeLink("");

    // Close the post creation dialog
    setOpenPostCreator(false);
    setLoading(false);
  } catch (error) {
    toast({
      title: "Something went wrong!" + error.message,
      status: "error",
      position: "top",
    });
    setLoading(false);
  }
};
