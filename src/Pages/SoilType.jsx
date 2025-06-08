
// import React, { useEffect, useState } from 'react';
// import PriceCard from '../Components/PriceCard';
// import axios from 'axios';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';

// function SoilType() {
//     const [data, setData] = useState({});
//     const [selectedState, setSelectedState] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [selectedMarket, setSelectedMarket] = useState('');
//     const [selectedCommodity, setSelectedCommodity] = useState('');

//     const [districts, setDistricts] = useState([]);
//     const [markets, setMarkets] = useState([]);
//     const [commodities, setCommodities] = useState([]);
//     const [records, setRecords] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     // Fetch prices
//     async function viewPrice() {
//         if (!selectedCommodity) return;

//         setIsLoading(true);
//         const RESOURSE_ID = import.meta.env.VITE_RESOURSE_ID
//         const GOVT_DATA_API_KEY = import.meta.env.VITE_GOVT_DATA_API_KEY
//         const API_URL = `https://api.data.gov.in/resource/${RESOURSE_ID}?api-key=${GOVT_DATA_API_KEY}&offset=0&limit=all&format=json&&filters[commodity]=${selectedCommodity}&filters[state]=${selectedState}&filters[district]=${selectedDistrict}&filters[market]=${selectedMarket}`;

//         try {
//             const response = await axios.get(API_URL);
//             setRecords(response.data.records || []);
//         } catch (error) {
//             console.log("Error occurs while fetching price");
//             setRecords([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     // Load Dropdown data
//     useEffect(() => {
//         fetch('/nested_filters.json')
//             .then(res => res.json())
//             .then(json => setData(json.states))
//             .catch(err => console.error("Error loading filters:", err));
//     }, []);

//     // When state changes, update districts
//     useEffect(() => {
//         if (selectedState && data[selectedState]) {
//             const newDistricts = Object.keys(data[selectedState].districts);
//             setDistricts(newDistricts);
//             setSelectedDistrict('');
//             setMarkets([]);
//             setSelectedMarket('');
//             setCommodities([]);
//             setSelectedCommodity('');
//         }
//     }, [selectedState, data]);

//     // When district changes, update markets
//     useEffect(() => {
//         if (selectedState && selectedDistrict && data[selectedState]?.districts[selectedDistrict]) {
//             const newMarkets = Object.keys(
//                 data[selectedState].districts[selectedDistrict].markets
//             );
//             setMarkets(newMarkets);
//             setSelectedMarket('');
//             setCommodities([]);
//             setSelectedCommodity('');
//         }
//     }, [selectedDistrict, selectedState, data]);

//     // When market changes, update commodities
//     useEffect(() => {
//         if (selectedState && selectedDistrict && selectedMarket) {
//             const newCommodities =
//                 data[selectedState]?.districts[selectedDistrict]?.markets[selectedMarket] || [];
//             setCommodities(newCommodities);
//             setSelectedCommodity('');
//         }
//     }, [selectedMarket, selectedState, selectedDistrict, data]);

//     return (
//         <div className="min-h-screen flex flex-col bg-gray-50">
//             <Navbar />

//             <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full">
//                 <section className="mb-12">
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">Live Market Prices</h1>
//                     <p className="text-lg text-gray-600">
//                         Get current market prices for agricultural commodities
//                     </p>
//                 </section>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Form Section */}
//                     <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-md">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Prices</h2>

//                         <div className="space-y-6">
//                             {/* State Dropdown */}
//                             <div>
//                                 <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
//                                     State
//                                 </label>
//                                 <select
//                                     id="state"
//                                     value={selectedState}
//                                     onChange={e => setSelectedState(e.target.value)}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                                 >
//                                     <option value="">Select State</option>
//                                     {Object.keys(data).map(state => (
//                                         <option key={state} value={state}>
//                                             {state}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* District Dropdown */}
//                             <div>
//                                 <label htmlFor="district" className="block text-gray-700 font-medium mb-2">
//                                     District
//                                 </label>
//                                 <select
//                                     id="district"
//                                     value={selectedDistrict}
//                                     onChange={e => setSelectedDistrict(e.target.value)}
//                                     disabled={!districts.length}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
//                                 >
//                                     <option value="">Select District</option>
//                                     {districts.map(district => (
//                                         <option key={district} value={district}>
//                                             {district}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Market Dropdown */}
//                             <div>
//                                 <label htmlFor="market" className="block text-gray-700 font-medium mb-2">
//                                     Market
//                                 </label>
//                                 <select
//                                     id="market"
//                                     value={selectedMarket}
//                                     onChange={e => setSelectedMarket(e.target.value)}
//                                     disabled={!markets.length}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
//                                 >
//                                     <option value="">Select Market</option>
//                                     {markets.map(market => (
//                                         <option key={market} value={market}>
//                                             {market}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Commodity Dropdown */}
//                             <div>
//                                 <label htmlFor="commodity" className="block text-gray-700 font-medium mb-2">
//                                     Commodity
//                                 </label>
//                                 <select
//                                     id="commodity"
//                                     value={selectedCommodity}
//                                     onChange={e => setSelectedCommodity(e.target.value)}
//                                     disabled={!commodities.length}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
//                                 >
//                                     <option value="">Select Commodity</option>
//                                     {commodities.map(commodity => (
//                                         <option key={commodity} value={commodity}>
//                                             {commodity}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <button
//                                 onClick={viewPrice}
//                                 disabled={!selectedCommodity || isLoading}
//                                 className={`w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${(!selectedCommodity || isLoading) ? 'opacity-75 cursor-not-allowed' : ''}`}
//                             >
//                                 {isLoading ? (
//                                     <span className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Loading...
//                                     </span>
//                                 ) : (
//                                     'View Prices'
//                                 )}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Results Section */}
//                     <div className="lg:col-span-2 bg-white p-8 pt-5 rounded-xl shadow-md">
//                         <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
//                             {selectedCommodity ? `${selectedCommodity} Prices` : 'Price Results'}
//                         </h2>

//                         {isLoading ? (
//                             <div className="flex items-center justify-center py-12">
//                                 <div className="animate-pulse text-gray-500">
//                                     Loading price data...
//                                 </div>
//                             </div>
//                         ) : records.length > 0 ? (
//                             <div className="grid grid-cols-1 gap-6">
//                                 {records.map((record, index) => (
//                                     <PriceCard
//                                         key={`${record.commodity}-${record.market}-${index}`}
//                                         priceData={record}
//                                     />
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-12 text-gray-500">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <p>No price records available</p>
//                                 <p className="text-sm mt-2">Select filters and click "View Prices" to see market data</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// }

// export default SoilType;


import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function SoilType() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Create preview URL
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
        } else {
            setPreviewUrl("");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setPredictions(null);

        try {
            // Step 1: Upload image
            const uploadRes = await axios.post("http://127.0.0.1:8000/upload", formData);
            const imageUrl = uploadRes.data.url;
            setImageUrl(imageUrl);

            // Step 2: Predict using the uploaded image URL
            const predictRes = await axios.post("http://127.0.0.1:8000/predict", {
                image_url: imageUrl
            });

            setPredictions(predictRes.data.predictions);
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full">
                <section className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Soil Type Analysis</h1>
                    <p className="text-lg text-gray-600">
                        Upload an image of soil to analyze its composition and type
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Soil Image</h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="soil-image" className="block text-gray-700 font-medium mb-2">
                                    Soil Image
                                </label>
                                <input
                                    type="file"
                                    id="soil-image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            {previewUrl && (
                                <div className="mt-4">
                                    <h3 className="text-gray-700 font-medium mb-2">Image Preview</h3>
                                    <img
                                        src={previewUrl}
                                        alt="Soil preview"
                                        className="w-full h-auto rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}

                            <button
                                onClick={handleUpload}
                                disabled={!file || loading}
                                className={`w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${(!file || loading) ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </span>
                                ) : (
                                    'Analyze Soil'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2 bg-white p-8 pt-5 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
                            Soil Analysis Results
                        </h2>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-pulse text-gray-500">
                                    Analyzing soil composition...
                                </div>
                            </div>
                        ) : predictions ? (
                            <div className="space-y-6">
                                {imageUrl && (
                                    <div className="flex justify-center">
                                        <img
                                            src={imageUrl}
                                            alt="Analyzed soil"
                                            className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                                        />
                                    </div>
                                )}

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Soil Composition</h3>
                                    <ul className="space-y-3">
                                        {predictions.map((prediction, index) => (
                                            <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                                                <span className="text-gray-700 font-medium capitalize">
                                                    {prediction.description}
                                                </span>
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {Math.round(prediction.probability * 100)}%
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Recommended Crops</h3>
                                    <p className="text-gray-600">
                                        Based on the soil analysis, the following crops are recommended for cultivation:
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {predictions[0]?.recommended_crops?.map((crop, i) => (
                                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {crop}
                                            </span>
                                        )) || (
                                                <span className="text-gray-500">No specific crop recommendations available</span>
                                            )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>No analysis results available</p>
                                <p className="text-sm mt-2">Upload a soil image and click "Analyze Soil" to get results</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default SoilType;