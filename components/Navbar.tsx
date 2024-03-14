// "use client";

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Button } from './ui/button';
// import {ShoppingBag, ShoppingCart} from 'lucide-react'

// const links = [
//     {name: "Home", href: "/"},
//     {name: "Sale", href: "/Sale"},
//     {name: "Contact", href: "/Contact"},
//     {name: "About", href: "/About"},
//     {name: "Cart", href: "/Cart"},
// ];

// export default function Navbar() {
//     const pathname = usePathname();
//     return (
//     <header className="mb-8 border-b">
//         <div className="flex items center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
//             <Link href="/">
//                 <h1 className="text-2xl md:text-4xl font-bold mt-auto">
//                     Bubble <span className="text-blue-500">Commerce</span>
//                 </h1>
//             </Link>
//             <nav className='hidden gap-12 lg:flex 2xl:ml-16 mt-auto'>
//                 {links.map((link, idx) => (
//                     <div key={idx}>
//                         {pathname === link.href ? (
//                             <Link className="text-lg font-semibold text-primary" href={link.href}>
//                                 {link.name}
//                             </Link>
//                         ): (
//                             <Link href={link.href} className="text-lg font-semibold text-grey-600 transition duration-100 hover:text-blue-500">
//                             {link.name}
//                         </Link>
//                         )}
//                     </div>
//                 ))}
//             </nav>
//             <div className="flex divide-x border-r sm:border-l">
//                 <Button variant={"default"} className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-34 md:w-24 round">
//                     <ShoppingCart />
//                     <span className="hidden text-xs font-semibold sm:block">Cart</span>
//                 </Button>

//             </div>

//         </div>
//     </header>
//     );
// }

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import {ShoppingBag, ShoppingCart} from 'lucide-react'

const links = [
    {name: "Home", href: "/"},
    {name: "Sale", href: "/Sale"},
    {name: "Contact", href: "/Contact"},
    {name: "About", href: "/About"},
    {name: "Cart", href: "/Cart"},
];

export default function Navbar() {
    const pathname = usePathname();
    return (
    <header className="mb-8 border-b">
        <div className="flex items center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
            <Link href="/">
                <h1 className="flex items-center text-2xl md:text-4xl font-bold mt-auto">
                    <img  src="/BClogo.png" alt="Logo" className="bg-blue-300 max-h-20 max-w-20 mr-2" />
                    Bubble <span className="text-blue-500">Commerce</span>
                </h1>
            </Link>
            <nav className='hidden gap-12 lg:flex 2xl:ml-16 mt-auto'>
                {links.map((link, idx) => (
                    <div key={idx}>
                        {pathname === link.href ? (
                            <Link className="text-lg font-semibold text-primary" href={link.href}>
                                {link.name}
                            </Link>
                        ): (
                            <Link href={link.href} className="text-lg font-semibold text-grey-600 transition duration-100 hover:text-blue-500">
                            {link.name}
                        </Link>
                        )}
                    </div>
                ))}
            </nav>
            <div className="flex divide-x border-r sm:border-l">
                <Button variant={"default"} className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-34 md:w-24 round">
                    <ShoppingCart />
                    <span className="hidden text-xs font-semibold sm:block">Cart</span>
                </Button>

            </div>

        </div>
    </header>
    );
}