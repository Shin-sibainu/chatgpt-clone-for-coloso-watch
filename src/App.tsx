import ChatArea from "./components/ChatArea";
import Sidebar from "./components/Sidebar";

//https://www.twitterbio.io/
//colosotestdb
//rugyunya@bangban.uk

function App() {
  return (
    <main className="md:flex w-screen h-screen">
      <div className="lg:w-1/6 md:w-1/3">
        <Sidebar />
      </div>

      <div className="lg:w-5/6 md:w-2/3">
        <ChatArea />
      </div>
    </main>
  );
}

export default App;
