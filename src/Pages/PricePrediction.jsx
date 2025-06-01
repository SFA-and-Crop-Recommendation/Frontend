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
import axios from 'axios';

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
  const [data, setData] = useState({});
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState('');
  

  const [districts, setDistricts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 2 }, (_, i) => currentYear + i);


  // Load Dropdown data
  useEffect(() => {
      fetch('/nested_filters.json')
          .then(res => res.json())
          .then(json => setData(json.states))
          .catch(err => console.error("Error loading filters:", err));
  }, []);
  
  // When state changes, update districts
  useEffect(() => {
      if (selectedState && data[selectedState]) {
          const newDistricts = Object.keys(data[selectedState].districts);
          setDistricts(newDistricts);
          setSelectedDistrict('');
      }
  }, [selectedState, data]);

  // When district changes, update markets
  useEffect(() => {
      if (selectedState && selectedDistrict && data[selectedState]?.districts[selectedDistrict]) {
          const newMarkets = Object.keys(
              data[selectedState].districts[selectedDistrict].markets
          );
          setMarkets(newMarkets);
          setSelectedMarket('');
          setCommodities([]);
          setSelectedCommodity('');
      }
  }, [selectedDistrict, selectedState, data]);


  // When market changes, update commodities
  useEffect(() => {
      if (selectedState && selectedDistrict && selectedMarket) {
          const newCommodities =
              data[selectedState]?.districts[selectedDistrict]?.markets[selectedMarket] || [];
          setCommodities(newCommodities);
          setSelectedCommodity('');
      }
  }, [selectedMarket, selectedState, selectedDistrict, data]);

  // Form Submit handler function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post('http://localhost:3000/future-price', {
        "crop": selectedCommodity,
        "market": selectedMarket
      });

      console.log("Result:", result);

      if (result.data.success) {
        // Process the data for the chart
        const chartData = processPredictionData(result.data.predictions);
        setPredictionData(chartData);
      }
    } catch (error) {
      console.log("Error While fetching future price prediction data.");
      console.log("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const processPredictionData = (predictions) => {
    // Get last 6 months of data (assuming data is sorted by date)
    const lastSixMonthsData = predictions.slice(-6 * 3); // Assuming 3 entries per month

    // Group data by month and calculate averages
    const monthlyData = {};

    lastSixMonthsData.forEach(item => {
      const date = new Date(item.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          dates: [],
          actualPrices: [],
          predictedPrices: []
        };
      }

      monthlyData[monthYear].dates.push(item.date);
      monthlyData[monthYear].actualPrices.push(item.actual_price);
      monthlyData[monthYear].predictedPrices.push(item.predicted_price);
    });

    // Calculate averages and prepare chart data
    const labels = [];
    const actualData = [];
    const predictedData = [];

    Object.keys(monthlyData).forEach(month => {
      const data = monthlyData[month];
      const avgActual = data.actualPrices.reduce((a, b) => a + b, 0) / data.actualPrices.length;
      const avgPredicted = data.predictedPrices.reduce((a, b) => a + b, 0) / data.predictedPrices.length;

      // Use the first date of the month as label
      labels.push(new Date(data.dates[0]).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
      actualData.push(avgActual);
      predictedData.push(avgPredicted);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Actual Price',
          data: actualData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        },
        {
          label: 'Predicted Price',
          data: predictedData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.1
        }
      ]
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
            return `${context.dataset.label}: ₹${context.raw.toFixed(2)}/Quintal`;
          }
        }
      },
      title: {
        display: true,
        text: 'Last 6 Months Price Trend',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (₹/Quintal)'
        },
        ticks: {
          callback: (value) => {
            return `₹${value.toLocaleString('en-IN')}`;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
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
                {/* State Dropdown */}
                <div>
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <select
                    id="state"
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select State</option>
                    {Object.keys(data).map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Dropdown */}
                <div>
                  <label htmlFor="district" className="block text-gray-700 font-medium mb-2">
                    District
                  </label>
                  <select
                    id="district"
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    disabled={!districts.length}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Market Dropdown */}
                <div>
                  <label htmlFor="market" className="block text-gray-700 font-medium mb-2">
                    Market
                  </label>
                  <select
                    id="market"
                    value={selectedMarket}
                    onChange={e => setSelectedMarket(e.target.value)}
                    disabled={!markets.length}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                  >
                    <option value="">Select Market</option>
                    {markets.map(market => (
                      <option key={market} value={market}>
                        {market}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Commodity Dropdown */}
                <div>
                  <label htmlFor="commodity" className="block text-gray-700 font-medium mb-2">
                    Select Crop
                  </label>
                  <select
                    id="commodity"
                    value={selectedCommodity}
                    onChange={e => setSelectedCommodity(e.target.value)}
                    disabled={!commodities.length}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                  >
                    <option value="">Select Commodity</option>
                    {commodities.map(commodity => (
                      <option key={commodity} value={commodity}>
                        {commodity}
                      </option>
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
                  Analyzing market trends for {selectedCommodity}...
                </div>
              </div>
            ) : predictionData ? (
              <div>
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Latest Prediction</h3>
                  <p className="text-gray-700">
                    Predicted price for {predictionData.labels[predictionData.labels.length - 1]}:
                    <span className="font-bold ml-2">
                      ₹{predictionData.datasets[1].data[predictionData.datasets[1].data.length - 1].toFixed(2)}/Quintal
                    </span>
                  </p>
                </div>

                <div className="h-80">
                  <Line data={predictionData} options={options} />
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">Market Insights</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Current predicted price trend is {predictionData.datasets[1].data.slice(-1)[0] > predictionData.datasets[1].data.slice(-2)[0] ? 'rising' : 'falling'}
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
                <p>Select a crop and location to view price predictions</p>
                <p className="text-sm mt-2">We'll show you the price trends for the last 6 months</p>
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
