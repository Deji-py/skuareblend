import Contact_Details from "./SetUpSteps/Contact_Details";
import FabMainButton from "../../../components/ReUsables/FAB/FabMainButton";
import React, { useContext } from "react";
import Shop_Preview from "./SetUpSteps/Shop_Preview";
import StoreCard from "../Components/StoreCard";
import StoreInfo_Setup from "./SetUpSteps/StoreInfo_Setup";
import TextInput from "../../../components/TextInput";
import compressImagesForUpload from "../../../utility/compressImageForUpload";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { v4 } from "uuid";
import { db, storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../App";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

function SetUpStore({ setShopExists }) {
  const [cover, setCover] = useState();
  const [logo, setLogo] = useState();
  const [storeName, setStoreName] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [customId] = useState(v4());
  const toast = useToast();
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: "First", description: "Store Info" },
    { title: "Second", description: "Contact Details" },
    { title: "Third", description: "Review and Submit" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleSubmitStep1 = async () => {
    const docRef = doc(db, "stores", customId);

    setLoading(true);
    if (!storeName.trim("") || !oneLiner.trim("") || !logo || !cover) {
      toast({
        title: (
          <p className="text-[14px] text-white">Please fill all the fields!</p>
        ),
        status: "warning",
        position: "top",
        variant: "solid",
      });
      setLoading(false);
      return;
    }

    let logoURL;
    let coverURL;

    const compressedLogo = await compressImagesForUpload(logo);
    const compressedCover = await compressImagesForUpload(cover);

    const logoStorageRef = ref(storage, `${userId}/storeLogoImg`);
    const coverStorageRef = ref(storage, `${userId}/coverLogoImg`);
    const userShopDocRef = doc(db, "users", userId, "store", customId);
    let uplaodedLogo = await uploadBytes(logoStorageRef, compressedLogo[0]);
    logoURL = await getDownloadURL(uplaodedLogo.ref);
    let uplaodedCover = await uploadBytes(coverStorageRef, compressedCover[0]);
    coverURL = await getDownloadURL(uplaodedCover.ref);

    await setDoc(docRef, {
      id: customId,
      storeName: storeName,
      oneLiner: oneLiner,
      uid: userId,
      logoUrl: logoURL,
      coverUrl: coverURL,
    });
    await setDoc(userShopDocRef, { id: customId });
    handleNextStep();
    setLoading(false);
  };

  const handleSubmitStep2 = async () => {
    const docRef = doc(db, "stores", customId);

    setLoading(true);
    if (!description.trim("") || !address.trim("") || !phoneNo.trim("")) {
      toast({
        title: (
          <p className="text-[14px] text-white">Please fill all the fields!</p>
        ),
        status: "warning",
        position: "top",
        variant: "solid",
      });
      setLoading(false);
      return;
    }
    await updateDoc(docRef, {
      description: description,
      address: address,
      phoneNo: phoneNo,
    });

    setLoading(false);
    handleNextStep();
  };

  const handleFinishSetUp = async () => {
    setLoading(true);
    const docRef = doc(db, "stores", customId);
    await updateDoc(docRef, {
      products: [],
      recommendations: [],
      starRating: [],
      reviews: [],
    });
    setLoading(false);
    location.reload();
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  if (loading) {
    return (
      <Center className="h-[70vh] w-full">
        <Spinner />
      </Center>
    );
  }

  return (
    <Center
      justifyContent={"start"}
      pt={20}
      mb={20}
      flexDir={"column"}
      alignItems={"start"}
      className="w-screen overflow-y-scroll  h-screen"
    >
      <Center className="left-0 absolute top-5 px-2 w-screen">
        <Stepper size="xs" className="w-full" index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Center>
      <Box className="w-full overflow-hidden bg-gray-200 h-[150px]">
        <Image
          alt="setUpStoreImg"
          src="https://img.freepik.com/premium-vector/hand-holding-mobile-smart-phone-with-shop-app-fashion-items-online-shopping-concept_3482-7692.jpg?w=996"
          className="w-full h-full object-cover"
        />
      </Box>
      <Alert size={"sm"} colorScheme="gray" status="info" variant="subtle">
        <AlertIcon />
        <p className="text-[14px]">
          Review your Information well before moving to the{" "}
          <span className="font-bold">Next step</span>
        </p>
      </Alert>
      <Box className="pl-5 mb-5">
        <h2 className="font-bold text-[20px] mt-5 text-[#596D88]">
          {steps[activeStep].description}
        </h2>
        <p className="text-sm">Create store account</p>
      </Box>

      {activeStep === 0 && (
        <>
          <StoreInfo_Setup
            setOneLiner={setOneLiner}
            setStoreName={setStoreName}
            storeName={storeName}
            oneLiner={oneLiner}
            logo={logo}
            cover={cover}
            setCover={setCover}
            setLogo={setLogo}
          />

          <FabMainButton
            onClick={handleSubmitStep1}
            icon={<FaChevronRight />}
            label={"Next"}
          />
        </>
      )}

      {activeStep === 1 && (
        <>
          <Contact_Details
            address={address}
            setAddress={setAddress}
            phoneNo={phoneNo}
            setPhoneNo={setPhoneNo}
            setDescription={setDescription}
            description={description}
          />
          <FabMainButton
            onClick={handleSubmitStep2}
            icon={<FaChevronRight />}
            label={"Next"}
          />
        </>
      )}

      {activeStep === 2 && (
        <>
          <StoreCard isReview={true} id={customId} />

          <FabMainButton
            onClick={handleFinishSetUp}
            // You can add final step handling here, such as submitting the form
            icon={<BsSend />}
            label={"Submit"}
          />
        </>
      )}
    </Center>
  );
}

export default SetUpStore;
