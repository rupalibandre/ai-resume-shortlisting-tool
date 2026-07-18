import { FaBell, FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <div className="h-20 flex justify-between items-center bg-white/10 backdrop-blur-xl rounded-2xl px-8">

      <h2 className="text-3xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl">

          <FaSearch />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none ml-3"
          />

        </div>

        <FaBell className="text-xl cursor-pointer" />

        <img
          src="https://i.pravatar.cc/100"
          className="w-12 h-12 rounded-full"
        />

      </div>

    </div>
  );
}

export default Navbar;