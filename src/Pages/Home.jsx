import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Home_Hero_Section from '../Components/Home_Hero';
import Home_Features_Section from '../Components/Home_Features';
import Home_Work_Section from '../Components/Home_Work'
import Footer from '../Components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/recommendation');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Home_Hero_Section />

        {/* Features Section */}
        <Home_Features_Section />

        {/* How It Works */}
        <Home_Work_Section />

        {/* Final CTA */}
        <section className="my-20 text-center bg-green-50 py-16 rounded-xl max-w-6xl mx-auto px-5">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Ready to Optimize Your Farming?
          </h2>
          <button
            onClick={handleGetStarted}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Start Now - It's Free
          </button>
        </section>
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default Home;
