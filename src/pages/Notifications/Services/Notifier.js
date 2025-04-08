import { db } from "../../../../firebaseConfig";

import {
  addDoc,
  collection,
  doc,
  query,
  where,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

async function Notifier(userId, friendId, postId, variant, comment, feedType) {
  if (userId === friendId) {
    return;
  }

  // Reference to the notifications collection for the friend
  const docRef = collection(db, "users", friendId, "notifications");

  // Create a common data object for all variants
  const commonData = {
    uid: userId,
    isRead: false,
    timeStamp: serverTimestamp(),
  };

  // Create a query to check if a similar notification already exists
  const queryRef = query(
    docRef,
    where("uid", "==", userId),
    where("postId", "==", postId)
  );

  const existingNotifications = await getDocs(queryRef);

  if (!existingNotifications.empty && variant !== "commented") {
    console.log("Notification already exists, skipping.");
    return;
  }

  // Create a variant-specific data object
  let variantData;

  if (variant === "followed") {
    variantData = {
      feedType,
      isRead: false,
      variant: "followed",
      ...commonData,
    };
  } else if (variant === "liked") {
    variantData = {
      variant: "liked",
      postId,
      feedType,
      isRead: false,
      ...commonData,
    };
  } else if (variant === "commented") {
    variantData = {
      variant: "commented",
      postId,
      comment,
      feedType,
      isRead: false,
      ...commonData,
    };
  } else {
    return;
  }

  // Add the notification to the collection
  await addDoc(docRef, variantData);

  console.log("Notification added.");
}

export default Notifier;
