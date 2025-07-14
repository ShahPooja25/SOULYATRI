// components/Signin.tsx
import { SigninCard } from "../app/bits/Signincard";
import authHeroImg from "../public/assets/hero.png";

const SigninPage = () => {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative">
        <div
          className="w-full h-full bg-gradient-to-br from-[#FF7B00]/20 to-[#18A2B8]/20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255, 123, 0, 0.7), rgba(24, 162, 184, 0.7)), url(${authHeroImg})`,
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 lg:p-12">
            <div className="max-w-lg text-center">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 drop-shadow-lg">
                Welcome Back to Your Journey
              </h1>
              <p className="text-lg lg:text-xl mb-8 drop-shadow-md opacity-90">
                Continue your path of healing and self-discovery. Your spiritual
                growth awaits.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm lg:text-base">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Soul AI Chat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Mood Tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Therapist Matching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signin Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center bg-gradient-to-br from-[#FF7B00]/5 via-white to-[#18A2B8]/5 px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <SigninCard />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
