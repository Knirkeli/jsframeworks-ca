// import React from "react";
// import useProductStore from "../../store/cart";
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import "../../app/globals.css";
// import { Product } from "../../types/product";
// import { Button } from "../../components/ui/button";

// function CartPage() {
//   const cart = useProductStore((state) => state.cart);
//   const clearCart = useProductStore((state) => state.clearCart);
//   const checkout = useProductStore((state) => state.checkout);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <div className="flex flex-col w-full p-4">
//           {cart.length === 0 ? (
//             <div className="text-center space-y-4">
//               <p className="text-xl">Your cart is empty</p>
//               <Link href="/">
//                 <Button
//                   variant="default"
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                   Shop More
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cart.map((product: Product) => (
//                 <div
//                   key={product.id}
//                   className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg space-x-4"
//                 >
//                   <Image
//                     className="rounded-full"
//                     src={product.image.url}
//                     alt={product.image.alt}
//                     width={50}
//                     height={50}
//                   />
//                   <h2 className="text-lg flex-grow">{product.title}</h2>
//                   <p>Quantity: {product.quantity}</p>
//                   <p>Price: {product.price}</p>
//                 </div>
//               ))}
//               <div className="flex justify-between space-x-4">
//                 <Button
//                   onClick={clearCart}
//                   variant="default"
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Clear Cart
//                 </Button>
//                 <Link href="/success">
//                   <Button
//                     onClick={checkout}
//                     variant="default"
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Buy Now
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default CartPage;

import React from "react";
import useProductStore from "../../store/cart";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../app/globals.css";
import { Product } from "../../types/product";
import { Button } from "../../components/ui/button";

function CartPage() {
  const cart = useProductStore((state) => state.cart);
  const clearCart = useProductStore((state) => state.clearCart);

  const totalCost = cart
    .reduce((total, product) => {
      const price = product.discountedPrice || product.price;
      return total + price * product.quantity;
    }, 0)
    .toFixed(2);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col w-full p-4 max-w-2xl mx-auto">
          {cart.length === 0 ? (
            <div className="text-center space-y-4">
              <p className="text-xl">Your cart is empty</p>
              <Link href="/">
                <Button variant="outline">Shop More</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((product: Product) => {
                const price = product.discountedPrice || product.price;
                const totalProductPrice = price * product.quantity;
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg space-x-4 border border-gray-200"
                  >
                    <Image
                      className="rounded-full"
                      src={product.image.url}
                      alt={product.image.alt}
                      width={100}
                      height={100}
                    />
                    <h2 className="text-lg flex-grow">{product.title}</h2>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {totalProductPrice}</p>
                  </div>
                );
              })}
              <p className="border border-gray-200 text-2xl">
                Cart total: {totalCost} NOK
              </p>
              <div className="flex justify-between space-x-4 mt-4">
                <Button onClick={clearCart} variant="outline">
                  Clear Cart
                </Button>
                <Link href="/success">
                  <Button onClick={clearCart} variant="outline">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
