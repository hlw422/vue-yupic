// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** GetArowData POST /api/css/aRowData */
export async function getArowDataUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>("/api/css/aRowData", {
    method: "POST",
    ...(options || {}),
  });
}
