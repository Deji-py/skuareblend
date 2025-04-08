import React, { useContext, useRef, useState } from "react";
import compressImagesForUpload from "../../../utility/compressImageForUpload";
import { Box, Image, useDisclosure, useToast } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { IoMdCamera } from "react-icons/io";
import { db, storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

function CoverImage({ friendData }) {
  const { userId, userData } = useContext(AuthContext);
  const inputRef = useRef(null);
  const toast = useToast();

  const handleUpdateCover = async (file) => {
    if (!file) {
      return;
    }
    toast({
      title: "Uploading",
      status: "info",
      position: "top",
      duration: 5000, // Toast will disappear after 5 seconds
      isClosable: true,
    });
    try {
      // Generate a unique filename (e.g., using a timestamp)
      const filename = `${userId}/cover.jpg`;

      // Create a reference to the Firebase Storage location where you want to upload the image
      const imageRef = ref(storage, filename);

      const compressedFile = await compressImagesForUpload(file);

      // Upload the cropped image Blob to Firebase Storage
      await uploadBytes(imageRef, compressedFile[0]);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(imageRef);

      // Close the modal

      const docRef = doc(db, "users", userId);
      // Update the user's coverImage in the database
      await updateDoc(docRef, { coverImage: downloadURL });
      toast({
        title: "Cover Image Updated",

        status: "success",
        position: "top",
        duration: 5000, // Toast will disappear after 5 seconds
        isClosable: true,
      });
    } catch (error) {
      console.error("Error cropping and uploading image:", error);
      toast({
        title: "Error",
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files;
    handleUpdateCover(file);
  };

  return (
    <div className="relative w-full">
      <Box className="w-full h-[60px] mt-2 overflow-hidden rounded-xl bg-gray-200">
        {friendData ? (
          <Image
            alt="coverImg"
            className=" w-full h-full object-center object-cover"
            src={
              friendData?.coverImage
                ? friendData?.coverImage
                : "https://img.freepik.com/free-photo/abstract-geometric-twisted-folds-background_1048-15994.jpg?w=900&t=st=1694269570~exp=1694270170~hmac=0facaf0fcbe62b9823aef7316e10822999ccbd9ec36519a8df243192a38c8316"
            }
          />
        ) : (
          <Image
            alt="coverImg"
            className=" w-full h-full object-center object-cover"
            src={
              userData?.coverImage
                ? userData?.coverImage
                : "https://img.freepik.com/free-photo/abstract-geometric-twisted-folds-background_1048-15994.jpg?w=900&t=st=1694269570~exp=1694270170~hmac=0facaf0fcbe62b9823aef7316e10822999ccbd9ec36519a8df243192a38c8316"
            }
          />
        )}
      </Box>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      {!friendData && (
        <button
          onClick={() => inputRef.current.click()}
          className="bg-white p-1 rounded-full absolute bottom-2 right-2"
        >
          <IoMdCamera size={12} />
        </button>
      )}
    </div>
  );
}

export default CoverImage;
