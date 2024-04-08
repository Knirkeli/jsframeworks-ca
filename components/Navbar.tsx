"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import useProductStore, { State } from "../store/cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
  { name: "Cart", href: "/cart" },
];

export default function Navbar() {
  const pathname = usePathname();
  const getTotalNumberOfItemsInCart = useProductStore(
    (state) => (state as State).getTotalNumberOfItemsInCart
  );
  const [totalItems, setTotalItems] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTotalItems(getTotalNumberOfItemsInCart()); // Call the function when the component updates
  }, []);

  useEffect(() => {
    const unsubscribe = useProductStore.subscribe(() => {
      setTotalItems(getTotalNumberOfItemsInCart());
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [getTotalNumberOfItemsInCart]);

  return (
    <header className="mb-8 border-b">
      <div className="flex items center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="flex items-center text-2xl md:text-4xl font-bold mt-auto">
            <img
              src="/BClogo.png"
              alt="Logo"
              className="bg-blue-300 max-h-20 max-w-20 mr-2"
            />
            Bubble <span className="text-blue-500">Commerce</span>
          </h1>
        </Link>
        <nav className="flex gap-12 lg:flex 2xl:ml-16 mt-auto">
          {links.map((link, idx) => (
            <div
              key={idx}
              className={
                idx === 0 || idx === links.length - 1
                  ? "hidden lg:flex"
                  : "flex"
              }
            >
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-grey-600 transition duration-100 hover:text-blue-500"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="flex divide-x border-r sm:border-l">
          <Link href="/cart">
            <Button
              variant={"default"}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-34 md:w-24 round"
            >
              <ShoppingCart />
              <span className="text-xs font-semibold sm:block">
                Cart {isClient ? `(${totalItems})` : ""}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
