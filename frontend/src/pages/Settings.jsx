import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import CompanySettings from "../components/settings/CompanySettings";

function Settings() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your account and company settings.
        </p>

      </div>

      <ProfileSettings />

      <SecuritySettings />

      <CompanySettings />

    </div>
  );
}

export default Settings;