import Chip from "./MicroComps/Chip";
import ProducImagesView from "./ProducImagesView";
import React from "react";
import Socials from "../pages/Profile_Page/Components/Socials";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsChatTextFill, BsPhoneFill } from "react-icons/bs";
import { MdCall, MdDelete } from "react-icons/md";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../App";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Tag,
  Flex,
  HStack,
  Box,
  Image,
} from "@chakra-ui/react";

function ProductViewer({ isOpen, isPreview, onClose, product, onClick }) {
  const { userId } = useContext(AuthContext);
  const [storeDetail, setStoreDetail] = useState(null);
  const [storeOwner, setStoreOwner] = useState(null);
  const isCurrentUser = product?.uid === userId;

  useEffect(() => {
    const docRef = doc(db, "stores", product?.storeId);
    getDoc(docRef).then((doc1) => {
      setStoreDetail(doc1.data());
      const userRef = doc(db, "users", doc1.data().uid);
      getDoc(userRef).then((doc2) => {
        setStoreOwner(doc2.data());
      });
    });
  }, []);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent className="h-[100vh]">
        <ModalHeader>
          <Flex gap={3} alignItems={"center"}>
            <Tag size={"lg"} p={2} colorScheme="green">
              ₦ {product?.productPrice}
            </Tag>
            {product?.isNegotiable && (
              <Chip bgColor="coral" textColor="white" label={"Negotiable"} />
            )}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={2}>
          <ProducImagesView isPreview={true} images={product?.productImages} />
          <HStack className="mt-5">
            <Box className="bg-gray-100 overflow-hidden w-10 h-10 rounded-xl">
              <Image
                alt="productImg"
                src={storeDetail?.logoUrl}
                className="w-full h-full"
              />
            </Box>
            <Box>
              <p className="text-[14px] font-bold ">{storeDetail?.storeName}</p>
              <p className="text-[12px]">
                {storeDetail?.oneLiner.slice(0, 40)}
              </p>
            </Box>
          </HStack>
          <h2 className="font-bold text-[18px] mt-5">{product?.productName}</h2>
          <p className="text-[14px]">{product?.productDescription}</p>
          <Flex className=" w-full justify-end px-5">
            {isCurrentUser ? (
              <Button
                bg={""}
                rounded={"md"}
                className="bg-red-500 mt-5 "
                color={"white"}
                mr={-4}
                _hover={{
                  bg: "black",
                }}
                onClick={() => {
                  onClose;
                  onClick();
                }}
              >
                <MdDelete className="mr-2" />
                Delete
              </Button>
            ) : (
              <Center flexDir={"column"} className=" mt-10 w-full ">
                <h2>Seller Contect Info</h2>
                <Socials isUser={true} userData={storeOwner} />
                <HStack className="mt-5">
                  <MdCall />
                  <p className=" font-bold">{storeDetail?.phoneNo}</p>
                </HStack>
              </Center>
            )}
          </Flex>
        </ModalBody>

        {/* You can add more buttons or actions here */}
      </ModalContent>
    </Modal>
  );
}

export default ProductViewer;
