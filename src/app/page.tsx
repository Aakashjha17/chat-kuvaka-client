"use client"
import React, { useEffect, useRef, useState } from "react";
import { axiosRequest } from "@/api/axios";
import { CHAT_URL } from "@/constants";
import NameInput from "../components/form";
import io from "socket.io-client";

interface Chat {
  name: string;
  text: string;
  createdAt: string;
}

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosRequest(
          "GET",
          CHAT_URL.getChats
        );
        setChats(response.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const formatDate = (date: any) => {
    return new Date(date).toLocaleString("en-US", { timeStyle: "short" });
  };

  const postMessage = async () => {
    try {
      if (message.trim() === "") return;
      socket.emit("chatMessage", { name, text: message });
      socket.on("receiveChatMessage", (data: Chat) => {
        setChats(prevChats => [...prevChats, data]);
      })
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  if (name === null) {
    return <NameInput setName={setName} />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-[600px] border">
        <div
          ref={chatContainerRef}
          className="pl-2 mb-12 flex flex-col w-full justify-center gap-3 items-start py-5 overflow-y-auto"
          style={{ maxHeight: "400px" }}
        >
          {chats.map((chat: any, index: any) => (
            <div key={index} className="w-full flex flex-col items-start py-2">
              <div className="flex justify-start items-center mb-1">
                <p className="font-semibold mr-2">{chat.name}</p>
                <p className="text-gray-600">{formatDate(chat.createdAt)}</p>
              </div>
              <div className="text-blue-600 text-[16px]">{chat.text}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="border border-gray-300 rounded-md py-2 px-4 mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={postMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
