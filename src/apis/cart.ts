import type { CartItem } from "@/types";
import { API_BASE_URL } from "@/config/api";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

// Default customer ID (in real app, this would come from auth)
const CUSTOMER_ID = "customer123";

interface BackendCartItem {
  productId: string;
  quantity: number;
  priceSnapshot: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productCategory: string;
}

interface BackendCartResponse {
  success: boolean;
  data: {
    cart: {
      id: string;
      customerId: string;
      items: BackendCartItem[];
      totalAmount: number;
      createdAt: number;
      updatedAt?: number;
    };
  };
}

// Helper to transform backend cart to frontend format
const transformCartResponse = (backendItems: BackendCartItem[]): CartItem[] => {
  return backendItems.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    priceSnapshot: item.priceSnapshot,
    productName: item.productName,
    productDescription: item.productDescription,
    productImage: item.productImage,
    productCategory: item.productCategory,
  }));
};

export const getCart = async (): Promise<CartResponse> => {
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      // Cart doesn't exist yet
      return {
        items: [],
        subtotal: 0,
        discount: 0,
        total: 0,
      };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    const result: BackendCartResponse = await response.json();

    if (!result.success) {
      throw new Error("Failed to fetch cart");
    }

    const items = transformCartResponse(result.data.cart.items);
    const subtotal = result.data.cart.totalAmount;
    const discount = 0;
    const total = subtotal - discount;

    return {
      items,
      subtotal,
      discount,
      total,
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (
  payload: AddToCartPayload,
): Promise<boolean> => {
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}/items`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: payload.productId,
      quantity: payload.quantity,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add to cart: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to add to cart");
  }

  return true;
};

export const removeFromCart = async (itemId: string): Promise<boolean> => {
  // itemId is the productId
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}/items/${itemId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to remove from cart: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to remove from cart");
  }

  return true;
};

export const incrementCartItem = async (itemId: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}/items/${itemId}/increment`;

  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to increment item: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to increment item");
  }

  return true;
};

export const decrementCartItem = async (itemId: string): Promise<boolean> => {
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}/items/${itemId}/decrement`;

  const response = await fetch(url, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to decrement item: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to decrement item");
  }

  return true;
};

export const clearCart = async (): Promise<boolean> => {
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to clear cart: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to clear cart");
  }

  return true;
};
