import type { CartItem } from "@/types";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  itemId: string;
  quantity: number;
}

export const getCart = async (): Promise<CartItem[]> => {
  return [];
};

export const addToCart = async (
  _payload: AddToCartPayload,
): Promise<CartItem> => {
  return {} as CartItem;
};

export const updateCartItem = async (
  _payload: UpdateCartPayload,
): Promise<CartItem> => {
  return {} as CartItem;
};

export const removeFromCart = async (_itemId: string): Promise<void> => {
  return;
};
