import React from 'react'
import WorkCard from './WorkCard'

function Home_Work() {
return (
    <section className="my-20 text-center max-w-6xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8">
            <WorkCard
                number={"1"} 
                title={"Enter Soil Details"}
                text={"Provide your soil type and NPK values from soil tests."}
            />
            <WorkCard
                number={"2"}
                title={"Get Analysis"}
                text={"Our system processes your data with market trends."}
            />
            <WorkCard
                  number={"3"}
                  title={"Receive Recommendations"}
                  text={"Get personalized crop suggestions with profit projections."}
            />
        </div>
    </section>
)}

export default Home_Work
