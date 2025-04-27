import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-5 text-center">
            <p>© {new Date().getFullYear()} CropPilot. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
