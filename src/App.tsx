import ChatArea from "./components/ChatArea";
import Sidebar from "./components/Sidebar";

//https://www.twitterbio.io/
async function App() {
  return (
    <main className="md:flex w-screen h-screen">
      <div className="lg:w-1/5 md:w-1/3">
        <Sidebar />
      </div>

      <div className="lg:w-4/5 md:w-2/3">
        <ChatArea />
      </div>
    </main>
  );
}

export default App;
