"use client";

import React from "react";

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
  image: string;
}

const AppSection: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Chat Interface",
      description: "Seamless conversations with Soul AI and therapists",
      icon: "💬",
      color: "#18A2B8",
      image: "/Welcome Screen.png", // Place in public folder
    },
    {
      title: "Mood Tracker",
      description: "Visual insights into your emotional patterns",
      icon: "📊",
      color: "#FF7B00",
      image: "/Mental Health Assessment.png",
    },
    {
      title: "Therapist Matching",
      description: "AI-powered matching with perfect-fit healers",
      icon: "🎯",
      color: "#18A2B8",
      image: "/Mental Health.png",
    },
    {
      title: "Soul Score Analytics",
      description: "Track your spiritual and emotional growth journey",
      icon: "📈",
      color: "#FF7B00",
      image: "/Community.png",
    },
  ];

  return (
    <section id="app" className="py-12 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            The App is Ready
          </h2>
          <p className="text-gray-600 text-base md:text-xl">
            Experience healing in the palm of your hands
          </p>
        </div>

        {/* Features */}
        <div className="space-y-12 md:space-y-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-8 md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Phone Mockup */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="w-48 md:w-64 h-[380px] md:h-[500px] bg-black rounded-[2rem] md:rounded-[3rem] p-1.5 md:p-2 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden relative">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-4 md:h-6 bg-black rounded-b-xl z-10" />

                      {/* Image inside screen */}
                      <div className="h-full w-full">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="h-full w-full object-cover rounded-[1.5rem] md:rounded-[2.5rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 text-center md:text-left">
                <div className="max-w-lg mx-auto md:mx-0">
                  <div
                    className="w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-base md:text-xl text-white mb-4 md:mb-6 shadow-lg mx-auto md:mx-0"
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Buttons */}
        <div className="text-center mt-12 md:mt-16">
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            <button className="bg-[#18A2B8] hover:bg-[#1591a3] text-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Web App
            </button>
            <button className="bg-[#FF7B00] hover:bg-[#e66a00] text-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Download iOS
            </button>
            <button className="bg-[#18A2B8] hover:bg-[#1591a3] text-white px-4 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Download Android
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
