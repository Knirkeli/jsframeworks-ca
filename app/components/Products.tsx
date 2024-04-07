// "use client";
// import React from "react";
// import useFetch from "../hooks/useFetch/useFetchProducts";
// import Image from "next/image";
// import Link from "next/link";
// import { API_PRODUCTS } from "../Shared/api";

// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   description: string;
//   discountedPrice: number;
//   tags: string[];
//   image: {
//     url: string;
//     alt: string;
//   };
//   rating: number;
//   reviews: [
//     {
//       id: string;
//       username: string;
//       rating: number;
//       description: string;
//     }
//   ];
//   productsId: string;
// }

// export default function Products() {
//   const { data, isLoading, isError } = useFetch(API_PRODUCTS);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Ops something is wrong!</div>;
//   }

//   if (!data || data.data.length === 0) {
//     return <div>Fetching products...</div>;
//   }

//   return (
//     <div className="flex flex-wrap justify-center product_bubble">
//       {data.data.map((product: Product) => (
//         <div
//           key={product.id}
//           className="m-4 transform transition duration-500 ease-in-out"
//         >
//           <Link href={`/products/${product.id}`}>
//             <div className="bubble-card-content rounded-full border border-gray-300 shadow-lg overflow-hidden flex flex-col items-center justify-between p-4">
//               <h3 className="text-center text-xl wrap">{product.title}</h3>
//               <div className="w-55 h-55 rounded-full overflow-hidden">
//                 <Image
//                   src={product.image.url}
//                   alt={product.image.alt}
//                   width={400}
//                   height={400}
//                   objectFit="cover"
//                 />
//               </div>
//               <p className="text-center cursor-pointer">
//                 Rating: {product.rating}
//               </p>
//             </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/product"; // import the Product interface
import useProductStore from "../../store/cart"; // Import your Zustand store

export default function Products({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const { products, searchTerm, setProducts } = useProductStore((state) => ({
    products: state.products,
    searchTerm: state.searchTerm,
    setProducts: state.setProducts,
  }));

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts, setProducts]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center product_bubble">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="m-4 transform transition duration-500 ease-in-out"
          >
            <Link href={`/products/${product.id}`}>
              <div className="bubble-card-content rounded-full border border-gray-300 shadow-lg overflow-hidden flex flex-col items-center justify-between p-4">
                <h3 className="text-center text-xl wrap">{product.title}</h3>
                <div className="w-55 h-55 rounded-full overflow-hidden">
                  <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    width={400}
                    height={400}
                    objectFit="cover"
                  />
                </div>
                <p className="text-center cursor-pointer">
                  Rating: {product.rating}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
