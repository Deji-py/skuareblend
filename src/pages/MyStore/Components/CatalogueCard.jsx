import Chip from "../../../components/MicroComps/Chip";
import ProductViewer from "../../../components/ProductViewer";
import React, { useState } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { CgTrash } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";
import { db } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import {
  Box,
  HStack,
  IconButton,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tag,
  VStack,
  useToast,
  Button,
} from "@chakra-ui/react";

function CatalogueCard({ aunction, product }) {
  const [viewProduct, setViewProduct] = useState(false);
  const { userId } = useContext(AuthContext);
  const isCurrentUser = product?.uid === userId;
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const deleteProduct = async () => {
    const docRef = doc(db, "stores", product?.storeId);
    await updateDoc(docRef, { products: arrayRemove(product) });
    onClose();
    toast({
      title: "Deleted Product",
      status: "success",
      position: "top",
    });
  };

  return (
    <HStack
      justify={"space-between"}
      className="bg-white shadow   h-[100px] w-full p-2"
    >
      <Box
        onClick={() => setViewProduct(true)}
        className="bg-gray-300  flex-none h-full w-[20%]"
      >
        <Image
          alt="catalogImg"
          className="w-full h-full object-cover"
          src={product?.productImages[0]}
        />
      </Box>

      <Box onClick={() => setViewProduct(true)} className="w-[55%] ">
        <h1 className="font-bold">{product?.productName}</h1>
        <p className="text-[12px] truncate">{product?.productDescription}</p>
      </Box>
      <VStack>
        {isCurrentUser && (
          <IconButton
            rounded={"full"}
            size={"xs"}
            onClick={() => setIsOpen(true)}
            bg={"red.100"}
            _hover={{
              bg: "red.100",
            }}
            icon={<FaTrash size={8} color="red" />}
          />
        )}
        <Tag colorScheme={aunction ? "blue" : "green"}>
          {"₦" + product?.productPrice}
        </Tag>
        {product?.isNegotiable && <Chip label={"Negotiable"} />}
      </VStack>
      <ProductViewer
        onClick={() => {
          setIsOpen(true);
        }}
        onClose={() => setViewProduct(false)}
        isOpen={viewProduct}
        product={product}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteProduct} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </HStack>
  );
}

export default CatalogueCard;
