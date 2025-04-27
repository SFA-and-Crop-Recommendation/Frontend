import React from 'react';

const PriceCard = ({ priceData }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Card Header */}
            <div className="bg-green-600 px-6 py-3 flex justify-between">
                
                <h3 className="text-xl font-bold text-white">
                    {priceData.commodity} ({priceData.variety})
                </h3>
                
                <p className="text-green-100">grade: {priceData.grade}</p>
            </div>

            {/* Card Body */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="font-medium text-gray-800">
                            {priceData.district}, {priceData.state}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-sm">Market</p>
                        <p className="font-medium text-gray-800">{priceData.market}</p>
                    </div>
                </div>

                <div className="border-t border-b border-gray-100 py-4 my-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Arrival Date</p>
                            <p className="font-medium text-gray-800">{priceData.arrival_date}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">Modal Price</p>
                            <p className="text-2xl font-bold text-green-600">
                                ₹{priceData.modal_price}/Quintal
                            </p>
                        </div>
                    </div>
                </div>

                {/* Price Range */}
                <div className="flex justify-between">
                    <div className="text-center">
                        <p className="text-gray-500 text-sm">Min Price</p>
                        <p className="font-medium text-red-500">₹{priceData.min_price}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500 text-sm">Max Price</p>
                        <p className="font-medium text-green-500">₹{priceData.max_price}</p>
                    </div>
                </div>
            </div>

            {/* Optional Footer */}
            <div className="bg-gray-50 px-6 py-3 flex justify-between">
                <span className="text-xs text-gray-500">
                    Source: data.gov.in
                </span>
                <span className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default PriceCard;