"use client";

import React, { useState } from "react";

const faqs = [
  { question: "What is SoulYatri?", answer: "SoulYatri is a mental wellness platform to help users build emotional resilience, access therapy, track mood, and engage with AI tools like Arohi." },
  { question: "What is SoulYatri’s mission?", answer: "To help people grow mentally stronger, emotionally stable, and more connected to themselves and their communities." },
  { question: "How do I download the SoulYatri app?", answer: "SoulYatri is available on both iOS and Android. Just search for 'SoulYatri' in the App Store or Google Play." },
  { question: "What is included in a SoulYatri app subscription?", answer: "Features like therapy booking, daily check-ins, AI support, mood tracking, healing content, and journaling are included." },
  { question: "How much does SoulYatri cost?", answer: "We offer both free and premium subscription plans starting at ₹199/month." },
  { question: "Does my SoulYatri subscription automatically renew?", answer: "Yes, subscriptions renew automatically unless cancelled before the renewal date." },
  { question: "How do I cancel my SoulYatri subscription?", answer: "You can manage or cancel your subscription in the App Store / Play Store or in your SoulYatri profile settings." },
  { question: "How can I support my team’s mental health at work?", answer: "SoulYatri offers organizational wellness plans. Contact our support for corporate wellness programs." },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-xl transition-all duration-200 bg-white shadow-sm ${
                  openIndex === index ? "bg-gray-50" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span className="text-2xl font-bold text-gray-500">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 -mt-2 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#1F1F1F] py-16 text-center">
        <button className="px-8 py-4 bg-gradient-to-b from-gray-700 to-gray-900 text-white text-lg font-semibold rounded-full border border-white/20 shadow-md hover:scale-105 transition-all duration-300">
          Get Your Soul Yatri
        </button>
      </section>
    </>
  );
};

export default FAQSection;
