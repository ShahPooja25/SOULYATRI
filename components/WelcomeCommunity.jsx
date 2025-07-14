import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeCommunity = () => {
    const navigate = useNavigate();

    const handleStartPosting = () => {
        navigate('/community/main'); 
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
           
            <div
                className="absolute inset-0 bg-cover bg-center filter brightness-75" 
                style={{
                    //backgroundImage: "url('/background1.jpeg')" 
                    backgroundImage: "url('/background3.jpeg')" 
                }}
            ></div>

          
            <div className="relative z-10 bg-white bg-opacity-90 p-8 md:p-12 rounded-lg shadow-xl max-w-sm md:max-w-md lg:max-w-lg text-center mx-auto flex flex-col justify-between items-center transform -translate-y-0.5 sm:-translate-y-1 md:-translate-y-2 lg:-translate-y-3"> {/* Adjusted positioning and added backdrop */}
               
                <div className="mb-8"> 
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-3">
                        Welcome To Our <br />
                        <span className="text-purple-700 text-4xl md:text-6xl font-bold block mt-2">Soul Community</span>
                    </h2>

                    <p className="mt-4 text-base md:text-lg text-gray-600 px-2 sm:px-0">
                        Our community is a place of warmth and acceptance, <br className="hidden md:block"/> where everyone’s voice is valued and respected.
                    </p>
                </div>

               
                <div className="w-full"> 
                    <button
                        onClick={handleStartPosting}
                        className="w-full bg-black text-white py-3 md:py-4 px-8 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                    >
                        Start Posting →
                    </button>
                </div>

                
                <div className="mt-6 text-sm md:text-base text-gray-500">
                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> • <a href="/terms-conditions" className="hover:underline">Terms & Conditions</a>
                </div>
            </div>
        </div>
    );
};

export default WelcomeCommunity;