import { useState } from "react";
import { ChatRoom } from "../App";

type SidebarProps = {
  chatRooms: ChatRoom[] | null;
  onRoomSelect: (roomId: string) => void;
};

const Sidebar = ({ chatRooms, onRoomSelect }: SidebarProps) => {
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string | null>(
    null
  );

  const handleRoomSelect = (roomId: string) => {
    setSelectedChatRoomId(roomId);
    onRoomSelect(roomId);
  };

  return (
    <div className="flex flex-col gap-4 bg-zinc-900 p-4 text-white h-full">
      {/* create chat room */}
      <div className="px-1">
        <button className="border px-4 py-2 rounded-lg border-slate-300 hover:bg-white hover:text-slate-900 duration-150">
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
                selectedChatRoomId === chatRoom.id
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
