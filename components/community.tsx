"use client";

import React from "react";

interface Testimonial {
  id: number;
  text: string;
  memberType: string;
}

const CommunitySection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "I appreciate the consistent reminders to be kind and patient with myself as I learn and practice daily habits that are helping me find a calmer daily space.",
      memberType: "Member on forming more helpful habits",
    },
    {
      id: 2,
      text: "SoulYatri helped me begin the process of stepping back from toxic thinking and being a part of something bigger than my own personal grievances.",
      memberType: "Member on learning to think in more helpful ways",
    },
    {
      id: 3,
      text: "The strategies in the courses allow me to work on bettering myself that I am struggling with. SoulYatri changed the relationship I have with myself.",
      memberType: "Member on working through their feelings",
    },
  ];

  return (
    <section
      id="community"
      className="py-20 px-4 bg-gradient-to-br from-green-50/30 to-pink-50/30 relative"
    >
      {/* Decorative SVGs */}
      <div className="absolute top-10 left-10 opacity-60">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
          <path
            d="M10 20C15 15 25 15 30 20C35 25 45 25 50 20C55 15 65 15 70 20"
            stroke="#86EFAC"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="15" cy="18" r="3" fill="#86EFAC" />
          <circle cx="25" cy="22" r="2" fill="#86EFAC" />
          <circle cx="35" cy="16" r="2.5" fill="#86EFAC" />
        </svg>
      </div>

      <div className="absolute top-16 right-16 opacity-60">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path
            d="M30 10C35 15 35 25 30 30C25 35 15 35 10 30C5 25 5 15 10 10C15 5 25 5 30 10Z"
            fill="#F9A8D4"
            opacity="0.6"
          />
          <path
            d="M45 15C48 18 48 25 45 28C42 31 35 31 32 28C29 25 29 18 32 15C35 12 42 12 45 15Z"
            fill="#F9A8D4"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Members are enjoying
            <br />
            happier and healthier lives
          </h2>
        </div>

        {/* Bigger Cards in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-2 lg:px-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-pink-50 backdrop-blur-sm p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-50 min-h-[300px] flex flex-col justify-between"

            >
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <div className="border-t border-gray-300 pt-4">
                <p className="text-sm text-gray-500 font-medium">
                  {testimonial.memberType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
