import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';

const Report = () => {
  // Dummy data for the report
  const dummyReports = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/300',
      username: 'user1',
      email: 'user1@example.com',
      description: 'This image was flagged as fake based on the verification results.',
      status: 'Fake',
      date: '2024-09-15',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300',
      username: 'user2',
      email: 'user2@example.com',
      description: 'This image was verified as real after careful analysis.',
      status: 'Real',
      date: '2024-09-14',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/300',
      username: 'user3',
      email: 'user3@example.com',
      description: 'Further investigation is required for this image.',
      status: 'Pending',
      date: '2024-09-13',
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ backgroundColor: currentColor }}
        className="fixed top-0 left-0 right-0 h-2 z-50"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Report Heading with Animation */}
        <motion.h1
          className="text-7xl font-bold text-center mb-16"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ color: currentColor }} // Apply dynamic color based on scroll position
        >
          Verification Reports
        </motion.h1>

        {/* Grid to Display Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyReports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-6 text-center border border-red-500">
              <img
                src={report.imageUrl}
                alt="Verification"
                className="w-full h-64 object-cover rounded-md mb-4"
                style={{ aspectRatio: '1 / 1' }} // Ensure image is square
              />
              <h2 className="text-xl font-semibold text-red-600 mb-2">{report.username}</h2>
              <p className="text-gray-500 mb-2">Email: {report.email}</p>
              <p className="text-gray-700 mb-4">{report.description}</p>
              <p className={`font-bold ${report.status === "Fake" ? "text-red-600" : report.status === "Real" ? "text-green-600" : "text-yellow-600"}`}>
                Status: {report.status}
              </p>
              <p className="text-gray-500 text-sm mt-2">Date: {report.date}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Progress Bar Bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-gray-300"
        style={{ scaleX: pathLength }}
      />
    </div>
  );
};

export default Report;
