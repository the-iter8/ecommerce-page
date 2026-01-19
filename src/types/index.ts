export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  priceSnapshot: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productCategory: string;
}

export interface DiscountCode {
  code: string;
  isUsed: boolean;
  generatedAtOrderNumber: number;
  discountPercent: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  discountCode?: string;
  createdAt: number;
}

export interface AdminConfig {
  nthOrderValue: number;
  totalOrderCount: number;
  discountPercent: number;
  canGenerateDiscount: boolean;
}

export interface GeneratedDiscountCode {
  code: string;
  discountPercent: number;
}

export interface AdminStats {
  totalOrders: number;
  totalItemsPurchased: number;
  totalPurchaseAmount: number;
  totalDiscountAmount: number;
  discountCodes: DiscountCode[];
}
