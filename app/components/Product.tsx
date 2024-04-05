// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Product() {
//   const router = useRouter();
//   const [product, setProduct] = useState(null);
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`/online-shop/${id}`)
//         .then((response) => setProduct(response.data.data))
//         .catch((error) => console.error(error));
//     }
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }
//   console.log(product);
//   // Render the product data...
// }
