import type { Order } from "@/types";

export interface CheckoutPayload {
  discountCode?: string;
}

export interface CheckoutResponse {
  order: Order;
  discountCodeGenerated?: string;
}

export const checkout = async (
  _payload: CheckoutPayload,
): Promise<CheckoutResponse> => {
  return {} as CheckoutResponse;
};
