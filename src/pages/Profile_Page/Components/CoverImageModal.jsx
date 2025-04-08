import "react-image-crop/dist/ReactCrop.css";
import "react-image-crop/dist/ReactCrop.css";
import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const CoverImageModal = ({ image, onCropComplete, isOpen, onClose }) => {
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    height: 40,
    y: 30,
    aspect: 16 / 9,
  });

  const imageRef = useRef(null);

  const handleCropComplete = () => {
    onCropComplete(crop);
    onClose(); // Close the modal after cropping
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crop Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReactCrop locked={true} crop={crop} onChange={(c) => setCrop(c)}>
            <img
              className="w-[100vw]  object-cover h-[50vh]"
              src={image ? URL.createObjectURL(image) : ""}
              alt="your image"
            />
          </ReactCrop>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCropComplete}>
            Crop
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CoverImageModal;
