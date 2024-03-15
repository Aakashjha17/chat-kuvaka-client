const API_DOMAIN = process.env.NEXT_PUBLIC_SERVER_URL;

const BASE_CHAT_API = API_DOMAIN + "/api/chat";

export const CHAT_URL = {
  getChats: BASE_CHAT_API + "/get-chat",
  postChat: BASE_CHAT_API + "/post-chat",
};
