import Masonry from "react-masonry-css";
import ProductItem from "./Components/ProductItem";
import React, { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

function HotProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 50;

  const fetchProducts = async (page) => {
    setLoading(true);
    const collectionRef = collection(db, "stores");
    const q = query(collectionRef);

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    try {
      const querySnapshot = await getDocs(q);
      const allProducts = [];

      querySnapshot.forEach((doc) => {
        const store = doc.data();
        if (store.products) {
          allProducts.push(...store.products);
        }
      });

      const paginatedProducts = allProducts.slice(start, end);
      setProducts(paginatedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2,
  };

  if (loading) {
    return (
      <Center className=" h-[70vh] w-screen">
        <Spinner />
      </Center>
    );
  }

  return (
    <div className="w-full h-screen">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid py-2 h-fit w-screen mt-[-10px]"
        columnClassName="my-masonry-grid_column"
      >
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </Masonry>

      {/* Pagination controls */}
      {products.length > productsPerPage && (
        <div className="text-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 p-2 bg-gray-300 rounded"
          >
            Previous Page
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="mx-2 p-2 bg-gray-300 rounded"
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}

export default HotProducts;
