// import React from 'react';

// export default function Products() {
//     const products = Array(10).fill({
//         title: 'Bubble',
//         image: '/hero.jpg',
//         price: '100 kr',
//     });

//     return (
//         <div className="products-container">
//             {products.map((product, index) => (
//                 <div key={index} className="bubble-card">
//                     <div className="bubble-card-content">
//                         <h3>{product.title}</h3>
//                         <img src={product.image} alt={product.title} className="bubble-background" />
//                         <p>{product.price}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

import React from 'react';

export default function Products() {
    const products = Array(10).fill({
        title: 'Bubble',
        image: '/hero.jpg',
        price: '100 kr',
    });

    return (
        <div className="flex flex-wrap justify-center">
            {products.map((product, index) => (
                <div key={index} className="m-4">
                    <div className="bubble-card-content rounded-full border border-gray-300 shadow-lg overflow-hidden w-64 h-64 flex flex-col items-center justify-between p-4">
                        <h3 className="text-center text-xl">{product.title}</h3>
                        <img src={product.image} alt={product.title} className="bubble-background absolute w-full h-full object-cover rounded-full" />
                        <p className="text-center">{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}