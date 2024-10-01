import { useEffect, useState } from "react";
import { ChatRoom } from "../App";
import { createChatRoomForUser } from "../utils/chatServices";
import { useAuth } from "../context/AuthContextProvider";

type SidebarProps = {
  chatRooms: ChatRoom[] | null;
  onRoomSelect: (roomId: number) => void;
  selectedChatRoomId: number | null;
};

const Sidebar = ({
  chatRooms,
  onRoomSelect,
  selectedChatRoomId,
}: SidebarProps) => {
  const { user } = useAuth();

  const [selectedChatRoom, setSelectedChatRoom] = useState<number | null>(null);

  useEffect(() => {
    setSelectedChatRoom(selectedChatRoomId);
  }, [selectedChatRoomId]);

  const handleRoomSelect = (roomId: number) => {
    setSelectedChatRoom(roomId);
    onRoomSelect(roomId);
  };

  const handleCreateChatRoom = async () => {
    const chatRoomName = window.prompt("チャットルーム名を記入してください。");

    if (chatRoomName) {
      await createChatRoomForUser(user?.id, chatRoomName);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-zinc-900 p-4 text-white h-full">
      {/* create chat room */}
      <div className="px-1">
        <button
          onClick={handleCreateChatRoom}
          className="border px-4 py-2 rounded-lg border-slate-300 hover:bg-white hover:text-slate-900 duration-150"
        >
          + Create Room
        </button>
      </div>

      {/* chat room lists */}
      <nav>
        <ul className="space-y-2">
          {chatRooms?.map((chatRoom) => (
            <li
              key={chatRoom.id}
              onClick={() => handleRoomSelect(chatRoom.id)}
              className={`hover:bg-slate-600 duration-150 cursor-pointer py-2 px-2 rounded-md ${
                selectedChatRoom === chatRoom.id
                  ? "bg-slate-600"
                  : "bg-transparent"
              }`}
            >
              {chatRoom.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
