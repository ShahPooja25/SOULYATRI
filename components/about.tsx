"use client";

import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900">
            Designed by experts,
            <br />
            delivered with care
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From guided meditations to one-on-one coaching, our team of clinical experts and trained coaches work
            together to bring you science-backed care.
          </p>
          <button className="bg-[#18A2B8] hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Learn more
          </button>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* CEO Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-[#18A2B8] to-[#1591a3] rounded-2xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="/dhruv.png"
                    alt="Dhruv Paleja"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Dhruv Paleja</h3>
                <p className="text-white/90 font-medium">CEO of the Soul Yatri</p>
              </div>
            </div>
          </div>

          {/* CFO Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-[#FF7B00] to-[#e66a00] rounded-2xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="/dhruv.png"
                    alt="Kanishk Thakkar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Kanishk Thakkar</h3>
                <p className="text-white/90 font-medium">CFO of the Soul Yatri</p>
              </div>
            </div>
          </div>

          {/* CTO Card */}
          <div className="group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="/dhruv.png"
                    alt="Ansh Shinde"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">Ansh Shinde</h3>
                <p className="text-white/90 font-medium">CTO of the Soul Yatri</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
