import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { UserContext } from '../../UserContext';  // Adjust import path as necessary
import { X, Check } from 'lucide-react';

const PendingImage = () => {
  const { user } = useContext(UserContext);
  const [currentColor, setCurrentColor] = useState('#EF4444');
  const [pendingImages, setPendingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    if (user.isLoggedIn && user.role === 'verifier') {
      fetchPendingImages();
    }
  }, [user]);

  const fetchPendingImages = async () => {
    try {
      const response = await axios.get('http://localhost:5002/verifications/pending', { withCredentials: true });
      setPendingImages(response.data.reverse());
    } catch (error) {
      console.error('Error fetching pending images:', error);
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

  const handleResponse = async (id, response) => {
    try {
      await axios.post(`http://localhost:5002/verifications/${id}/respond`, { response }, { withCredentials: true });
      alert('Response submitted successfully.');
      fetchPendingImages();
      setSelectedImage(null);
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Failed to submit response.');
    }
  };

  if (!user.isLoggedIn || user.role !== 'verifier') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <img src="/images/popular/not.jpeg" alt="Not Allowed" className="max-w-full max-h-full object-contain" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

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
        <motion.h1
          className="text-7xl font-bold text-center mb-16"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ color: currentColor }}
        >
          Pending Verifications
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingImages.map((data) => (
            <motion.div
              key={data._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${data.imageUrl}`}
                alt="Pending verification"
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => setSelectedImage(data)}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-red-600 mb-2">{data.user?.username || 'Unknown User'}</h3>
                <p className="text-gray-500 mb-4">{data.user?.email || 'No Email Provided'}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleResponse(data._id, 'Fake')}
                    className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center"
                  >
                    <X className="mr-2" /> Fake
                  </button>
                  <button
                    onClick={() => handleResponse(data._id, 'Real')}
                    className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 flex items-center"
                  >
                    <Check className="mr-2" /> Real
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-gray-300"
        style={{ scaleX: pathLength }}
      />

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
            <img
              src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${selectedImage.imageUrl}`}
              alt="Full size"
              className="w-full h-auto max-h-[80vh] object-contain mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleResponse(selectedImage._id, 'Fake')}
                className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 flex items-center"
              >
                <X className="mr-2" /> Fake
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
              >
                Close
              </button>
              <button
                onClick={() => handleResponse(selectedImage._id, 'Real')}
                className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 flex items-center"
              >
                <Check className="mr-2" /> Real
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingImage;