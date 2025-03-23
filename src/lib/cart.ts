import { CartItem } from "@/redux/features/cart/cartSlice";

export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};
export const delaviryFee = 5;

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity;
};

export const getSupTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItems) => {
    const extraPrice = cartItems.extra?.reduce(
      (sum, extra) => sum + (extra.price || 0),
      0
    );

    const totalItems =
      cartItems.basePrise + (extraPrice || 0) + (cartItems.size?.price || 0);

    return totalItems + total * cartItems.quantity!;
  }, 0);
};

export const getTotalAmount = (cart: CartItem[]) => {
  return getSupTotal(cart) + delaviryFee;
};
