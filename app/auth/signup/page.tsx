"use client";

import React from "react";
import { SignupCard } from "../../bits/Signupcard";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18A2B8] via-white to-[#FF7B00] pt-10">
      <div className="max-w-md w-full p-4 md:p-6">
        <SignupCard />
      </div>
    </main>
  );
}
