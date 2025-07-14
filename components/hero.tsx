"use client";

import React from "react";

const HeroSection = () => {
  const cardItems = [
    { title: "Journal", image: "/journal.png" },
    { title: "Mood Tracking", image: "/mood.png" },
    { title: "Arohi A.I Bot", image: "/ai.png" },
    { title: "Therapy", image: "/therapy.png" },
    { title: "Healing Toolbox", image: "/toolbox.png" },
    { title: "Community", image: "/community.png" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="w-full min-h-screen bg-gradient-to-br from-[#FF7B00] to-[#18A2B8] bg-no-repeat bg-center bg-cover text-white pt-20 px-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 123, 0, 0.8), rgba(24, 162, 184, 0.8)), url('/hero.png')`,
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center min-h-[70vh]">
          <div className="text-white max-w-xl text-center mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
              You Have Been Wondering
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
              Try to understand what's missing?
            </p>

            <div className="mt-16 md:mt-32">
              <button className="bg-white/90 hover:bg-white text-[#FF7B00] px-6 md:px-8 py-3 rounded-[30px] font-semibold text-base md:text-lg transition duration-300 shadow-lg hover:shadow-xl">
                Begin Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section (Below Hero) */}
      <section className="bg-white text-black py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            What kind of SoulYatri are you looking for?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
              >
                <span className="text-lg font-medium">{item.title}</span>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
