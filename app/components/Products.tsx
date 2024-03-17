"use client";
import React from "react";
import useFetch from "../hooks/useFetch/useFetchProducts";
import { API_PRODUCTS } from "../Shared/api";
import Image from "next/image";
import "./styles/products.css";
import Link from "next/link";

export default function Products() {
  const { data, isLoading, isError } = useFetch(API_PRODUCTS);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching products</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data.data.map((product) => (
        <div
          key={product.id}
          className="m-4 transform transition duration-500 ease-in-out"
        >
          <Link href={`./Product.tsx/${product.slug}`}>
            <div className="bubble-card-content rounded-full border border-gray-300 shadow-lg overflow-hidden flex flex-col items-center justify-between p-4">
              <h3 className="text-center text-xl curve-text">
                {product.title}
              </h3>
              <div className="w-55 h-55 rounded-full overflow-hidden">
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  width={400} // adjust as needed
                  height={400} // adjust as needed
                  objectFit="cover"
                />
              </div>
              <p className="text-center">{product.price}</p>
              <p className="text-center cursor-pointer">
                Rating: {product.rating}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
