import React, { useEffect, useState } from 'react';
import PriceCard from '../Components/PriceCard';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function LivePrice() {
    const [data, setData] = useState({});
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedMarket, setSelectedMarket] = useState('');
    const [selectedCommodity, setSelectedCommodity] = useState('');
    
    const [districts, setDistricts] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [commodities, setCommodities] = useState([]);
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch prices
    async function viewPrice() {
        if (!selectedCommodity) return;

        setIsLoading(true);
        const RESOURSE_ID = import.meta.env.VITE_RESOURSE_ID
        const GOVT_DATA_API_KEY = import.meta.env.VITE_GOVT_DATA_API_KEY
        const API_URL = `https://api.data.gov.in/resource/${RESOURSE_ID}?api-key=${GOVT_DATA_API_KEY}&offset=0&limit=all&format=json&&filters[commodity]=${selectedCommodity}&filters[state]=${selectedState}&filters[district]=${selectedDistrict}&filters[market]=${selectedMarket}`;

        try {
            const response = await axios.get(API_URL);
            setRecords(response.data.records || []);
        } catch (error) {
            console.log("Error occurs while fetching price");
            setRecords([]);
        } finally {
            setIsLoading(false);
        }
    }

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
            setMarkets([]);
            setSelectedMarket('');
            setCommodities([]);
            setSelectedCommodity('');
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

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full">
                <section className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Live Market Prices</h1>
                    <p className="text-lg text-gray-600">
                        Get current market prices for agricultural commodities
                    </p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Prices</h2>

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
                                    Commodity
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

                            <button
                                onClick={viewPrice}
                                disabled={!selectedCommodity || isLoading}
                                className={`w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 ${(!selectedCommodity || isLoading) ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </span>
                                ) : (
                                    'View Prices'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2 bg-white p-8 pt-5 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
                            {selectedCommodity ? `${selectedCommodity} Prices` : 'Price Results'}
                        </h2>

                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-pulse text-gray-500">
                                    Loading price data...
                                </div>
                            </div>
                        ) : records.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {records.map((record, index) => (
                                    <PriceCard
                                        key={`${record.commodity}-${record.market}-${index}`}
                                        priceData={record}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p>No price records available</p>
                                <p className="text-sm mt-2">Select filters and click "View Prices" to see market data</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default LivePrice;