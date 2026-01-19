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
  data?: any;
  message?: string;
  statusCode?: number;
}
