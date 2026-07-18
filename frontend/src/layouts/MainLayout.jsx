import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">

      <Sidebar />

      <div className="ml-72 p-8">

        <Navbar />

        <div className="mt-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default MainLayout;