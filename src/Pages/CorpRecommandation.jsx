import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import TitleCard from '../Components/TitleCard';
import Footer from '../Components/Footer';
import axios from 'axios';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });

  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [apiResponse, setApiResponse] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [apiDebug, setApiDebug] = useState([]);
  const [inputParams, setInputParams] = useState(null);

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

  // Process API response
  useEffect(() => {
    if (apiResponse.length > 0) {
      const sortedAndCapitalized = [...apiResponse]
        .sort((a, b) => b.price - a.price)
        .map(item => ({
          ...item,
          crop: item.crop.charAt(0).toUpperCase() + item.crop.slice(1),
          status: item.price > 0 ? 'Available' : 'Not available'
        }));
      setRecommendation(sortedAndCapitalized);
    }
  }, [apiResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const testParams = [
      parseFloat(formData.nitrogen),
      parseFloat(formData.phosphorus),
      parseFloat(formData.potassium),
      parseFloat(formData.temperature),
      parseFloat(formData.humidity),
      parseFloat(formData.ph),
      parseFloat(formData.rainfall),
    ];

    try {
      const response = await axios.post('http://localhost:3000/predict', {
        testParams: testParams,
        filters: {
          "filters[State]": selectedState,
          "filters[District]": selectedDistrict
        }
      });

      setApiResponse(response.data.predictions || []);
      setApiDebug(response.data.debug || []);
      setInputParams(response.data.input_params);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center items-center">
        <TitleCard
          title={"Crop Recommendation"}
          text={"Get personalized crop suggestions based on your soil health and local conditions"}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
          {/* Form Section - Reduced width */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Soil Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* State and District Dropdowns */}
                <div className="space-y-6">
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
                </div>

                {/* Soil Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: 'nitrogen', label: 'Nitrogen (N) level', placeholder: 'in mg/kg' },
                    { id: 'phosphorus', label: 'Phosphorus (P) level', placeholder: 'in mg/kg' },
                    { id: 'potassium', label: 'Potassium (K) level', placeholder: 'in mg/kg' },
                    { id: 'ph', label: 'Soil pH Level', placeholder: '0-14 scale', min: 0, max: 14, step: 0.1 },
                    { id: 'temperature', label: 'Average Temperature', placeholder: 'in °C' },
                    { id: 'humidity', label: 'Humidity', placeholder: 'in %' },
                    { id: 'rainfall', label: 'Annual Rainfall', placeholder: 'in millimeters' }
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-gray-700 font-medium mb-2">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
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
              </div>
            </form>
          </div>

          {/* Results Section - Increased width */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recommendation Results</h2>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div role="status">
                  <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-4 text-gray-500">🌱 Analyzing soil for ideal crops, Please wait ...</p>
              </div>
            ) : recommendation ? (
              <div className="space-y-6">
                {/* Input Parameters Summary */}
                {inputParams && (
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Land Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">State:</span> {inputParams.filters['filters[State]']}
                      </div>
                      <div>
                        <span className="font-medium">District:</span> {inputParams.filters['filters[District]']}
                      </div>
                      <div>
                        <span className="font-medium">N-P-K:</span> {inputParams.test_params[0]}-{inputParams.test_params[1]}-{inputParams.test_params[2]}
                      </div>
                      <div>
                        <span className="font-medium">Temperature:</span> {inputParams.test_params[3]}°C
                      </div>
                      <div>
                        <span className="font-medium">Humidity:</span> {inputParams.test_params[4]}%
                      </div>
                      <div>
                        <span className="font-medium">pH:</span> {inputParams.test_params[5]}
                      </div>
                      <div>
                        <span className="font-medium">Rainfall:</span> {inputParams.test_params[6]}mm
                      </div>
                    </div>
                  </div>
                )}

                {/* Crop Recommendations */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800">Recommended Crops</h3>
                  {recommendation.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${index === 0 ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                            <span className="font-medium">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{item.crop}</h3>
                            <p className={`text-sm ${item.price > 0 ? 'text-gray-600' : 'text-gray-500'}`}>
                              {item.price > 0 ? `₹${item.price.toFixed(2)}` : 'Price data not available'}
                            </p>
                          </div>
                        </div>
                        {index === 0 && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Best Match
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Debug Information (collapsible) */}
                {/* {apiDebug.length > 0 && (
                  <details className="mt-6 border rounded-lg overflow-hidden">
                    <summary className="bg-gray-50 px-4 py-2 font-medium text-gray-700 cursor-pointer">
                      Debug Information
                    </summary>
                    <div className="p-4 bg-white text-sm text-gray-600">
                      <ul className="space-y-1">
                        {apiDebug.map((msg, i) => (
                          <li key={i} className="py-1 border-b border-gray-100 last:border-0">• {msg}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )} */}

                {/* Farming Tips */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Farming Tips</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Rotate crops annually to maintain soil fertility
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Monitor soil moisture regularly for optimal growth
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">•</span>
                      Consider intercropping to maximize land use efficiency
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
