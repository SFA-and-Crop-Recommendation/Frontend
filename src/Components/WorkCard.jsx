import React from 'react'

function WorkCard({number, title, text}) {
    return (
        <div className="flex-1 bg-gray-50 p-8 rounded-xl relative pt-16">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                {number}
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {title}
            </h3>
            <p className="text-gray-600">
                {text}
            </p>
        </div>
    )
}

export default WorkCard
