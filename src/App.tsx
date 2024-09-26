import { useEffect, useState } from "react";
import AuthButton from "./components/AuthButton";
import ChatArea from "./components/ChatArea";
import Sidebar from "./components/Sidebar";

import { useAuth } from "./context/AuthContextProvider";
import {
  getChatRoomsForUser,
  getMessagesForChatRoom,
} from "./utils/chatServices";

//https://www.twitterbio.io/
//colosotestdb
//rugyunya@bangban.uk

export interface ChatRoom {
  id: string;
  name: string;
  created_at: string;
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  is_ai: boolean;
}

function App() {
  const { user } = useAuth();

  const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(null);
  const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);

  /* get chat rooms */
  useEffect(() => {
    //chat room create
    async function fetchChatRooms() {
      if (user?.id) {
        try {
          const rooms = await getChatRoomsForUser(
            "1f76b526-c372-4f66-95b2-b4809e92c1fd"
          );
          setChatRooms(rooms);

          //chat roomがあれば一番目を選択する。
          if (rooms.length > 0 && !selectedChatRoom) {
            setSelectedChatRoom(rooms[0].id);
          }
        } catch (error) {
          console.error("Failed to fetch chat rooms:", error);
        }
      }
    }

    fetchChatRooms();
  }, [user?.id, selectedChatRoom]);

  /* get messages for chatroomId */
  useEffect(() => {
    async function fetchMessages() {
      if (selectedChatRoom) {
        try {
          const fetchedMessages = await getMessagesForChatRoom(
            selectedChatRoom
          );
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      }
    }

    fetchMessages();
  }, [selectedChatRoom]);

  return (
    <>
      {user ? (
        <main className="md:flex w-screen h-screen">
          <div className="lg:w-1/6 md:w-1/3">
            <Sidebar
              chatRooms={chatRooms}
              onRoomSelect={setSelectedChatRoom}
            />
          </div>

          <div className="lg:w-5/6 md:w-2/3">
            <ChatArea messages={messages} />
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
