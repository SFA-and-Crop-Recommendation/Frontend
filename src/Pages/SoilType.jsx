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

    // Function to handle file upload and prediction
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        //  Check if file is an image
        const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validImageTypes.includes(file.type)) {
            alert("Only image files (JPG, JPEG, PNG, WEBP) are allowed.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setPredictions(null);

        try {
            // Step 1: Upload image to Node.js server
            const response = await axios.post("http://localhost:3000/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImageUrl(response.data.url);

            const result = await axios.post("http://localhost:3000/predictSoil", {
                imageUrl
            });

            console.log("Result:", result.data);
            setPredictions(result.data);

        } catch (err) {
            console.error("Error during upload/prediction:", err);
            alert("Something went wrong. Check the console for details.");
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

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Soil Type Prediction</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-700 font-medium">
                                                Predicted Soil Type:
                                            </span>
                                            <span className="capitalize bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {predictions.predicted_class.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-700 font-medium">
                                                Confidence Level:
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {Math.round(predictions.confidence * 10) / 10}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional information can be added here when available */}
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Soil Information</h3>
                                    <p className="text-gray-600">
                                        {predictions.predicted_class === 'Lateritic_soil' &&
                                            "Lateritic soil is rich in iron and aluminum, typically found in hot and wet tropical areas. It's good for crops that thrive in well-drained, acidic conditions."}
                                    </p>
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