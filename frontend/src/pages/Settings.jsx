import { useState } from "react";

import {
  FaUser,
  FaBuilding,
  FaLock,
} from "react-icons/fa";

import ProfileSettings from "../components/settings/ProfileSettings";
import CompanySettings from "../components/settings/CompanySettings";
import SecuritySettings from "../components/settings/SecuritySettings";

function Settings() {

  const [activeTab, setActiveTab] = useState("profile");

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 shadow-2xl">

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10">

          <h1 className="text-5xl font-bold text-white">

            Settings

          </h1>

          <p className="text-blue-100 mt-3 text-lg">

            Manage your recruiter profile, company information and security.

          </p>

        </div>

      </div>

      {/* Navigation */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3">

        <div className="flex flex-wrap gap-3">

          <button

            onClick={() => setActiveTab("profile")}

            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "profile"
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-white/10"
            }`}

          >

            <FaUser />

            Profile

          </button>

          <button

            onClick={() => setActiveTab("company")}

            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "company"
                ? "bg-purple-600 shadow-lg"
                : "hover:bg-white/10"
            }`}

          >

            <FaBuilding />

            Company

          </button>

          <button

            onClick={() => setActiveTab("security")}

            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "security"
                ? "bg-red-600 shadow-lg"
                : "hover:bg-white/10"
            }`}

          >

            <FaLock />

            Security

          </button>

        </div>

      </div>

      {/* Content */}

      <div>

        {activeTab === "profile" && (

          <ProfileSettings />

        )}

        {activeTab === "company" && (

          <CompanySettings />

        )}

        {activeTab === "security" && (

          <SecuritySettings />

        )}

      </div>

    </div>

  );

}

export default Settings;