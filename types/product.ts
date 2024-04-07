export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  discountedPrice: number;
  tags: string[];
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  reviews: [
    {
      id: string;
      username: string;
      rating: number;
      description: string;
    }
  ];
  productsId: string;
  quantity: number;
}

export function calculateDiscountedPrice(product: Product) {
return product.discountedPrice && product.price
  ? ((100 - (product.discountedPrice / product.price) * 100).toFixed(0) + '%')
  : '0%';
}