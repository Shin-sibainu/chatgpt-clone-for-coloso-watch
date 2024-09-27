import { useEffect, useState } from "react";
import { Message } from "../App";
import { useAuth } from "../context/AuthContextProvider";
import ChatInput from "./ChatInput";
import { getMessagesForChatRoom } from "../utils/chatServices";

interface ChatAreaProps {
  selectedChatRoomId: number | null;
}

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
    <div className="h-full p-4 bg-zinc-800 text-white flex flex-col">
      {/* chat area header */}
      <div className="h-8 flex justify-between items-center mb-4">
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

      <div className="flex-grow flex justify-center">
        <div className="w-full max-w-3xl flex flex-col">
          {/* chat output area */}
          <div className="flex-grow overflow-y-auto mb-4">
            {messages?.map((message) => (
              <div key={message.id}>
                {message.is_ai ? (
                  <div className="mb-6 flex items-center gap-2 relative">
                    <div className="bg-zinc-900 rounded-full size-9 border border-zinc-100 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        AI
                      </span>
                    </div>
                    <div className="inline-block rounded-lg p-2">
                      Hi ShinCode! What's up!
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
            {/* right chat (me) */}
            {/* <div className="text-right mb-6">
              <div className="inline-block bg-zinc-700 rounded-lg p-2">Hi</div>
            </div> */}

            {/* left chat (ai) */}
            {/* <div className="mb-6 flex items-center gap-2 relative">
              <div className="bg-zinc-900 rounded-full size-9 border border-zinc-100 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AI</span>
              </div>
              <div className="inline-block rounded-lg p-2">
                Hi ShinCode! What's up!
              </div>
            </div> */}

            {/* right chat (me) */}
            {/* <div className="text-right mb-6">
              <div className="inline-block bg-zinc-700 rounded-lg p-2">
                I want to ask about a React Application. How to use React Hooks
                like useState or useEffect?
              </div>
            </div> */}

            {/* left chat (ai) */}
            {/* <div className="mb-6 flex items-center gap-2 relative">
              <div className="bg-zinc-900 rounded-full size-9 border border-zinc-100 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AI</span>
              </div>
              <div className="inline-block rounded-lg p-2">
                React Hooks like useState and useEffect allow you to add state
                and side effects to functional components.
              </div>
            </div> */}

            {/* right chat (me) */}
            {/* <div className="text-right mb-6">
              <div className="inline-block bg-zinc-700 rounded-lg p-2">
                I see. Thank you for your help!
              </div>
            </div> */}

            {/* <div className="mb-6 flex items-center gap-2 relative">
              <div className="bg-zinc-900 rounded-full size-9 border border-zinc-100 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AI</span>
              </div>
              <div className="inline-block rounded-lg p-2">Your Welcome!</div>
            </div> */}
          </div>

          {/* chat input */}
          <div className="my-2">
            <ChatInput
              userId={user?.id}
              selectedChatRoomId={selectedChatRoomId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
