import type { AdminStats, AdminConfig, GeneratedDiscountCode } from "@/types";
import { httpHandler, RequestType, responseStatus } from "@/utils/network";

export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await httpHandler("/admin/stats", RequestType.GET);

  if (response.status === responseStatus.SUCCESS) {
    return (response.data as any).stats;
  }

  throw new Error(response.message || "Failed to fetch admin stats");
};

export interface AdminConfigResponse {
  config: AdminConfig;
}

export const getAdminConfig = async (): Promise<AdminConfig> => {
  const response = await httpHandler("/admin/config", RequestType.GET);

  if (response.status === responseStatus.SUCCESS) {
    return (response.data as AdminConfigResponse).config;
  }

  throw new Error(response.message || "Failed to fetch admin config");
};

export const generateDiscountCode =
  async (): Promise<GeneratedDiscountCode> => {
    const response = await httpHandler(
      "/admin/discount-codes/generate",
      RequestType.POST,
    );

    if (response.status === responseStatus.SUCCESS) {
      return (response.data as { discountCode: GeneratedDiscountCode })
        .discountCode;
    }

    throw new Error(response.message || "Failed to generate discount code");
  };
