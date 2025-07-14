"use client";

import HeroSection from "../components/hero";
import MentalHealthAppSection from "../components/mentalhealthapp";
import AboutSection from "../components/about";
import AppSection from "../components/app";
import CommunitySection from "../components/community";
import ContactSection from "../components/contact";
import FAQSection from "@/components/FAQSection";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <MentalHealthAppSection />
      <AboutSection />
      <AppSection />
      <CommunitySection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
