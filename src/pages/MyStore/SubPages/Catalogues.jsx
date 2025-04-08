import CatalogueCard from "../Components/CatalogueCard";
import CurrencyInput from "react-currency-input-field";
import FabMainButton from "../../../components/ReUsables/FAB/FabMainButton";
import ProducImagesView from "../../../components/ProducImagesView";
import StoreMessageDialogue from "./SetUpSteps/StoreMessageDialogue";
import TextInput from "../../../components/TextInput";
import compressImagesForUpload from "../../../utility/compressImageForUpload";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { BsPenFill } from "react-icons/bs";
import { MdSell } from "react-icons/md";
import { v4 } from "uuid";
import { db, storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Switch,
  Center,
  Flex,
  Spinner,
  useToast,
  Progress,
} from "@chakra-ui/react";

function UploadProductModal({ isOpen, onClose, shopId }) {
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const { userId } = useContext(AuthContext);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (
      !images ||
      !productName.trim("") ||
      !productDescription.trim("") ||
      !productPrice.trim("")
    ) {
      toast({
        title: "Please Fill all fields",
        status: "info",
        position: "top",
        colorScheme: "orange",
      });
      setLoading(false);
      return;
    }
    setLoading(true);

    const docRef = doc(db, "stores", shopId);

    // Initialize an array to store image URLs
    const imageUrls = [];

    // Loop through the selected images and upload them to Firebase Storage
    for (const imageFile of images) {
      // Generate a unique filename using UUID
      const fileName = v4();

      // Create a reference to the storage location
      const storageRef = ref(storage, `${userId}/StoreProducts/${fileName}`);

      // Upload the image to Firebase Storage
      try {
        await uploadBytes(storageRef, imageFile);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      // Get the download URL of the uploaded image
      try {
        const imageUrl = await getDownloadURL(storageRef);
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    }

    // Update the Firestore document with the array of image URLs
    await updateDoc(docRef, {
      products: arrayUnion({
        id: v4(),
        uid: userId,
        storeId: shopId,
        productName,
        productPrice,
        isNegotiable,
        productDescription,
        productImages: imageUrls, // Store the array of image URLs
      }),
    });
    setLoading(false);
    onClose();
  };

  const toast = useToast();

  const handleChange = async (ev) => {
    setUploading(true);
    const selectedFiles = ev.target.files;
    const maxFiles = 5;

    // Check if the number of selected files exceeds the maximum limit
    if (selectedFiles.length > maxFiles) {
      alert(`You can only select up to ${maxFiles} images.`);
      // Clear the input field
      ev.target.value = null;
      setUploading(false);
    } else {
      const compressedImages = await compressImagesForUpload(selectedFiles);
      setImages(compressedImages);
      setUploading(false);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent h={"100vh"}>
        <ModalHeader>Upload Product</ModalHeader>
        {uploading && <Progress size={"xs"} isIndeterminate />}
        <ModalCloseButton
          onClick={() => {
            if (loading) {
              toast({
                title: "Uploading",
                status: "info",
                description: "uploading product",
                position: "top",
              });
            }
          }}
        />
        {loading ? (
          <Center className=" w-full h-[70vh]">
            <Spinner />
          </Center>
        ) : (
          <>
            <ModalBody px={2}>
              <ProducImagesView imageRef={imageRef} images={images} />

              <VStack
                justifyContent={"start"}
                alignItems={"start"}
                className="w-full mt-5 "
              >
                <TextInput
                  icon={<BsPenFill color="#8F93A3" />}
                  placeholder="Enter product name"
                  state={productName}
                  setState={setProductName}
                />
                <CurrencyInput
                  className="rounded-xl bg-gray-50 py-2 border-[1.5px] px-5 w-full"
                  id="input-example"
                  name="input-name"
                  prefix="₦"
                  placeholder="₦ Price"
                  decimalsLimit={2}
                  value={productPrice}
                  onValueChange={(value, name) => setProductPrice(value)}
                />

                <Textarea
                  bg={""}
                  w={"full"}
                  h={"150px"}
                  rounded={"xl"}
                  border={""}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full border-[1.5px] bg-gray-50"
                  placeholder="Short discription about your product"
                />
              </VStack>
              <Flex
                className="mt-5 "
                alignItems={"center"}
                justify={"space-between"}
              >
                <Center
                  className="px-2 border-[1.5px] text-gray-500 py-2 rounded-full"
                  gap={2}
                >
                  <Switch
                    value={isNegotiable}
                    onChange={(e) => setIsNegotiable(e.target.value)}
                  />
                  <p>Negotiable</p>
                </Center>
                <Button
                  bg={""}
                  className="bg-primary"
                  onClick={handleUpload}
                  colorScheme="blue"
                >
                  Upload
                </Button>
              </Flex>
            </ModalBody>
          </>
        )}
        <input
          onChange={handleChange}
          ref={imageRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
        />
      </ModalContent>
    </Modal>
  );
}

function Catalogues({ products, shopId, isVisitor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messaging, setMessaging] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <VStack className="h-full pb-[100px]  w-screen px-2">
      <StoreMessageDialogue
        storeId={shopId}
        isOpen={messaging}
        onClose={setMessaging}
      />
      {products?.map((product) => (
        <CatalogueCard key={product.id} product={product} />
      ))}
      {!isVisitor && (
        <FabMainButton label={"Sell"} onClick={openModal} icon={<MdSell />} />
      )}
      {/* <FabMainButton
          icon={<FaComment />}
         onClick={() => setMessaging(true)}
        /> */}
      <UploadProductModal
        shopId={shopId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </VStack>
  );
}

export default Catalogues;
