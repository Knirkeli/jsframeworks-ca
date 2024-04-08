// Import necessary modules and components
import React, { useState, useEffect } from "react";
import Product from "../../app/components/Products";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../app/globals.css";
import useProductStore, { State } from "../../store/cart";
import { Button } from "@/components/ui/button";

// Define the props for the ProductPage component
interface ProductPageProps {
  product: typeof Product;
}

// Define the ProductPage component
const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  // Define state variables
  const [productData, setProductData] = useState(product);
  const [totalItems, setTotalItems] = useState(0);

  // Define functions from the product store
  const addToCart = useProductStore((state) => (state as State).addToCart);
  const getTotalNumberOfItemsInCart = useProductStore(
    (state) => (state as State).getTotalNumberOfItemsInCart
  );

  // Use an effect to set the total items when the component mounts
  useEffect(() => {
    setTotalItems(getTotalNumberOfItemsInCart());
  }, [getTotalNumberOfItemsInCart]);

  // Use an effect to update the total items when the cart changes
  useEffect(() => {
    const unsubscribe = useProductStore.subscribe(() => {
      setTotalItems(getTotalNumberOfItemsInCart());
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [getTotalNumberOfItemsInCart]);

  // Log the product data
  console.log("productData:", productData);

  // Render a message if there is no product data
  let data: any = null;
  if (productData && "data" in productData) {
    data = productData.data;
  }

  // Destructure the data from the product data
  // const { data } = productData as { data: any };

  // Render the product page
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
                width={300}
                height={300}
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
                data.reviews.map((review: any, index: number) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-lg font-bold">{review.username}</h4>
                    <p>{review.description}</p>
                  </div>
                ))
              ) : (
                <p>
                  I&apos;m new and have not been reviewed yet. Feel free to
                  leave a review when you have received me.
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button
                variant={"outline"}
                onClick={() => {
                  addToCart(data);
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Define the getServerSideProps function to fetch the product data
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let id = null;
  if (context.params) {
    const { id: productId } = context.params;
    id = productId;
  }

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

  // Return the product data as props
  return {
    props: { product },
  };
}

// Export the ProductPage component as default
export default ProductPage;
