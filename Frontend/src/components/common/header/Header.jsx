import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { UserContext } from "../../../UserContext"; // Correct path

const Header = () => {
  const { user, logout } = useContext(UserContext); // Access user context
  const [showMegamenu, setShowMegamenu] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const newsItems = [
    // Your news items
  ];

  const handleMouseEnter = () => setShowMegamenu(true);
  const handleMouseLeave = () => setShowMegamenu(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TrendingSection = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const trendingTexts = [
      // Your trending texts
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % trendingTexts.length);
      }, 3000);

      return () => clearInterval(interval);
    }, [trendingTexts.length]);

    return (
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex items-center">
          <span className="bg-black text-white px-2 py-1 text-sm font-bold mr-4">TRENDING NOW</span>
          <AnimatePresence>
            <motion.p
              key={currentTextIndex}
              className="text-sm text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {trendingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        alert('Logout successful');
        logout(); // Update the context state
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  
  

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex space-x-4">
            {/* Social Media Icons */}
          </div>
          <div className="flex space-x-4">
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-800">CONTACT</Link>
            <Link to="/donation" className="text-sm text-gray-600 hover:text-gray-800">DONATION</Link>
            <Link to="/blogpost" className="text-sm text-gray-600 hover:text-gray-800">BLOGS</Link>
            <Link to="/editorblog" className="text-sm text-gray-600 hover:text-gray-800">ADD BLOG</Link>
           
            <div className="text-sm text-gray-600">FAKE NEWS</div>
            {user.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                LOGOUT
              </button>
            ) : (
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-800">
                SIGN UP OR LOGIN
              </Link>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          {/* Main Header Content */}
        </div>
        <TrendingSection />
        <nav className="py-2 border-t border-b border-gray-200">
          <ul className="flex justify-between items-center">
            {/* Navigation Links */}
          </ul>
        </nav>
      </div>
      {showMegamenu && (
        <div className="absolute left-0 w-full bg-white shadow-lg z-20">
          <div className="container mx-auto px-4 py-8 grid grid-cols-4 gap-8">
            {newsItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover rounded" />
                <span className="text-xs font-bold text-red-600">{item.category}</span>
                <h4 className="font-bold text-sm">
                  <Link to={item.link} className="text-gray-800 hover:text-red-600">
                    {item.title}
                  </Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
