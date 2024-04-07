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

import React from "react";
import { useState } from "react";
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
  const addToCart = useProductStore((state) => state.addToCart); // Get the addToCart function from the store
  const logCart = useProductStore((state) => state.logCart); // Get the logCart function from the store

  console.log("productData:", productData);

  if (!productData || !productData.data) {
    return (
      <div>
        <Navbar />
        <div>
          No product data available. Please check the product ID or your fetch
          URL.
        </div>
        <Footer />
      </div>
    );
  }

  const { data } = productData;

  return (
    <div>
      <Navbar />
      <div>
        <h1>{data.title}</h1>
        {data.image && <img src={data.image.url} alt={data.image.alt} />}
        <p>Price: {data.price}</p>
        <p>Rating: {data.rating}</p>
        <h2>Reviews:</h2>
        {data.reviews &&
          data.reviews.map((review, index) => (
            <div key={index}>
              <h4>{review.username}</h4>
              <p>{review.description}</p>
            </div>
          ))}
        <Button
          onClick={() => {
            addToCart(data);
            logCart();
          }}
        >
          Add to cart
        </Button>{" "}
      </div>
      <Footer />
    </div>
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
