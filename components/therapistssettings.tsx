"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TherapistSettingsProps {
  onBack?: () => void;
}

interface SettingsState {
  fullName: string;
  email: string;
  phoneNumber: string;
  timeZone: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  twoFactorAuth: boolean;
  currentTheme: string;
}

const TherapistSettings = ({ onBack }: TherapistSettingsProps): JSX.Element => {
  const [settings, setSettings] = useState<SettingsState>({
    fullName: "Priya Sharma",
    email: "priya.sharma@email.com",
    phoneNumber: "+1 (555) 123-4567",
    timeZone: "Eastern Standard Time",
    emailNotifications: true,
    inAppNotifications: true,
    twoFactorAuth: false,
    currentTheme: "Light",
  });

  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const handleInputChange = (
    field: keyof SettingsState,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = (): void => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

        {/* Profile Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <div className="space-y-4">
            <Input
              value={settings.fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("fullName", e.target.value)
              }
              placeholder="Full Name"
            />
            <Input
              value={settings.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("email", e.target.value)
              }
              placeholder="Email"
            />
            <Input
              value={settings.phoneNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("phoneNumber", e.target.value)
              }
              placeholder="Phone Number"
            />
            <Input
              value={settings.timeZone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("timeZone", e.target.value)
              }
              placeholder="Time Zone"
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleInputChange("emailNotifications", e.target.checked)
                }
              />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.inAppNotifications}
                onChange={(e) =>
                  handleInputChange("inAppNotifications", e.target.checked)
                }
              />
              <span>In-App Notifications</span>
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Privacy</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) =>
                handleInputChange("twoFactorAuth", e.target.checked)
              }
            />
            <span>Two-Factor Authentication</span>
          </label>
        </div>

        {/* Theme */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Theme</h3>
          <select
            value={settings.currentTheme}
            onChange={(e) => handleInputChange("currentTheme", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System Default</option>
          </select>
        </div>

        {/* Password Change */}
        <div>
          <Button onClick={() => setShowChangePassword(true)} variant="outline">
            Change Password
          </Button>

          {showChangePassword && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <Input
                placeholder="Old Password"
                type="password"
                className="mb-2"
              />
              <Input
                placeholder="New Password"
                type="password"
                className="mb-2"
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="mb-4"
              />
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  onClick={() => alert("Password changed!")}
                >
                  Update Password
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={onBack} variant="ghost">
            Back
          </Button>
          <Button onClick={handleSaveChanges} variant="default">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistSettings;
