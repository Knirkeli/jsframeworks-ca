// import React from "react";
// import { useState } from "react";
// import { Product } from "../../app/components/Products";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import "../../app/globals.css";

// interface ProductPageProps {
//   product: Product;
// }

// const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
//   const [productData, setProductData] = useState(product);

//   console.log("productData:", productData);

//   if (!productData || !productData.data) {
//     return (
//       <div>
//         <Navbar />
//         <div>
//           No product data available. Please check the product ID or your fetch
//           URL.
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const { data } = productData;

//   return (
//     <div>
//       <Navbar />
//       <div>
//         <h1>{data.title}</h1>
//         {data.image && <img src={data.image.url} alt={data.image.alt} />}
//         <p>Price: {data.price}</p>
//         <p>Rating: {data.rating}</p>
//         <h2>Reviews:</h2>
//         {data.reviews &&
//           data.reviews.map((review, index) => (
//             <div key={index}>
//               <h4>{review.username}</h4>
//               <p>{review.description}</p>
//             </div>
//           ))}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export async function getServerSideProps(context) {
//   const { id } = context.params;
//   let product = null;

//   try {
//     const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
//     if (res.ok) {
//       product = await res.json();
//     } else {
//       console.error("Failed to fetch product:", res.status, res.statusText);
//     }
//   } catch (error) {
//     console.error("Failed to fetch product:", error);
//   }

//   return {
//     props: { product }, // will be passed to the page component as props
//   };
// }

// export default ProductPage;
import React, { useState, useEffect } from "react";
import { Product } from "../../app/components/Products";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../app/globals.css";
import useProductStore from "../../store/cart"; // Import the store
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [productData, setProductData] = useState(product);
  const addToCart = useProductStore((state) => state.addToCart);
  const logCart = useProductStore((state) => state.logCart);
  const getTotalNumberOfItemsInCart = useProductStore(
    (state) => state.getTotalNumberOfItemsInCart
  );
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(getTotalNumberOfItemsInCart());
  }, []); // Run this function when the component mounts

  useEffect(() => {
    const unsubscribe = useProductStore.subscribe(
      () => {
        setTotalItems(getTotalNumberOfItemsInCart());
      },
      (state: { cart: any }) => state.cart // Listen for changes in the cart state
    );

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [getTotalNumberOfItemsInCart]);

  console.log("productData:", productData);

  if (!productData || !productData.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Navbar />
        <div className="text-lg text-center text-red-500">
          No product data available. Please check the product ID or your fetch
          URL.
        </div>
        <Footer />
      </div>
    );
  }

  const { data } = productData;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col md:flex-row p-6 bg-white shadow-md rounded-lg">
          {data.image && (
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <Image
                className="object-cover object-center rounded-full"
                src={data.image.url}
                alt={data.image.alt}
                width={500}
                height={500}
              />
            </div>
          )}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
            <p className="mb-2 text-2xl">Price: {data.price}</p>
            <div className="p-4 bg-white shadow-lg rounded-lg mb-4">
              <p className="mb-2">
                Rating: {data.rating ? `${data.rating}/6` : "Not rated yet"}
              </p>
              <h2 className="text-xl font-bold mb-2">Reviews:</h2>
              {data.reviews && data.reviews.length > 0 ? (
                data.reviews.map((review, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-bold">{review.username}</h4>
                    <p>{review.description}</p>
                  </div>
                ))
              ) : (
                <p>
                  I'm new and have not been reviewed yet. Feel free to leave a
                  review when you have received me.
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button
                variant={"outline"}
                onClick={() => {
                  addToCart(data);
                  logCart();
                }}
              >
                Add to cart
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>{" "}
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  let product = null;

  try {
    const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
    if (res.ok) {
      product = await res.json();
    } else {
      console.error("Failed to fetch product:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  return {
    props: { product }, // will be passed to the page component as props
  };
}

export default ProductPage;
