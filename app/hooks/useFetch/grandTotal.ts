import useProductStore from "@/store/cart";
import shippingTotal from "./shippingTotal";

const useGrandTotal = () => {
  const { getCartTotal } = useProductStore();
  const grandTotal = getCartTotal() + shippingTotal();

  return grandTotal;
};

export default useGrandTotal
