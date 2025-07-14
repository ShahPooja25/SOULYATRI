"use client";

import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navbar */}
      <nav className="bg-white shadow-sm px-4 py-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] bg-clip-text text-transparent">
            SoulYatri Dashboard
          </h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-600 hover:text-[#FF7B00] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Your Healing Journey
          </h2>
          <p className="text-gray-600">
            Your personalized dashboard for spiritual growth and wellness
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Soul Score */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#FF7B00]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Soul Score
            </h3>
            <div className="text-3xl font-bold text-[#FF7B00] mb-2">85</div>
            <p className="text-gray-600 text-sm">
              Your spiritual wellness score
            </p>
          </div>

          {/* Mood Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#18A2B8]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Today's Mood
            </h3>
            <div className="text-2xl mb-2">😊</div>
            <p className="text-gray-600 text-sm">Feeling positive today</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#FF7B00]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-[#FF7B00] hover:bg-orange-50 rounded-md transition-colors">
                💬 Chat with SoulYatri
              </button>
              <button className="w-full text-left px-3 py-2 text-[#18A2B8] hover:bg-blue-50 rounded-md transition-colors">
                📝 Journal Entry
              </button>
              <button className="w-full text-left px-3 py-2 text-[#FF7B00] hover:bg-orange-50 rounded-md transition-colors">
                🎯 Book Session
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[#FF7B00] rounded-full"></div>
              <span className="text-gray-700">Completed daily meditation</span>
              <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[#18A2B8] rounded-full"></div>
              <span className="text-gray-700">Updated mood tracker</span>
              <span className="text-gray-500 text-sm ml-auto">5 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[#FF7B00] rounded-full"></div>
              <span className="text-gray-700">Started healing journey</span>
              <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
