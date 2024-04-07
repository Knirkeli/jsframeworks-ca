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