import { doc, updateDoc } from "firebase/firestore";

const updateUserStatus = async (userRef, status) => {
  try {
    // Assuming userRef is a reference to the Firestore document you want to update
    await updateDoc(userRef, { status: status });
    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export default updateUserStatus;
