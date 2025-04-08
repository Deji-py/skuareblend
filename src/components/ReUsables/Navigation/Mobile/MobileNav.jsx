import MobileNavItem from "./MobileNavItem";
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../../firebaseConfig";
import { AuthContext } from "../../../../App";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

export const MobileNav = ({ isOpen, onClose, NAV_ITEMS }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
      setIsAuthenticated(false);
    });
  };

  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay bg={"rgba(255,255,255,0.8)"} />
      <DrawerContent>
        <DrawerBody>
          {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}
          <Button onClick={handleSignOut}>Signout</Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileNav;
