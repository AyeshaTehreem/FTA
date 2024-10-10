import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';

const ViewVerifiedNews = () => {
  const [currentColor, setCurrentColor] = useState('#10B981'); // Initial green color
  const [verifiedNews, setVerifiedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    fetchVerifiedNews();
  }, []);

  // Function to fetch verified news
  const fetchVerifiedNews = async () => {
    try {
      const response = await axios.get('http://localhost:5002/verifications/requests/statuscount/2', { withCredentials: true });
      setVerifiedNews(response.data.reverse());
    } catch (error) {
      console.error('Error fetching verified news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const colors = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B'];
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

  if (loading) {
    return <p>Loading...</p>;
  }

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
        {/* Verified News Heading with Animation */}
        <motion.h1
          className="text-7xl font-bold text-center mb-16"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ color: currentColor }}
        >
          Verified News
        </motion.h1>

        {/* Grid to display verified news cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedNews.slice().reverse().map((data) => (
            <div key={data._id} className="bg-white rounded-lg shadow-md p-4 text-center border border-green-500">
              <img
                src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${data.imageUrl}`}
                alt="Verified News"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className={`text-lg font-bold ${data.status === 'Verified' ? 'text-green-600' : data.status === 'Rejected' ? 'text-red-600' : 'text-gray-600'}`}>
                {data.status === 'Verified' ? 'Real' : data.status === 'Rejected' ? 'Fake' : data.status}
              </div>
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

export default ViewVerifiedNews;
