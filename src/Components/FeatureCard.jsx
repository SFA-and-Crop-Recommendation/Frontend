import React from 'react'

function FeatureCard({symbol, title, text}) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg">
        <div className="text-4xl mb-6">{symbol}</div>
        <h3 className="text-2xl font-semibold text-green-600 mb-4">{title}</h3>
        <p className="text-gray-600">{text}</p>
    </div>
  )
}

export default FeatureCard
