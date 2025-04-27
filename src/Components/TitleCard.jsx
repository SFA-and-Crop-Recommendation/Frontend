import React from 'react'

function TitleCard({title, text}) {
    return (
        <section className="mb-12 w-10/12 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {title}
            </h1>
            <p className="text-lg text-gray-600">
                {text}
            </p>
        </section>
    )
}

export default TitleCard
