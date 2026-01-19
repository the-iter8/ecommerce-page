import type { Order } from "@/types";
import { httpHandler, RequestType, responseStatus } from "@/utils/network";
import { API_BASE_URL } from "@/config/api";

export interface CheckoutPayload {
  discountCode?: string;
}

export interface CheckoutResponse {
  order: Order;
  generatedDiscountCode?: string;
}

const CUSTOMER_ID = "customer123";

export const checkout = async (
  payload: CheckoutPayload,
): Promise<CheckoutResponse> => {
  const response = await httpHandler(
    `${API_BASE_URL}/orders/${CUSTOMER_ID}/checkout`,
    RequestType.POST,
    undefined,
    payload,
  );

  if (response.status === responseStatus.SUCCESS) {
    const data = response.data as {
      order: Order;
      generatedDiscountCode?: string;
    };
    return {
      order: data.order,
      generatedDiscountCode: data.generatedDiscountCode,
    };
  }

  throw new Error(response.message || "Failed to checkout");
};
