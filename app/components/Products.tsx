// "use client";
// import React from "react";
// import useFetch from "../hooks/useFetch/useFetchProducts";
// import Image from "next/image";
// import Link from "next/link";
// import { API_PRODUCTS } from "../Shared/api";
// import { Product } from "../../types/product";
// import useProductStore from "../../store/cart";
// import "../../app/globals.css";

// export default function Products() {
//   const { data, isLoading, isError } = useFetch(API_PRODUCTS);
//   const { searchTerm, setProducts } = useProductStore((state) => ({
//     searchTerm: state.searchTerm,
//     setProducts: state.setProducts,
//   }));

//   React.useEffect(() => {
//     if (data && data.data) {
//       setProducts(data.data);
//     }
//   }, [data, setProducts]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Ops something is wrong!</div>;
//   }

//   if (!data || data.data.length === 0) {
//     return <div>Fetching products...</div>;
//   }

//   const filteredProducts = data.data.filter((product: Product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <div className="flex flex-wrap justify-center product_bubble">
//         {filteredProducts.map((product: Product) => (
//           <div
//             key={product.id}
//             className="m-4 transform transition duration-500 ease-in-out"
//           >
//             <Link href={`/products/${product.id}`}>
//               <div className="bubble-card-content rounded-full shadow-lg flex flex-col items-center justify-between p-4 hover:text-blue-500">
//                 <h3 className="text-center text-2xl wrap">{product.title}</h3>
//                 <div className="w-55 h-55 rounded-full overflow-hidden">
//                   <Image
//                     src={product.image.url}
//                     alt={product.image.alt}
//                     width={400}
//                     height={400}
//                     objectFit="cover"
//                   />
//                 </div>
//                 <p className="text-center cursor-pointer">{product.price} KR</p>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

"use client";
import React from "react";
import useFetch from "../hooks/useFetch/useFetchProducts";
import Image from "next/image";
import Link from "next/link";
import { API_PRODUCTS } from "../Shared/api";
import { Product, calculateDiscountedPrice } from "../../types/product";
import useProductStore from "../../store/cart";
import "../../app/globals.css";

export default function Products() {
  const { data, isLoading, isError } = useFetch(API_PRODUCTS);
  const { searchTerm, setProducts } = useProductStore((state) => ({
    searchTerm: state.searchTerm,
    setProducts: state.setProducts,
  }));

  React.useEffect(() => {
    if (data && data.data) {
      setProducts(data.data);
    }
  }, [data, setProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Ops something is wrong!</div>;
  }

  if (!data || data.data.length === 0) {
    return <div>Fetching products...</div>;
  }

  const filteredProducts = data.data.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-wrap justify-center product_bubble">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="m-4 transform transition duration-500 ease-in-out"
          >
            <Link href={`/products/${product.id}`}>
              <div className="bubble-card-content rounded-full shadow-lg flex flex-col items-center justify-between p-4 hover:text-blue-500">
                <h3 className="text-center text-2xl wrap">{product.title}</h3>
                {product.discountedPrice &&
                  calculateDiscountedPrice(product) !== "0%" && (
                    <div className="discount-banner">
                      {calculateDiscountedPrice(product)}
                    </div>
                  )}
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
                  {product.discountedPrice
                    ? product.discountedPrice
                    : product.price}{" "}
                  KR
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
