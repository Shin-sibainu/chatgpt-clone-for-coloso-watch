const ChatInput = () => {
  return (
    <form className="relative">
      <input
        type="text"
        className="w-full bg-zinc-700 px-4 py-3 rounded-lg focus:outline-none"
        placeholder="ChatGPTにメッセージを送信する"
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
