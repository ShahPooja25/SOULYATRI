"use client";

import { useState } from "react";
import SoulYatriBot from "../../Hume/Chat";
import TherapistBooking from "./therapyuser";
import HealingToolbox from "./healingtoolbox";

const UserDashboard = () => {
  const [showSoulYatriBot, setShowSoulYatriBot] = useState(false);
  const [showTherapySession, setShowTherapySession] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const MoodDistributionChart = () => {
    const moodData = [
      { mood: "Happy", value: 40, color: "#10B981" },
      { mood: "Calm", value: 30, color: "#3B82F6" },
      { mood: "Neutral", value: 20, color: "#6B7280" },
      { mood: "Sad", value: 10, color: "#EF4444" },
    ];

    const maxValue = Math.max(...moodData.map((d) => d.value));

    return (
      <div className="h-24 sm:h-32 flex items-end justify-between space-x-2">
        {moodData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-1 sm:space-y-2 flex-1"
          >
            <div
              className="w-full rounded-t"
              style={{
                height: `${(item.value / maxValue) * 80}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-xs text-gray-600">{item.mood}</span>
          </div>
        ))}
      </div>
    );
  };

  const MoodTrendChart = () => {
    const trendData = [4.2, 3.8, 4.1, 4.5, 3.9, 4.3, 4.5];
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

    return (
      <div className="h-24 sm:h-32 relative">
        <svg width="100%" height="100%" className="overflow-visible">
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            points={trendData
              .map(
                (value, index) =>
                  `${(index / (trendData.length - 1)) * 100}%,${100 - (value / 5) * 100}%`,
              )
              .join(" ")}
          />
          {trendData.map((value, index) => (
            <circle
              key={index}
              cx={`${(index / (trendData.length - 1)) * 100}%`}
              cy={`${100 - (value / 5) * 100}%`}
              r="3"
              fill="#3B82F6"
            />
          ))}
        </svg>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {weeks.map((week, index) => (
            <span key={index} className="hidden sm:inline">
              {week}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "therapy-sessions", label: "Therapy Sessions", icon: "👩‍⚕️" },
    { id: "healing-toolbox", label: "Healing Toolbox", icon: "🧰" },
    { id: "my-sessions", label: "My Sessions", icon: "📅" },
    { id: "journal", label: "Journal", icon: "📖" },
    { id: "progress", label: "Progress", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const favoriteTools = [
    { title: "Mindful Breathing", color: "bg-orange-200", icon: "🧘‍♀️" },
    { title: "Gratitude Journal", color: "bg-orange-100", icon: "📔" },
    { title: "Sleep Stories", color: "bg-teal-200", icon: "🌙" },
    { title: "Guided Meditation", color: "bg-gray-200", icon: "🧘‍♂️" },
  ];

  if (activeTab === "healing-toolbox")
    return <HealingToolbox onBack={() => setActiveTab("dashboard")} />;
  if (activeTab === "therapy-sessions")
    return <TherapySession onClose={() => setActiveTab("dashboard")} />;

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-50 w-64 bg-white shadow-sm transition-transform duration-300 ease-in-out h-full`}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] rounded-lg flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">
                  S
                </span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] bg-clip-text text-transparent">
                SoulYatri
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              Aanya
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Healing Streak: 7 days
            </p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              ☰
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm">Hi Aanya 👋</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        </header>

        {/* Content Sections */}
        <div className="p-4 sm:p-8 space-y-8">
          {/* Healing Progress */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Healing Progress
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between mb-2 text-sm font-medium text-gray-700">
                <span>Overall Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <p className="text-sm text-gray-600">You're doing great!</p>
            </div>
          </section>

          {/* Mood Trackers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Emotion & Mood Tracker
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-2">
                  Mood Distribution
                </h3>
                <MoodDistributionChart />
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-2">Mood Trend</h3>
                <MoodTrendChart />
              </div>
            </div>
          </section>

          {/* Summary + Tools + Sentiment */}
          <section className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700">
                You completed a 'Mindful Breathing' session yesterday and
                journaled about your day.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {favoriteTools.map((tool, i) => (
                <div
                  key={i}
                  className={`${tool.color} rounded-lg p-4 text-center`}
                >
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <div className="font-medium text-gray-800">{tool.title}</div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Daily Sentiment Meter
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
              <p className="text-gray-600">Today's sentiment: 80% Positive</p>
              <blockquote className="text-sm text-gray-700 italic mt-2">
                "The mind is everything. What you think you become." – Buddha
              </blockquote>
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      {showSoulYatriBot && (
        <SoulYatriBot onClose={() => setShowSoulYatriBot(false)} />
      )}
      {showTherapySession && (
        <TherapistBooking onClose={() => setShowTherapySession(false)} />
      )}
    </div>
  );
};

export default UserDashboard;
