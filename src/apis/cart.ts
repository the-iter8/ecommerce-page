import type { CartItem, Product } from "@/types";

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

// In-memory cart storage (simulates backend)
let cartStorage: CartItem[] = [];
let cartIdCounter = 1;

// Simulate getting product data (in real app, would be from products API)
const getProductById = (productId: string): Product | null => {
  // This would normally come from products store or API
  // For now, returning mock data
  return {
    id: productId,
    name: "Product",
    description: "Description",
    price: 1000,
    image: "https://picsum.photos/seed/prod/300/300",
    category: "Electronics",
    stock: 10,
  };
};

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discount = 0; // Will be calculated based on discount code
  const total = subtotal - discount;
  return { subtotal, discount, total };
};

export const getCart = async (): Promise<CartResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const { subtotal, discount, total } = calculateTotals(cartStorage);

  return {
    items: [...cartStorage],
    subtotal,
    discount,
    total,
  };
};

export const addToCart = async (
  payload: AddToCartPayload,
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const existingItem = cartStorage.find(
    (item) => item.productId === payload.productId,
  );

  if (existingItem) {
    existingItem.quantity += payload.quantity;
  } else {
    const product = getProductById(payload.productId);
    if (product) {
      cartStorage.push({
        id: `cart-${cartIdCounter++}`,
        productId: payload.productId,
        quantity: payload.quantity,
        product,
      });
    }
  }

  return true;
};

export const updateCartItem = async (
  payload: UpdateCartPayload,
): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const item = cartStorage.find((i) => i.id === payload.itemId);
  if (item) {
    item.quantity = payload.quantity;
  }

  return true;
};

export const removeFromCart = async (itemId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  cartStorage = cartStorage.filter((item) => item.id !== itemId);

  return true;
};
