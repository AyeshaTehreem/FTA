import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { UserContext } from '../../UserContext'; // Adjust import path as necessary

const ManageVerifiedNews = () => {
  const { user } = useContext(UserContext);
  const [currentColor, setCurrentColor] = useState('#EF4444'); // Initial red color
  const [verifiedNews, setVerifiedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  // Inline styles for NotAllowed image
  const notAllowedContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const notAllowedImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%'
  };

  useEffect(() => {
    if (!user.isLoggedIn || user.role !== 'admin') {
      // Show NotAllowed message if role is not 'admin'
      return;
    }
    fetchVerifiedNews();
  }, [user]);

  // Function to fetch verified news
  const fetchVerifiedNews = async () => {
    try {
      const response = await axios.get('http://localhost:5002/verifications/requests/statuscount/1', { withCredentials: true });
      setVerifiedNews(response.data);
    } catch (error) {
      console.error('Error fetching verified news:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleResponse = async (id, action) => {
    try {
      await axios.post(`http://localhost:5002/verifications/admin/respond/${id}`, { action }, { withCredentials: true });
      alert('Response submitted successfully.');
      fetchVerifiedNews();
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Failed to submit response.');
    }
  };

  if (!user.isLoggedIn || user.role !== 'admin') {
    return (
      <div style={notAllowedContainerStyle}>
        <img src="/images/popular/not.jpeg" alt="Not Allowed" style={notAllowedImageStyle} />
      </div>
    );
  }

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
          {verifiedNews.map((data) => (
            <div key={data._id} className="bg-white rounded-lg shadow-md p-4 text-center border border-red-500">
              <img
                src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${data.imageUrl}`}
                alt="Verified news"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-red-600 mb-2">{data.user.username}</h3>
              <p className="text-gray-500 mb-4">{data.user.email}</p>
              <div className="flex justify-around items-center">
                {/* Updated Buttons */}
                <button
                  onClick={() => handleResponse(data._id, 'reject')}
                  className="bg-red-600 text-white px-6 py-3 text-lg rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleResponse(data._id, 'accept')}
                  className="bg-white text-red-600 border border-red-600 px-6 py-3 text-lg rounded-md hover:bg-red-50"
                >
                  Accept
                </button>
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

export default ManageVerifiedNews;
