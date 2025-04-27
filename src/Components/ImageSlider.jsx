import React, { useState, useEffect } from 'react';
import image1 from '../assets/Slider_1.jpg';
import image2 from '../assets/Slider_2.jpg';
import image3 from '../assets/Slider_3.jpg';
import image4 from '../assets/Slider_4.jpg';
import image5 from '../assets/Slider_5.jpg';
import image6 from '../assets/Slider_6.jpg';

const ImageSlider = () => {
    const images = [image1, image2, image3, image4, image5, image6];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            // Disable transition when we're at the last image
            if (currentIndex === images.length - 1) {
                setTransitionEnabled(false);
            }
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

            // Re-enable transition after a small delay
            setTimeout(() => {
                if (currentIndex === images.length - 1) {
                    setTransitionEnabled(true);
                }
            }, 10);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    // Clone first image and add to end for seamless transition
    const extendedImages = [...images, images[0]];

    return (
        <div className="flex-1 relative overflow-hidden">
            <div
                className="flex"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: transitionEnabled ? 'transform 1000ms ease-in-out' : 'none'
                }}
            >
                {extendedImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img
                            src={image}
                            alt={`Happy farmer with crops ${index + 1}`}
                            className="w-full rounded-lg shadow-xl"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setTransitionEnabled(true);
                        }}
                        className={`w-3 h-3 rounded-full ${currentIndex % images.length === index ? 'bg-green-600' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;