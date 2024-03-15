import axios, { AxiosResponse } from "axios";
import { CHAT_URL } from "@/constants";
type RequestType = "GET" | "POST" | "PUT" | "DELETE";

const config = (token?: string) => {
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  } else {
    return;
  }
};
export async function axiosRequest(
  requestType: RequestType,
  url: string,
  data?: any
): Promise<AxiosResponse> {
  let token: any = null;
  switch (requestType) {
    case "GET":
      return axios.get(url, config(token));
    case "POST":
      return axios.post(url, data, config(token));
    case "PUT":
      return axios.put(url, data, config(token));
    case "DELETE":
      return axios.delete(url, config(token));
    default:
      throw new Error(`Unsupported request type: ${requestType}`);
  }
}
