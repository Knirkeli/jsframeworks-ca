import useProductStore from "@/store/cart";

const useShippingTotal = () => {
  const { getCartTotal } = useProductStore();
  const shipping = getCartTotal() / 100;

  return shipping;
};

export default useShippingTotal;
