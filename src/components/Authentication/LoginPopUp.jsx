import GoogleLogo from "../../assets/icons/GoogleLogo.png";
import OTHLogo from "../../assets/othLogo.svg";
import signinwithgoogle from "../../pages/Authentication/services/signinwithgoogle";
import { useContext } from "react";
import { useState } from "react";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router";
import { AuthContext } from "../../App";

import {
  AlertDialogCloseButton,
  Center,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

function LoginPopUp({ isOpen, onClose, isBlog, url }) {
  const { setUserData, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSignIn = () => {
    signinwithgoogle(setUserData, toast, setLoading, navigate, isBlog, url);
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent
          bg={"red-500"}
          className="rounded-3xl"
          bottom={0}
          position="fixed"
          width="100%"
          padding="1rem"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="z-[1000] relative flex-column justify-center items-center reverseShadow shadow-2xl md:pt-0 w-full bg-white rounded-3xl py-5 md:mt-[-5%] px-10 md:px-5"
          >
            <BsX
              onClick={onClose}
              className="bg-white p-2 top-[-45px] right-0 rounded-full shadow absolute  z-[1000]"
              size={35}
            />
            <h2 className="text-center text-gray-600 font-bold text-[1.8rem] md:text-[1.2rem] mt-5">
              Please Sign in to continue reading
            </h2>
            <button
              onClick={handleSignIn}
              className="mt-5 w-full py-3 border-[1.5px] text-[16px] bg-gray-100 relative justify-center flex flex-col items-center rounded-full text-gray-900 "
            >
              <Image
                alt="googleLogo"
                src={GoogleLogo}
                width={10}
                className="border-2 absolute left-10"
              />
              Sign in with Google
            </button>

            <p className="text-[12px] text-center px-[15%] text-gray-500 mt-5">
              Kindly Read our{" "}
              <span className="font-bold">Terms and conditions</span> as well as
              our
              <span className="font-bold"> Privacy policy</span> carefully
            </p>
            <Center>
              <Flex
                className="text-[12px] mt-2 text-gray-700"
                alignItems={"center"}
              >
                <Image alt="othLogo" src={OTHLogo} className="w-[30px]" />
                <p>Object Tech house &#169; </p>
              </Flex>
            </Center>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default LoginPopUp;
