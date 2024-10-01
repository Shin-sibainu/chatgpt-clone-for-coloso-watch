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
    if (inputSendMessage.trim() === "") return;

    if (!userId) {
      alert("ログインしてください。");
      return;
    }

    if (!selectedChatRoomId) {
      alert("ルームを作成または選択してください。");
      return;
    }

    try {
      // Send message to backend
      const sentMessage = await sendMessage(
        userId,
        selectedChatRoomId,
        inputSendMessage
      );

      // Update messages with the response from the backend
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, sentMessage] : [sentMessage]
      );
      scrollToBottom();

      setInputSendMessage("");

      setIsLoading(true);

      const messageFromGPT = await sendMessageToGPT(inputSendMessage);

      // Send AI message to backend
      const aiMessage = await sendMessage(
        undefined,
        selectedChatRoomId,
        messageFromGPT,
        true
      );

      // Update messages with AI response
      setMessages((prevMessages) =>
        prevMessages ? [...prevMessages, aiMessage] : [aiMessage]
      );

      setIsLoading(false);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("メッセージの送信に失敗しました。");
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
