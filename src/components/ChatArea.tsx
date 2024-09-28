import { useEffect, useState } from "react";
import { Message } from "../App";
import { useAuth } from "../context/AuthContextProvider";
import ChatInput from "./ChatInput";
import { getMessagesForChatRoom } from "../utils/chatServices";

type ChatAreaProps = {
  selectedChatRoomId: number | null;
};

const ChatArea = ({ selectedChatRoomId }: ChatAreaProps) => {
  const { user, signOut } = useAuth();

  const [messages, setMessages] = useState<Message[] | null>(null);

  /* get messages for chatroomId */
  useEffect(() => {
    async function fetchMessages() {
      if (selectedChatRoomId) {
        try {
          const fetchedMessages = await getMessagesForChatRoom(
            selectedChatRoomId
          );
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      }
    }

    fetchMessages();
  }, [selectedChatRoomId]);

  return (
    <div className="h-full flex flex-col bg-zinc-800 text-white">
      {/* chat area header */}
      <div className="flex justify-between items-center p-4">
        <h2 className="font-medium text-xl">GPT Clone</h2>
        <div
          onClick={() => {
            if (window.confirm("ログアウトしてもよろしいですか？")) {
              signOut();
            }
          }}
        >
          <img
            src={user?.user_metadata.avatar_url}
            alt="user profile icon"
            className="size-10 rounded-full cursor-pointer"
          />
        </div>
      </div>

      {/* chat messages area (scrollable) */}
      <div className="flex-grow overflow-y-auto px-4">
        <div className="max-w-3xl mx-auto">
          {messages?.map((message) => (
            <div key={message.id}>
              {message.is_ai ? (
                <div className="mb-6 flex items-center gap-2 relative">
                  <div className="bg-zinc-900 rounded-full size-9 border border-zinc-100 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">AI</span>
                  </div>
                  <div className="inline-block rounded-lg p-2">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className={"text-right mb-6"}>
                  <div className="inline-block bg-zinc-700 rounded-lg p-2">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* chat input area (fixed at bottom) */}
      <div className="p-4 ">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            userId={user?.id}
            selectedChatRoomId={selectedChatRoomId}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
