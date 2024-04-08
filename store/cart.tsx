"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_PRODUCTS } from "../app/Shared/api";
import { Product } from "../types/product";

export interface State {
  products: Product[];
  cart: Product[];
  searchTerm: string;
  fetchProducts: () => Promise<void>;
  setProducts: (products: Product[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  addToCart: (product: Product) => void;
  clearCart: () => void;
  deleteProductFromCart: (id: string) => void;
  getCartTotal: () => number;
  getTotalNumberOfItemsInCart: () => number;
  deleteSingleProductFromCart: (id: string) => void;
  addSingleProductToCart: (id: string) => void;
  logCart: () => void;
}

const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      searchTerm: "",
      fetchProducts: async () => {
        const response = await fetch(API_PRODUCTS);
        const json = await response.json();
        set((state: State) => ({ ...state, products: json.data }));
      },
      setProducts: (products: Product[]) =>
        set((state: State) => ({ ...state, products })),
      setSearchTerm: (searchTerm: string) =>
        set((state: State) => ({ ...state, searchTerm })),
      addToCart: (product: Product) => {
        set((state: State) => {
          const productInCartIndex = state.cart.findIndex(
            (cartItem) => cartItem.id === product.id
          );

          if (productInCartIndex === -1) {
            product.quantity = 1;
            return { ...state, cart: [...state.cart, product] };
          }

          const updatedCart = [...state.cart];
          updatedCart[productInCartIndex].quantity += 1;
          return { ...state, cart: updatedCart };
        });
      },

      clearCart: () => set((state: State) => ({ ...state, cart: [] })),
      deleteProductFromCart: (id: string) =>
        set((state: State) => {
          const updatedCart = state.cart.filter((product: Product) => {
            if (product.id === id) {
              return false;
            }
            return true;
          });
          return { ...state, cart: updatedCart };
        }),
      getCartTotal: () =>
        (get() as State).cart.reduce((total: number, product: Product) => {
          const currentPrice = product.quantity * product.price;
          total += currentPrice;
          return total;
        }, 0),
      getTotalNumberOfItemsInCart: () =>
        (get() as State).cart.reduce((total: number, product: Product) => {
          total += product.quantity;
          return total;
        }, 0),
      deleteSingleProductFromCart: (id: string) =>
        set((state: State) => {
          const productInCartIndex = state.cart.findIndex(
            (currentProduct: Product) => id === currentProduct.id
          );
          if (state.cart[productInCartIndex].quantity > 1) {
            state.cart[productInCartIndex].quantity -= 1;
            return { ...state, cart: [...state.cart] };
          }
          const updatedCart = state.cart.filter((product: Product) => {
            if (product.id === id) {
              return false;
            }
            return true;
          });
          return { ...state, cart: updatedCart };
        }),
      addSingleProductToCart: (id: string) =>
        set((state: State) => {
          const productInCartIndex = state.cart.findIndex(
            (currentProduct: Product) => id === currentProduct.id
          );
          state.cart[productInCartIndex].quantity += 1;
          return { ...state, cart: [...state.cart] };
        }),
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useProductStore;
