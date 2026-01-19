import type { CartItem, Product } from "@/types";
import { API_BASE_URL } from "@/config/api";
import { getProductById as fetchProductById } from "./products";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  itemId: string;
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
const transformCartResponse = async (
  backendItems: BackendCartItem[],
): Promise<CartItem[]> => {
  const cartItems: CartItem[] = [];

  for (const item of backendItems) {
    try {
      const product: Product = await fetchProductById(item.productId);
      cartItems.push({
        id: item.productId, // Using productId as cart item id
        productId: item.productId,
        quantity: item.quantity,
        product,
      });
    } catch (error) {
      console.error(`Failed to fetch product ${item.productId}:`, error);
    }
  }

  return cartItems;
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

    const items = await transformCartResponse(result.data.cart.items);
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

export const updateCartItem = async (
  payload: UpdateCartPayload,
): Promise<boolean> => {
  // Backend uses productId for removal/updates, itemId is the productId
  const url = `${API_BASE_URL}/cart/${CUSTOMER_ID}/items`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: payload.itemId, // itemId is actually the productId
      quantity: payload.quantity,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update cart: ${response.statusText}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to update cart");
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
