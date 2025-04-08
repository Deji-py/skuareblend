import GoogleLogo from "../../assets/icons/GoogleLogo.png";
import Logo from "../../assets/icons/LogoColor.svg";
import OTHLogo from "../../assets/othLogo.svg";
import bgImage from "../../assets/BgImage.jpg";
import signinwithgoogle from "../../pages/Authentication/services/signinwithgoogle";
import { Center, Flex, Image, Spinner, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import { AuthContext } from "../../App";

function LoginForm() {
  const { setUserData, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSignIn = () => {
    signinwithgoogle(setUserData, toast, setLoading, navigate);
  };

  return (
    <Flex height={"full"} className=" flex w-full  flex-row md:flex-col">
      {loading && (
        <Center className="absolute left-[45%] z-[1000] shadow-xl top-5 bg-white rounded-full p-2">
          <Spinner />
        </Center>
      )}

      <Helmet>
        <meta name="theme-color" content="#4169E1" />
      </Helmet>
      <div className="  bg-black  text-white  relative  flex flex-col justify-center items-center flex-1 md:flex-none  md:w-[100vw] h-[100vh]  md:h-[75vh]">
        <Image
          alt="bgImage"
          src={bgImage}
          className="w-full h-full object-cover opacity-[0.3]"
        />
        <div className=" flex flex-col justify-center items-center absolute z-[1000]">
          <img src={Logo} alt="logo" width="15%" />
          <h1 className=" font-poppins text-3xl text-white ">SkuareBlend</h1>
          <p className=" text-[14px] text-white opacity-[0.8]">
            {" "}
            Connect and Thrive
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" z-[1000] flex-column   justify-center items-center reverseShadow shadow-2xl pt-[100px]  md:pt-0 w-[500px] md:w-full h-full  bg-white rounded-3xl  md:mt-[-5%] px-10 md:px-5"
      >
        {/* <div className=" mb-5 mt-3 text-xl">
          <h1 className=" text-poppins font-bold text-primary">
            Hey<span className="text-black"> Buddy,</span>{" "}
          </h1>
          <p className=" text-[14px] text-gray-500 mt-[-5px]">
            Login to account
          </p>
        </div> */}

        <button
          onClick={handleSignIn}
          className=" mt-5 w-full py-3  border-[1.5px] text-[16px] bg-gray-100 relative justify-center flex flex-col items-center rounded-full text-gray-900 "
        >
          <Image
            alt="googleLogo"
            src={GoogleLogo}
            width={10}
            className=" border-2 absolute left-10"
          />
          Signin with Google
        </button>

        <p className="  text-[12px] text-center px-[15%] text-gray-500 mt-5">
          Kindly Read our{" "}
          <span className="font-bold">Terms and conditions</span> as well as our
          <span className="font-bold"> Privacy policy</span> carefully
        </p>
        <Center>
          <Flex
            className=" text-[12px] mt-2 text-gray-700"
            alignItems={"center"}
          >
            <Image alt="othLogo" src={OTHLogo} className="w-[30px]" />
            <p>Object Tech house &#169; </p>
          </Flex>
        </Center>
      </form>
    </Flex>
  );
}

export default LoginForm;
