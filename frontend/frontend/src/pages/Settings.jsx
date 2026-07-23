import ProfileSettings from "../components/settings/ProfileSettings";
import CompanySettings from "../components/settings/CompanySettings";
import SecuritySettings from "../components/settings/SecuritySettings";

function Settings() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your account and company preferences.
        </p>

      </div>

      <div className="grid xl:grid-cols-2 gap-8">

        <ProfileSettings />

        <CompanySettings />

      </div>

      <SecuritySettings />

    </div>
  );
}

export default Settings;