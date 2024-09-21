import React from 'react'
import backgroundImage from "./../assets/Background-Image_1.jpeg"
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <div 
    style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', filter:'grayscale(0%)'}}
    className="flex flex-col"
    >
      <Navbar />
      <h1 className='flex justify-center mt-10 text-3xl font-semibold'>
        This is Home Page
      </h1>
    </div>
  )
}

export default Home
