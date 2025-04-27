import React from 'react'
import FeatureCard from './FeatureCard'

function Home_Features() {
    return (
        <section className="my-20 text-center max-w-6xl mx-auto px-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Use Our System?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    symbol={"🌱"} 
                    title={"Soil-Specific"} 
                    text={"Recommendations tailored to your soil's N, P, K values and type."}
                />

                <FeatureCard
                    symbol={"📈"}
                    title={"Market-Aware"}
                    text={"Considers future market prices to suggest the most profitable crops."}
                />

                <FeatureCard
                    symbol={"🤖"}
                    title={"AI-Powered"}
                    text={"Advanced algorithms analyze multiple factors for optimal results."}
                />
                
            </div>
        </section>
    )
}

export default Home_Features
