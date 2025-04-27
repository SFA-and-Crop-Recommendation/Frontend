import React from 'react'
import backgroundImage from "./../assets/Background-Image_1.jpeg"
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';


function Home_Rero_Section() {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate('/recommendation');
    };
    return (
        <section className="flex flex-col md:flex-row items-center gap-10 mb-16 max-w-6xl mx-auto px-5 py-8 mt-8">
            <ImageSlider />
            {/* <div className="flex-1">
                <img
                    src={backgroundImage}
                    alt="Happy farmer with crops"
                    className="w-full rounded-lg shadow-xl"
                />
            </div> */}
            <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Smart Crop Recommendation System
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Maximize your farm's profitability with AI-powered crop recommendations
                    based on soil health and market trends.
                </p>
                <button
                    onClick={handleGetStarted}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                    Get Personalized Recommendation
                </button>
            </div>
        </section>
    )
}

export default Home_Rero_Section
