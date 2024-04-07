"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingBag, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl py-4">
        <div className="flex items-center">
          <img
            src="/BClogo.png"
            alt="Logo"
            className="bg-blue-300 max-h-20 max-w-20 mr-2"
          />
          <h1 className="text-lg">Bubble Commerce</h1>
        </div>
        <p className="text-sm">&copy; Knirkefri Design</p>
      </div>
    </footer>
  );
}
