import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { cartActions } from "@/store/cart";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);

  const addToCart = (productId: string, quantity: number = 1) => {
    dispatch(cartActions.addToCart({ productId, quantity }));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(cartActions.removeFromCart(itemId));
    } else {
      dispatch(cartActions.updateCart({ itemId, quantity }));
    }
  };

  const removeItem = (itemId: string) => {
    dispatch(cartActions.removeFromCart(itemId));
  };

  const clearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return {
    items: cart.items,
    subtotal: cart.subtotal,
    discount: cart.discount,
    total: cart.total,
    isLoading: cart.isLoading,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };
};
