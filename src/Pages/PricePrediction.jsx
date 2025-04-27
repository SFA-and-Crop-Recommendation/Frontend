import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import TitleCard from '../Components/TitleCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LivePricePrediction = () => {
  const [crop, setCrop] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [cropOptions, setCropOptions] = useState([
    'Wheat', 'Rice', 'Maize', 'Soybean', 'Cotton',
    'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Chilli'
  ]);

  // Generate month and year options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 2 }, (_, i) => currentYear + i);

  useEffect(() => {
    // Set default month and year to current
    const currentMonth = months[currentDate.getMonth()];
    setMonth(currentMonth);
    setYear(currentYear.toString());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockData = generateMockData(crop, month, year);
      setPredictionData(mockData);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockData = (crop, baseMonth, baseYear) => {
    const baseMonthIndex = months.indexOf(baseMonth);
    const basePrice = Math.floor(Math.random() * 5000) + 1000; // Random base price

    const labels = [];
    const data = [];

    // Generate 12 months data starting from selected month/year
    for (let i = 0; i < 12; i++) {
      const monthIndex = (baseMonthIndex + i) % 12;
      const year = baseYear + Math.floor((baseMonthIndex + i) / 12);
      labels.push(`${months[monthIndex]} ${year}`);

      // Generate price with some variation
      const variation = Math.sin(i * 0.5) * 0.3 + (Math.random() * 0.2 - 0.1);
      const price = basePrice * (1 + variation);
      data.push(Math.round(price));
    }

    return {
      labels,
      datasets: [{
        label: `Predicted Price for ${crop} (₹/Quintal)`,
        data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true
      }]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `₹${context.raw.toLocaleString('en-IN')}/Quintal`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => {
            return `₹${value.toLocaleString('en-IN')}`;
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full flex flex-col items-center">
        <TitleCard 
          title={"Future Price Prediction of Crop"}
          text={"Get future price trends for your crops to plan your harvest and sales"}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Crop Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="crop" className="block text-gray-700 font-medium mb-2">
                    Crop Name
                  </label>
                  <select
                    id="crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select a crop</option>
                    {cropOptions.map((crop) => (
                      <option key={crop} value={crop}>{crop}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="month" className="block text-gray-700 font-medium mb-2">
                    Starting Month
                  </label>
                  <select
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="year" className="block text-gray-700 font-medium mb-2">
                    Starting Year
                  </label>
                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Predicting...
                    </span>
                  ) : (
                    'Get Price Prediction'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Price Prediction</h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse text-gray-500">
                  Analyzing market trends for {crop}...
                </div>
              </div>
            ) : predictionData ? (
              <div>
                <div className="h-80">
                  <Line data={predictionData} options={options} />
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">Market Insights</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Prices typically peak around {months[Math.floor(Math.random() * 12)]} for this crop
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Consider storing harvest if prices are predicted to rise in coming months
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Current demand is {['high', 'moderate', 'low'][Math.floor(Math.random() * 3)]} in your region
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Select a crop and date to view price predictions</p>
                <p className="text-sm mt-2">We'll show you 12 months of price trends from your selected date</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LivePricePrediction;
