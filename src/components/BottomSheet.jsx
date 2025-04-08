import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Radio,
  Stack,
  Button,
  CloseButton,
} from "@chakra-ui/react";

export default function BottomSheet({
  full,
  title,
  children,
  isOpen,
  onClose,
}) {
  return (
    <>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay bg={"rgba(0,0,0,0.3)"} />
        <DrawerContent className=" z-50">
          <DrawerHeader alignItems={"center"} borderBottomWidth="1px">
            {title}
          </DrawerHeader>
          <DrawerBody>
            <DrawerCloseButton />
            {children}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
