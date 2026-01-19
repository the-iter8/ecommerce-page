export const RequestType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type RequestType = (typeof RequestType)[keyof typeof RequestType];

export const responseStatus = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

export type responseStatus =
  (typeof responseStatus)[keyof typeof responseStatus];

export interface ApiResponse {
  status: responseStatus;
  data?: unknown;
  message?: string;
  statusCode?: number;
}

export const httpHandler = async (
  url: string,
  method: RequestType,
  headers?: Record<string, string>,
  body?: unknown,
): Promise<ApiResponse> => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const fullUrl = `${baseUrl}${url}`;

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body && method !== RequestType.GET) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(fullUrl, config);
    const data = await response.json();

    if (data.success) {
      return {
        status: responseStatus.SUCCESS,
        data: data.data,
        statusCode: data.statusCode || response.status,
      };
    } else {
      return {
        status: responseStatus.ERROR,
        message: data.error?.message || data.message || "Request failed",
        statusCode: data.statusCode || response.status,
      };
    }
  } catch (error: unknown) {
    return {
      status: responseStatus.ERROR,
      message: error instanceof Error ? error.message : "Network error",
      statusCode: 500,
    };
  }
};
