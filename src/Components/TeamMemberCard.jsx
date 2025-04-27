import React from 'react'

function TeamMemberCard({image, name, rollNo, responsibility}) {
  return (
    <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gray-200 mb-4 overflow-hidden">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600 mb-2">Roll No: {rollNo}</p>
        <p className="text-gray-700 text-center">{responsibility}</p>
    </div>
  )
}

export default TeamMemberCard
