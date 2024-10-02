import { useEffect, useState } from "react";
import AuthButton from "./components/AuthButton";
import ChatArea from "./components/ChatArea";
import Sidebar from "./components/Sidebar";

import { useAuth } from "./context/AuthContextProvider";
import { getChatRoomsForUser } from "./utils/chatServices";

//https://www.twitterbio.io/
//colosotestdb
//rugyunya@bangban.uk

export interface ChatRoom {
  id: number;
  name: string;
  created_at: string;
}

export interface Message {
  id: number;
  content: string | null | undefined;
  created_at: string;
  user_id: string | undefined;
  is_ai: boolean;
}

function App() {
  const { user } = useAuth();

  const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(null);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(
    null
  );

  /* get chat rooms */
  useEffect(() => {
    //chat room create
    async function fetchChatRooms() {
      if (user?.id) {
        try {
          const rooms = await getChatRoomsForUser(
            // "1f76b526-c372-4f66-95b2-b4809e92c1fd"
            user.id
          );
          setChatRooms(rooms);

          //chat roomがあれば一番目を選択する。
          if (rooms.length > 0 && !selectedChatRoomId) {
            setSelectedChatRoomId(rooms[0].id);
          }
        } catch (error) {
          console.error("Failed to fetch chat rooms:", error);
        }
      }
    }

    fetchChatRooms();
  }, [user?.id, selectedChatRoomId]);

  const handleRoomCreate = (newRoom: ChatRoom) => {
    setChatRooms((prevRooms) =>
      prevRooms ? [...prevRooms, newRoom] : [newRoom]
    );
    setSelectedChatRoomId(newRoom.id);
  };

  return (
    <>
      {user ? (
        <main className="flex flex-col md:flex-row w-screen h-screen">
          <div className="lg:w-1/6 md:w-1/3">
            <Sidebar
              chatRooms={chatRooms}
              onRoomSelect={setSelectedChatRoomId}
              selectedChatRoomId={selectedChatRoomId}
              onRoomCreate={handleRoomCreate}
            />
          </div>

          <div className="lg:w-5/6 md:w-2/3 flex-grow">
            <ChatArea selectedChatRoomId={selectedChatRoomId} />
          </div>
        </main>
      ) : (
        /* login */
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-800">
          <AuthButton />
        </div>
      )}
    </>
  );
}

export default App;
