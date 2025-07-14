"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-br from-[#FF7B00]/5 to-[#18A2B8]/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg">
            Ready to start your journey? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
  <CardTitle className="text-2xl text-[#FF7B00]">
    Send us a message
  </CardTitle>
</CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="border-gray-300 focus:border-[#18A2B8] focus:ring-[#18A2B8]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your needs..."
                    rows={5}
                    className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus:border-[#FF7B00] focus:ring-1 focus:ring-[#FF7B00] focus:outline-none resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] hover:from-[#e66a00] hover:to-[#1591a3] text-white font-medium py-3 transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info Cards */}
          <div className="space-y-8">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-[#FF7B00] to-[#18A2B8] text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">📧</span>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-white/80">dhruvpaleja@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">📱</span>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-white/80">+91 84509 29548</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm">📍</span>
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-white/80">India, Mumbai</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 bg-[#FF7B00] bg-clip-text text-transparent">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF7B00] mt-1">✓</span>
                    <span>Personalized approach to healing and growth</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#18A2B8] mt-1">✓</span>
                    <span>Blend of ancient wisdom and modern technology</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FF7B00] mt-1">✓</span>
                    <span>24/7 AI-powered support and guidance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#18A2B8] mt-1">✓</span>
                    <span>Experienced practitioners and coaches</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
