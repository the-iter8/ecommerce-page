import type { Product } from "@/types";
import { API_BASE_URL } from "@/config/api";
import qs from "qs";

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

interface BackendProductsResponse {
  success: boolean;
  data: {
    items: Product[];
    total: number;
    page?: number;
    totalPages?: number;
  };
}

interface BackendProductResponse {
  success: boolean;
  data: {
    product: Product;
  };
}

export const getProducts = async (
  params: ProductsQueryParams = {},
): Promise<ProductsResponse> => {
  const queryString = qs.stringify(params);
  const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const result: BackendProductsResponse = await response.json();

  if (!result.success) {
    throw new Error("Failed to fetch products");
  }

  return {
    items: result.data.items,
    total: result.data.total,
    page: result.data.page || params.page || 1,
    totalPages:
      result.data.totalPages ||
      Math.ceil(result.data.total / (params.limit || 12)),
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const url = `${API_BASE_URL}/products/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const result: BackendProductResponse = await response.json();

  if (!result.success) {
    throw new Error("Failed to fetch product");
  }

  return result.data.product;
};
