import ChatInput from "./ChatInput";

const ChatArea = () => {
  return (
    <div className="h-full p-4 bg-zinc-800 text-white flex flex-col">
      {/* model title */}
      <div className="h-8">
        <h2 className="font-medium text-xl">GPT Clone</h2>
      </div>

      <div className="flex-grow flex justify-center">
        <div className="w-full max-w-3xl flex flex-col">
          {/* chat output area */}
          <div className="flex-grow overflow-y-auto mb-4">
            {/* right chat (me) */}
            <div className="text-right mb-2">
              <div className="inline-block bg-zinc-700 rounded-lg p-2">Hi</div>
            </div>

            {/* left chat (ai) */}
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-zinc-900 rounded-full size-9 border border-zinc-100">
                AI
              </div>
              <div className="inline-block rounded-lg p-2">
                Hi ShinCode! What's up!
              </div>
            </div>
          </div>

          {/* chat input */}
          <div className="my-2">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
