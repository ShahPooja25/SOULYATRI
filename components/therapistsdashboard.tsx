"use client";

import { useState } from "react";
import TherapistAppointments from "./Therapistsappointment";
import TherapistSessionRecords from "./therapistssessions";
import TherapistSettings from "./therapistssettings";

interface Session {
  id: number;
  name: string;
  time: string;
  image: string;
  bgColor: string;
}

interface Inquiry {
  id: number;
  clientName: string;
  question: string;
  status: string;
  statusColor: string;
}

const TherapistDashboard = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const upcomingSessions: Session[] = [
    {
      id: 1,
      name: "Anya Kapoor",
      time: "Gemini, 02/12/1993",
      image: "/placeholder.svg?height=80&width=80",
      bgColor: "bg-orange-100",
    },
    {
      id: 2,
      name: "Rohan Verma",
      time: "Gemini, 02/12/1993",
      image: "/placeholder.svg?height=80&width=80",
      bgColor: "bg-gray-100",
    },
    {
      id: 3,
      name: "Divya Patel",
      time: "Gemini, 02/22/1993",
      image: "/placeholder.svg?height=80&width=80",
      bgColor: "bg-orange-100",
    },
  ];

  const clientInquiries: Inquiry[] = [
    {
      id: 1,
      clientName: "Arjun Singh",
      question: "How can I manage my anxiety?",
      status: "New",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      clientName: "Kavya Iyer",
      question: "Need help with relationship issues",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      clientName: "Vikram Rao",
      question: "Seeking advice on career change",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  const ZodiacChart = (): JSX.Element => {
    const zodiacData = [
      { sign: "Aries", count: 12 },
      { sign: "Taurus", count: 8 },
      { sign: "Gemini", count: 15 },
      { sign: "Cancer", count: 10 },
      { sign: "Leo", count: 6 },
      { sign: "Virgo", count: 14 },
    ];
    const maxCount = Math.max(...zodiacData.map((d) => d.count));

    return (
      <div className="h-64 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Client Distribution by SoulYatri
        </h3>
        <div className="flex items-end justify-between h-48 space-x-2">
          {zodiacData.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className="w-8 bg-blue-400 rounded-t"
                style={{ height: `${(item.count / maxCount) * 180}px` }}
              />
              <span className="text-xs text-gray-600 transform -rotate-45 origin-center">
                {item.sign}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (activeTab === "appointments") {
    return <TherapistAppointments onBack={() => setActiveTab("dashboard")} />;
  }

  if (activeTab === "session-records") {
    return <TherapistSessionRecords onBack={() => setActiveTab("dashboard")} />;
  }

  if (activeTab === "settings") {
    return <TherapistSettings onBack={() => setActiveTab("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-gray-800">Priya Sharma</span>
            </div>
            <nav className="space-y-2">
              <button
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "dashboard"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "appointments"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("appointments")}
              >
                Appointments
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "session-records"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("session-records")}
              >
                Session Records
              </button>
              <button
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === "settings"
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Sessions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Upcoming Sessions
                </h2>
                <ul className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <li
                      key={session.id}
                      className={`flex items-center space-x-4 p-3 rounded ${session.bgColor}`}
                    >
                      <img
                        src={session.image}
                        alt={session.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{session.name}</p>
                        <p className="text-sm text-gray-600">{session.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Inquiries */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Client Inquiries</h2>
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-600">
                      <th className="pb-2">Client</th>
                      <th className="pb-2">Question</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientInquiries.map((inq) => (
                      <tr key={inq.id} className="border-t">
                        <td className="py-2">{inq.clientName}</td>
                        <td className="py-2">{inq.question}</td>
                        <td className="py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${inq.statusColor}`}
                          >
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Zodiac Chart */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <ZodiacChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
