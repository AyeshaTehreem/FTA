import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';

const PendingImage = () => {
  const [currentColor, setCurrentColor] = useState('#EF4444'); // Initial red color
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / pageHeight;
      const colorIndex = Math.floor(scrollPercentage * colors.length);
      setCurrentColor(colors[colorIndex]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dummy data for testing with dummy image URLs
  const dummyData = [
    { id: 1, imageUrl: 'https://via.placeholder.com/150', username: 'user1', email: 'user1@example.com' },
    { id: 2, imageUrl: 'https://via.placeholder.com/150', username: 'user2', email: 'user2@example.com' },
    { id: 3, imageUrl: 'https://via.placeholder.com/150', username: 'user3', email: 'user3@example.com' },
    { id: 4, imageUrl: 'https://via.placeholder.com/150', username: 'user4', email: 'user4@example.com' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <motion.div
        style={{ backgroundColor: currentColor }}
        className="fixed top-0 left-0 right-0 h-2 z-50"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Pending Requests Heading with the same Contact page animation */}
        <motion.h1 
          className="text-7xl font-bold text-center mb-16"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ color: currentColor }}
        >
          Pending Requests
        </motion.h1>

        {/* Grid to display pending image cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyData.map((data) => (
            <div key={data.id} className="bg-white rounded-lg shadow-md p-4 text-center border border-red-500">
              <img src={data.imageUrl} alt="Pending verification" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-red-600 mb-2">{data.username}</h3>
              <p className="text-gray-500 mb-4">{data.email}</p>
              <div className="flex justify-around items-center">
                {/* Updated Buttons */}
                <button className="bg-red-600 text-white px-6 py-3 text-lg rounded-md hover:bg-red-700">
                  Fake
                </button>
                <button className="bg-white text-red-600 border border-red-600 px-6 py-3 text-lg rounded-md hover:bg-red-50">
                  Real
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-gray-300"
        style={{ scaleX: pathLength }}
      />
    </div>
  );
};

export default PendingImage;
