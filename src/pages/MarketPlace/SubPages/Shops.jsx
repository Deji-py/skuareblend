import React, { useEffect, useState } from "react";
import ShopCard from "./Components/ShopCard";
import { VStack } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Fetch shop data from Firestore
    const fetchShops = async () => {
      const shopCollectionRef = collection(db, "stores");
      const querySnapshot = await getDocs(shopCollectionRef);

      const shopDetails = [];
      querySnapshot.forEach((doc) => {
        const shopData = doc.data();
        shopDetails.push(shopData);
      });

      setShops(shopDetails);
    };

    fetchShops();
  }, []);

  return (
    <VStack className="px-2 gap-2 h-screen w-screen">
      {shops.map((shop, index) => (
        <ShopCard
          key={index}
          shop={shop} // Modify this to match your shop data structure
          // You can pass other shop-related data here, e.g., shop name, description, etc.
        />
      ))}
    </VStack>
  );
}

export default Shops;
