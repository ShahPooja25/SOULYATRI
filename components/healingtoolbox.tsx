"use client";

import { useState } from "react";

type HealingToolboxProps = {
  onBack: () => void;
};

type Tool = {
  id: string;
  title: string;
  rating: number;
  description: string;
  buttonText: string;
  image: string;
  bgColor: string;
};

const HealingToolbox = ({ onBack }: HealingToolboxProps) => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const quickLinks = [
    { id: "therapist", label: "Therapist Sessions", icon: "👥" },
    { id: "astrologer", label: "Astrologer Guidance", icon: "🌙" },
    { id: "arohi", label: "Arohi AI", icon: "🤖" },
    { id: "sound", label: "Soothing Sound Space", icon: "🎵" },
    { id: "meditation", label: "Mini Meditations", icon: "🧘‍♀️" },
    { id: "journaling", label: "Daily Journaling", icon: "📝" },
    { id: "emotion", label: "Emotion & Sentiment Tracker", icon: "💝" },
  ];

  const healingTools: Tool[] = [
    {
      id: "therapist",
      title: "Therapist Sessions",
      rating: 4.8,
      description: "Connect with licensed therapists for personalized support.",
      buttonText: "Book Now",
      image: "https://your-image-link.com/1.png",
      bgColor: "bg-orange-100",
    },
    {
      id: "astrologer",
      title: "Astrologer Guidance",
      rating: 4.6,
      description: "Gain insights into your life path with expert astrologers.",
      buttonText: "Explore",
      image: "https://your-image-link.com/2.png",
      bgColor: "bg-blue-100",
    },
    {
      id: "arohi",
      title: "Arohi AI",
      rating: 4.9,
      description: "Your AI companion for instant support and guidance.",
      buttonText: "Chat Now",
      image: "https://your-image-link.com/3.png",
      bgColor: "bg-gray-100",
    },
    {
      id: "sound",
      title: "Soothing Sound Space",
      rating: 4.7,
      description: "Relax and unwind with calming soundscapes and music.",
      buttonText: "Listen",
      image: "https://your-image-link.com/4.png",
      bgColor: "bg-orange-100",
    },
    {
      id: "meditation",
      title: "Mini Meditations",
      rating: 4.5,
      description: "Quick guided meditations to center yourself throughout the day.",
      buttonText: "Meditate",
      image: "https://your-image-link.com/5.png",
      bgColor: "bg-green-100",
    },
    {
      id: "journaling",
      title: "Daily Journaling",
      rating: 4.6,
      description: "Reflect on your thoughts and emotions with guided prompts.",
      buttonText: "Start Journaling",
      image: "https://your-image-link.com/6.png",
      bgColor: "bg-yellow-100",
    },
    {
      id: "emotion",
      title: "Emotion & Sentiment Tracker",
      rating: 4.7,
      description: "Track your emotional well-being and identify patterns.",
      buttonText: "Track Now",
      image: "https://your-image-link.com/7.png",
      bgColor: "bg-pink-100",
    },
  ];

  const moods = ["Happy", "Calm", "Neutral", "Anxious", "Sad"];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 text-lg font-semibold">Quick Access</div>
        <ul className="space-y-2 p-4">
          {quickLinks.map((link) => (
            <li
              key={link.id}
              className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="text-sm text-blue-600 underline font-medium"
          >
            ← Back
          </button>
          <button
            className="md:hidden px-3 py-1 border rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold mb-2">Healing Toolbox</h1>
        <p className="text-gray-600 mb-6">
          Discover tools and resources curated to support your emotional and mental well-being.
        </p>

        {/* Mood Tracker */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">How are you feeling today?</h2>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                className={`px-4 py-2 rounded-full border ${
                  selectedMood === mood
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setSelectedMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Healing Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healingTools.map((tool) => (
            <div
              key={tool.id}
              className={`rounded-lg shadow-md overflow-hidden ${tool.bgColor}`}
            >
              <img
                src={tool.image}
                alt={tool.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{tool.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{tool.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-yellow-600">
                    ⭐ {tool.rating}
                  </span>
                  <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600">
                    {tool.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealingToolbox;
