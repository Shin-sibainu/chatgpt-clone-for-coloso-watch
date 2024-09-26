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
  id: string;
  name: string;
  created_at: string;
}

function App() {
  const { user } = useAuth();

  const [chatRooms, setChatRooms] = useState<ChatRoom[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //chat room create
    async function fetchChatRooms() {
      if (user?.id) {
        try {
          setIsLoading(true);
          const rooms = await getChatRoomsForUser(
            "1f76b526-c372-4f66-95b2-b4809e92c1fd"
          );
          console.log(rooms);
          setChatRooms(rooms);
        } catch (error) {
          console.error("Failed to fetch chat rooms:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchChatRooms();
  }, [user?.id]);

  return (
    <>
      {user ? (
        <main className="md:flex w-screen h-screen">
          <div className="lg:w-1/6 md:w-1/3">
            <Sidebar chatRooms={chatRooms} />
          </div>

          <div className="lg:w-5/6 md:w-2/3">
            <ChatArea />
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
