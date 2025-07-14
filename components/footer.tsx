"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#ebe0e3] text-[#1F1F1F] pt-16 px-4">
      {/* Subscribe section */}
      <div className="max-w-7xl mx-auto border-b border-gray-300 pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-10">
          <div className="text-center lg:text-left max-w-xl">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Stay in the loop</h3>
            <p className="text-sm text-gray-600">
              Be the first to get updates on our latest content, special offers, and new features.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              By signing up, you’re agreeing to receive marketing emails. You can unsubscribe at any time.{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>
          </div>
          <form className="flex gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#18A2B8]"
            />
            <button
              type="submit"
              className="bg-[#1F1F1F] hover:bg-black text-white font-semibold px-6 py-2 rounded-full transition-all duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12 text-sm">
        <div>
          <h4 className="font-semibold mb-4">Get some SoulYatri</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Our plans</li>
            <li>Mental health coaching</li>
            <li>Family plan</li>
            <li>For educators</li>
            <li>Send a gift</li>
            <li>Redeem a code</li>
            <li>Share SoulYatri</li>
            <li>SoulYatri for Business</li>
            <li>Admin portal login</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Our content</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Meditation app</li>
            <li>Meditation articles</li>
            <li>Beginning meditation</li>
            <li>Quick meditations</li>
            <li>Meditation courses</li>
            <li>Sleep music</li>
            <li>White noise</li>
            <li>Mindfulness app</li>
            <li>Focus music</li>
            <li>Mindfulness with kids</li>
            <li>Mindful parenting</li>
            <li>Mental health support</li>
            <li>Browse content library</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">About us</h4>
          <ul className="space-y-2 text-gray-600">
            <li>About SoulYatri</li>
            <li>About the app</li>
            <li>Leadership</li>
            <li>Press</li>
            <li>Careers</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Help</li>
            <li>Contact us</li>
            <li>Mental health resources</li>
            <li>Accessibility</li>
            <li>Security</li>
            <li>Cookie policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">My SoulYatri</h4>
          <button className="bg-[#0070F3] hover:bg-[#005bd1] text-white font-semibold px-6 py-2 rounded-full">
            Login
          </button>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Get the app</h4>
          <div className="space-y-2">
            <img src="/appstore.png" alt="App Store" className="h-10" />
            <img src="/googleplay.png" alt="Google Play" className="h-10" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 py-6 text-center text-xs text-gray-500">
        <p>© 2025 SoulYatri Inc.</p>
        <div className="flex justify-center items-center space-x-4 mt-2">
          <a href="#" className="hover:underline">Terms & conditions</a>
          <a href="#" className="hover:underline">Privacy policy</a>
          <a href="#" className="hover:underline">Consumer Health Data</a>
          <a href="#" className="hover:underline">CA Privacy Notice</a>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="h-5" /></a>
          <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="h-5" /></a>
          <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" className="h-5" /></a>
          <a href="#"><img src="/icons/twitter.svg" alt="Twitter" className="h-5" /></a>
          <a href="#"><img src="/icons/youtube.svg" alt="YouTube" className="h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
