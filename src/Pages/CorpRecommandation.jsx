import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar'
import TitleCard from '../Components/TitleCard';
import Footer from '../Components/Footer';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
    state: '',
    district: '',
  });

  // [N, P, K, Temperature, Humidity, Ph, Rain]

  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [districts, setDistricts] = useState([]);

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockRecommendations = [
        { crop: 'Wheat', probability: 0.85, profitEstimate: '₹42,500 - ₹48,000' },
        { crop: 'Mustard', probability: 0.78, profitEstimate: '₹38,000 - ₹42,000' },
        { crop: 'Barley', probability: 0.72, profitEstimate: '₹35,000 - ₹40,000' }
      ];

      setRecommendation(mockRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full flex flex-col justify-center items-center">
        <TitleCard 
          title={"Crop Recommendation"}
          text={"Get personalized crop suggestions based on your soil health and local conditions"}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Soil Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* State Dropdown */}
                <div>
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                    State
                  </label>
                  <select
                    id="state"
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    required
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
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nitrogen input */}
                <div>
                  <label htmlFor="nitrogen" className="block text-gray-700 font-medium mb-2">
                    Nitrogen (N) level
                  </label>
                  <input
                    type="number"
                    id="nitrogen"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="in mg/kg"
                    required
                  />
                </div>

                {/* Phosphorus input */}
                <div>
                  <label htmlFor="phosphorus" className="block text-gray-700 font-medium mb-2">
                    Phosphorus (P) level
                  </label>
                  <input
                    type="number"
                    id="phosphorus"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="in mg/kg"
                    required
                  />
                </div>

                {/* Potassium Input */}
                <div>
                  <label htmlFor="potassium" className="block text-gray-700 font-medium mb-2">
                    Potassium (K) level
                  </label>
                  <input
                    type="number"
                    id="potassium"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="in mg/kg"
                    required
                  />
                </div>

                {/* Ph of Soil input */}
                <div>
                  <label htmlFor="ph" className="block text-gray-700 font-medium mb-2">
                    Soil pH Level
                  </label>
                  <input
                    type="number"
                    id="ph"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    min="0"
                    max="14"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0-14 scale"
                    required
                  />
                </div>

                {/* Annual Railfal input */}
                <div>
                  <label htmlFor="rainfall" className="block text-gray-700 font-medium mb-2">
                    Annual Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    id="rainfall"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="in millimeters"
                    required
                  />
                </div>

                {/* Temperature Input */}
                <div>
                  <label htmlFor="rainfall" className="block text-gray-700 font-medium mb-2">
                    Average Temperature
                  </label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="in  °C"
                    required
                  />
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
                      Analyzing...
                    </span>
                  ) : (
                    'Get Recommendation'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommendation Results</h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-pulse text-gray-500">
                  Analyzing soil data...
                </div>
              </div>
            ) : recommendation ? (
              <div className="space-y-6">
                {recommendation.map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${index === 0 ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{item.crop}</h3>
                        <p className="text-gray-600">Probability: {(item.probability * 100).toFixed(1)}%</p>
                      </div>
                      {index === 0 && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Best Match
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Estimated Profit:</span> {item.profitEstimate}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg text-gray-800">Tips for Better Yield</h3>
                  <ul className="mt-2 space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Consider crop rotation to maintain soil health
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Test soil every 2-3 years for accurate nutrient levels
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Monitor local weather forecasts for optimal planting times
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Enter your soil details to get crop recommendations</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropRecommendation;
