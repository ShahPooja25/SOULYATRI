"use client";

import { useState } from "react";

const TherapistVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "approved" | "rejected"
  >("pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl text-white">⏳</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Verification in Progress
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-yellow-800 text-xs sm:text-sm">
              <strong>Thank you for registering as a therapist!</strong>
              <br />
              Your application is currently under review by our admin team.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-600">
                Application submitted
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-600">
                Under admin review
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-400">
                Verification email pending
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-gray-400">
                Account activation
              </span>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-800">
              <strong>What happens next?</strong>
              <br />
              Our admin will verify your credentials and send you a confirmation
              email within 24-48 hours.
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] text-white py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistVerification;
