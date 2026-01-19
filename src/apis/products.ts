import type { Product } from "@/types";

export interface ProductsQueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-low" | "price-high" | "featured";
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with 30-hour battery life",
    price: 2999,
    image: "https://picsum.photos/seed/prod1/300/300",
    category: "Electronics",
    stock: 45,
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Fitness tracker with heart rate monitor and GPS",
    price: 4999,
    image: "https://picsum.photos/seed/prod2/300/300",
    category: "Electronics",
    stock: 30,
  },
  {
    id: "3",
    name: "Leather Office Chair",
    description: "Ergonomic chair with lumbar support and adjustable height",
    price: 8999,
    image: "https://picsum.photos/seed/prod3/300/300",
    category: "Furniture",
    stock: 15,
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description: "Insulated bottle keeps drinks cold for 24 hours",
    price: 599,
    image: "https://picsum.photos/seed/prod4/300/300",
    category: "Home & Kitchen",
    stock: 100,
  },
  {
    id: "5",
    name: "Yoga Mat Premium",
    description: "Non-slip exercise mat with carrying strap",
    price: 1299,
    image: "https://picsum.photos/seed/prod5/300/300",
    category: "Sports",
    stock: 60,
  },
  {
    id: "6",
    name: "Mechanical Gaming Keyboard",
    description: "RGB backlit keyboard with mechanical switches",
    price: 3499,
    image: "https://picsum.photos/seed/prod6/300/300",
    category: "Electronics",
    stock: 25,
  },
  {
    id: "7",
    name: "Running Shoes Pro",
    description: "Lightweight running shoes with cushioned sole",
    price: 4299,
    image: "https://picsum.photos/seed/prod7/300/300",
    category: "Fashion",
    stock: 40,
  },
  {
    id: "8",
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with thermal carafe",
    price: 5999,
    image: "https://picsum.photos/seed/prod8/300/300",
    category: "Home & Kitchen",
    stock: 20,
  },
  {
    id: "9",
    name: "Backpack Travel Pro",
    description: "Water-resistant backpack with laptop compartment",
    price: 2499,
    image: "https://picsum.photos/seed/prod9/300/300",
    category: "Fashion",
    stock: 35,
  },
  {
    id: "10",
    name: "Desk Lamp LED",
    description: "Adjustable LED desk lamp with USB charging port",
    price: 1799,
    image: "https://picsum.photos/seed/prod10/300/300",
    category: "Home & Kitchen",
    stock: 50,
  },
  {
    id: "11",
    name: "Portable Power Bank 20000mAh",
    description: "High capacity power bank with fast charging",
    price: 1999,
    image: "https://picsum.photos/seed/prod11/300/300",
    category: "Electronics",
    stock: 70,
  },
  {
    id: "12",
    name: "Reading Glasses Blue Light",
    description: "Blue light blocking glasses for computer use",
    price: 899,
    image: "https://picsum.photos/seed/prod12/300/300",
    category: "Fashion",
    stock: 80,
  },
];

export const getProducts = async (
  params: ProductsQueryParams = {},
): Promise<ProductsResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...DUMMY_PRODUCTS];

  // Filter by category
  if (params.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }

  // Filter by price range
  if (params.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= params.maxPrice!);
  }

  // Sort
  if (params.sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (params.sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = filtered.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  };
};
