const Sidebar = () => {
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
          <li className="hover:bg-slate-600 duration-150 cursor-pointer py-2 px-2 rounded-md">
            Test Room1
          </li>
          <li className="hover:bg-slate-600 duration-150 cursor-pointer py-2 px-2 rounded-md">
            Test Room2
          </li>
          <li className="hover:bg-slate-600 duration-150 cursor-pointer py-2 px-2 rounded-md">
            Test Room3
          </li>
          <li className="hover:bg-slate-600 duration-150 cursor-pointer py-2 px-2 rounded-md">
            Test Room4
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
