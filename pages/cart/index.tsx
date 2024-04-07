// import React from "react";
// import useProductStore from "../../store/cart"; // Import the store
// import Image from "next/image";
// import Link from "next/link";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import "../../app/globals.css";
// import { Product } from "../../types/product"; // import the Product interface

// function CartPage() {
//   const cart = useProductStore((state) => state.cart); // Get the cart from the store
//   const clearCart = useProductStore((state) => state.clearCart); // Get the clearCart action from the store
//   const checkout = useProductStore((state) => state.checkout); // Get the checkout action from the store

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <Navbar />
//       <div className="flex flex-col w-full p-4">
//         {cart.length === 0 ? (
//           <p className="text-center text-xl">Your cart is empty</p>
//         ) : (
//           cart.map((product: Product) => (
//             <div
//               key={product.id}
//               className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded"
//             >
//               <Image
//                 src={product.image.url}
//                 alt={product.image.alt}
//                 width={50}
//                 height={50}
//               />
//               <h2 className="text-lg">{product.title}</h2>
//               <p>Quantity: {product.quantity}</p>
//               <p>Price: {product.price}</p>
//             </div>
//           ))
//         )}
//         <button
//           onClick={clearCart}
//           className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
//         >
//           Clear Cart
//         </button>
//         <button
//           onClick={checkout}
//           className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
//         >
//           Buy Now
//         </button>
//       </div>
//       <Footer />
//     </div>
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
  const checkout = useProductStore((state) => state.checkout);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col w-full p-4">
          {cart.length === 0 ? (
            <>
              <p className="text-center text-xl">Your cart is empty</p>
              <Link href="/">
                <Button
                  variant="default"
                  className="px-4 py-2 mt-2 bg-blue-500 rounded hover:bg-blue-600"
                >
                  Shop More
                </Button>
              </Link>
            </>
          ) : (
            <>
              {cart.map((product: Product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded"
                >
                  <Image
                    src={product.image.url}
                    alt={product.image.alt}
                    width={50}
                    height={50}
                  />
                  <h2 className="text-lg">{product.title}</h2>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: {product.price}</p>
                </div>
              ))}
              <Button
                onClick={clearCart}
                variant="default"
                className="px-4 py-2 mt-2 bg-red-500 rounded hover:bg-red-600"
              >
                Clear Cart
              </Button>
              <Link href="/success">
                <Button
                  onClick={checkout}
                  variant="default"
                  className="px-4 py-2 mt-2 bg-green-500 rounded hover:bg-green-600"
                >
                  Buy Now
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
