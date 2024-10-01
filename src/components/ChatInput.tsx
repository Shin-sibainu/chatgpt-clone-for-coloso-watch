import { FormEvent, useState } from "react";
import { sendMessage, sendMessageToGPT } from "../utils/chatServices";
import { Message } from "../App";

type ChatInputProps = {
  userId: string | undefined;
  selectedChatRoomId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToBottom: () => void;
};

const ChatInput = ({
  userId,
  selectedChatRoomId,
  setMessages,
  setIsLoading,
  scrollToBottom,
}: ChatInputProps) => {
  const [inputSendMessage, setInputSendMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputSendMessage.trim() === "" || !selectedChatRoomId) return;

    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        content: inputSendMessage,
        is_ai: false,
        user_id: userId,
        created_at: Date.now().toString(),
      };
      //optimistic message update
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, userMessage] : [userMessage]
      );
      scrollToBottom();

      // send yor message to backend
      await sendMessage(userId, selectedChatRoomId, inputSendMessage);
      setInputSendMessage("");

      setIsLoading(true);

      const messageFromGPT = await sendMessageToGPT(inputSendMessage);

      //Add ai message
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: messageFromGPT,
        is_ai: true,
        user_id: undefined,
        created_at: Date.now().toString(),
      };
      //optimistic message update
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, aiMessage] : [aiMessage]
      );
      // scrollToBottom();

      // send ai message to backend
      await sendMessage(undefined, selectedChatRoomId, messageFromGPT, true);

      setIsLoading(false);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full bg-zinc-700 px-4 py-3 rounded-lg focus:outline-none"
        placeholder="ChatGPTにメッセージを送信する"
        onChange={(e) => setInputSendMessage(e.target.value)}
        value={inputSendMessage}
      />
      <button
        className="absolute top-1/2 right-3 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-zinc-900 w-7 h-7 rounded-full flex items-center justify-center"
        aria-label="送信"
      >
        <span>↑</span>
      </button>
    </form>
  );
};

export default ChatInput;
