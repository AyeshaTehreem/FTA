import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [currentColor, setCurrentColor] = useState('#EF4444'); // Initial red color
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/verifications/reports', {
          withCredentials: true, // Include cookies for authentication
        });
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error.response ? error.response.data : error.message);
      }
    };

    fetchReports();
  }, []);

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
          {reports.map((report, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center border border-red-500">
              <img
                src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${report.imageUrl}`}
                alt="Verification"
                className="w-full h-64 object-cover rounded-md mb-4"
                style={{ aspectRatio: '1 / 1' }} // Ensure image is square
              />
              <h2 className="text-xl font-semibold text-red-600 mb-2">User</h2> {/* Update as needed */}
              <p className="text-gray-500 mb-2">Email: user@example.com</p> {/* Update as needed */}
              <p className="text-gray-700 mb-4">{report.responses.map(response => response.response).join(', ')}</p>
              <p className={`font-bold ${report.status === 'Fake' ? 'text-red-600' : report.status === 'Real' ? 'text-green-600' : 'text-yellow-600'}`}>
                Status: {report.status}
              </p>
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
