import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MainLayout() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {

    try {

      const response = await api.get("/auth/me");

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      localStorage.removeItem("token");

      window.location.href = "/";

    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white">

      <Sidebar />

      <div className="ml-72">

        <Navbar user={user} />

        <div className="p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default MainLayout;