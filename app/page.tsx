import Image from "next/image";
import Hero from "./components/Hero";
import React from "react";
import Products from "./components/Products";
// import Product from "./product/[id]/page";
import Search from "./components/Search";
export default function Home() {
  return (
    <>
      <Hero />
      <Search />
      <Products />
    </>
  );
}
