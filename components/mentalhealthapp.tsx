"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Tab {
  name: string;
}

interface Card {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  buttonText: string;
  bgColor: string;
  image: string; // Only strings
  tab: string;
}

const MentalHealthAppSection: React.FC = () => {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("Online therapy");
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const tabs: Tab[] = [
    { name: "Online therapy" },
    { name: "SoulYatri AI" },
    { name: "Mood Journal" },
    { name: "Sleep resources" },
    { name: "Expert-led programs" },
  ];

  const cards: Card[] = [
    {
      id: 0,
      type: "therapy",
      title: "You Deserve to be heard by the right person",
      subtitle:
        "At SoulYatri, we gently pair you with a therapist who truly aligns with your emotional needs and healing journey.",
      buttonText: "Get started",
      bgColor: "bg-blue-600",
      image: "https://via.placeholder.com/400x300?text=Therapy",
      tab: "Online therapy",
    },
    {
      id: 1,
      type: "chat",
      title: "You Deserved To Be Heard By Right Person",
      subtitle:
        "We gently pair you with a therapist who truly aligns with your emotional needs and healing journey.",
      buttonText: "Chat with Arohi",
      bgColor: "bg-yellow-400",
      image: "https://via.placeholder.com/400x300?text=AI+Chat",
      tab: "SoulYatri AI",
    },
    {
      id: 2,
      type: "journal",
      title: "New Journal Entry",
      subtitle:
        "Keep Your Mood Journal with us, we are here to make feel good.",
      buttonText: "Learn more",
      bgColor: "bg-pink-400",
      image: "https://via.placeholder.com/400x300?text=Journal",
      tab: "Mood Journal",
    },
    {
      id: 3,
      type: "sleep",
      title: "Sleep journal",
      subtitle:
        "Sleep more soundly every night with bedtime meditations, proven exercises and relaxing sounds. Give it a listen.",
      buttonText: "Explore sleep resources",
      bgColor: "bg-red-600",
      image: "https://via.placeholder.com/400x300?text=Sleep",
      tab: "Sleep resources",
    },
    {
      id: 4,
      type: "exercises",
      title: "Do-anywhere exercises",
      subtitle:
        "Reach your mental health goals with proven courses and expert-led guidance. Check out a preview here.",
      buttonText: "Learn more",
      bgColor: "bg-green-600",
      image: "https://via.placeholder.com/400x300?text=Exercises",
      tab: "Expert-led programs",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setActiveTab(cards[activeCard].tab);
  }, [activeCard]);

  const handleTabClick = (tabName: string) => {
    const index = cards.findIndex((c) => c.tab === tabName);
    if (index !== -1) setActiveCard(index);
  };

  const scrollToCard = (index: number) => setActiveCard(index);

  const handleGetStarted = () => router.push("/signup");

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            The Mental Health App for Every Moment
          </h2>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                onMouseEnter={() => handleTabClick(tab.name)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 ${
                  activeTab === tab.name
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeCard * 100}%)` }}
          >
            {cards.map((card) => (
              <div key={card.id} className="w-full flex-shrink-0 px-2">
                <div
                  className={`${card.bgColor} rounded-2xl p-8 md:p-12 text-white relative overflow-hidden min-h-[400px] md:min-h-[500px]`}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between h-full">
                    <div className="flex-1 mb-8 md:mb-0 md:pr-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                        {card.title}
                      </h3>
                      <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed">
                        {card.subtitle}
                      </p>
                      <button
                        onClick={handleGetStarted}
                        className="bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {card.buttonText}
                      </button>
                    </div>

                    {/* Image */}
                    <div className="flex-1 flex justify-center md:justify-end">
                      <div className="relative w-[300px] h-[225px]">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="rounded-lg object-contain shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeCard === index ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentalHealthAppSection;
