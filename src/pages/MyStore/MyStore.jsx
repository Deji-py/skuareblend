import About from "./SubPages/About";
import Catalogues from "./SubPages/Catalogues";
import Review from "./SubPages/Review";
import SetUpStore from "./SubPages/SetUpStore";
import Socials from "../Profile_Page/Components/Socials";
import StoreCard from "./Components/StoreCard";
import StoreChat from "../Live Discussion/Components/Chat_List_Item/StoreChat";
import TabGenerator from "../MarketPlace/Components/TabGenerator";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { BsGrid1X2Fill } from "react-icons/bs";
import { MdReviews } from "react-icons/md";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { db } from "../../../firebaseConfig";
import { AuthContext } from "../../App";

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  IoIosInformation,
  IoIosInformationCircle,
  IoMdInformation,
} from "react-icons/io";

import {
  Box,
  Center,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

function MyStore({ isVisitor }) {
  const [storeExists, setStoreExists] = useState();
  const [storeId, setStoreId] = useState();
  const { userId, userData } = useContext(AuthContext);
  const [detail, setDetail] = useState();
  const params = useParams();

  useEffect(() => {
    if (!isVisitor) {
      const docRef = collection(db, "users", userId, "store");
      getDocs(docRef).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setStoreId(doc.id);
        });
      });
    } else {
      setStoreId(params?.id);
    }
  }, []);

  useEffect(() => {
    if (storeId) {
      const shopRef = doc(db, "stores", storeId);
      onSnapshot(shopRef, (doc) => {
        setDetail(doc.data());
      });
    }
  }, [storeId, detail]);

  const myTabs = [
    {
      id: 0,
      label: "Catalog",
      tabIcon: <BsGrid1X2Fill className="mr-1 #5C6784" />,
      tabPage: (
        <Catalogues
          isVisitor={isVisitor}
          shopId={storeId}
          products={detail?.products}
        />
      ),
    },
    // {
    //   id: 2,
    //   label: "Reviews",
    //   tabIcon: <MdReviews className="mr-1 #5C6784" />,
    //   tabPage: <Review products={detail?.reviews} />,
    // },
    {
      id: 3,
      label: "About",
      tabIcon: <IoIosInformationCircle color="#5C6784" className="mr-1" />,
      tabPage: <About detail={detail} />,
    },
  ];

  //check if store already exist
  const checkIfStoreExists = async () => {
    const storeCollectionRef = collection(db, "users", userId, "store");
    const store = await getDocs(storeCollectionRef);
    if (store.empty) {
      setStoreExists(false);
    } else {
      setStoreExists(true);
    }
  };

  useEffect(() => {
    checkIfStoreExists();
  }, [userId]);

  if (storeExists === undefined) {
    return (
      <Center className="h-[70vh] w-screen">
        <Spinner />
      </Center>
    );
  }
  if (!storeExists && !isVisitor) {
    return <SetUpStore />;
  }

  return (
    <div className="w-screen overflow-y-scroll h-screen">
      <StoreCard isReview={isVisitor} id={storeId} />
      <Center className="mt-20">
        {/* <StoreChat store={storeId} /> */}
        <Socials isUser={true} userData={userData} />
      </Center>

      <Tabs
        size={"sm"}
        mt={2}
        colorScheme={"gray"}
        variant={"soft-rounded"}
        py={2}
      >
        <TabList
          border={""}
          className=" shadow-xl shadow-[rgba(0,0,0,0.05)]"
          py={2}
          bgColor={"white"}
          pos={"sticky"}
          top={0}
          pl={2}
        >
          {myTabs.map((tab, index) => (
            <Tab key={index}>
              {tab.tabIcon}
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels className=" bg-slate-100 h-[60vh]">
          {myTabs.map((tab, index) => (
            <TabPanel pl={0} key={index}>
              {!detail ? (
                <Center className="w-full h-full">
                  <Spinner />
                </Center>
              ) : (
                tab.tabPage
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default MyStore;
