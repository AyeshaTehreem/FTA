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
    { img: "/images/life/life1.jpg", link: "/news/item1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing.", category: "FASHION" },
    { img: "/images/gallery/g2.jpg", link: "/news/item2", title: "Proin quis massa tincidunt justo cursus dapibus.", category: "SPORTS" },
    { img: "/images/gallery/g3.jpg", link: "/news/item3", title: "Nulla hendrerit dui in erat varius vestibulum.", category: "TRAVEL" },
    { img: "/images/gallery/g4.jpg", link: "/news/item4", title: "Maecenas dictum lacus in bibendum commodo.", category: "BUSINESS" },
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
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      "When an unknown printer took a galley of type and scrambled it to make a type specimen book."
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
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-youtube"></i></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-vimeo-v"></i></a>
          </div>
          <div className="flex space-x-4">
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-800">CONTACT</Link>
            <Link to="/donation" className="text-sm text-gray-600 hover:text-gray-800">DONATION</Link>
            <Link to="/blogpost" className="text-sm text-gray-600 hover:text-gray-800">BLOGS</Link>
            
            <div className="text-sm text-gray-600">CURRENCY: USD</div>
            <div className="text-sm text-gray-600">WISHLIST: 12</div>
            
            {/* Conditionally render "ADD BLOG" button based on user role */}
            {user.isLoggedIn && user.role === 'editor' && (
              <Link to="/editorblog" className="text-sm text-gray-600 hover:text-gray-800">
                ADD BLOG
              </Link>
            )}
            
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
          <button className="text-2xl">☰</button>
          <Link to="/" className="text-4xl font-bold">
            <span className="text-gray-800">FTA</span>
            <span className="text-red-600">TIMES.</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-2xl">
              {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}
            </div>
            <select className="bg-gray-100 rounded px-2 py-1">
              <option>En</option>
            </select>
          </div>
        </div>
        <TrendingSection />
        <nav className="py-2 border-t border-b border-gray-200">
          <ul className="flex justify-between items-center">
            <li className="relative group">
              <Link to="/" className="text-sm font-semibold transition-colors duration-200 flex items-center text-gray-800 hover:text-red-600">
                HOME
              </Link>
            </li>
            <li 
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/mega-menu" className="text-sm font-semibold transition-colors duration-200 flex items-center text-gray-800 hover:text-red-600">
                MEGA MENU ▼
              </Link>
            </li>
            <li className="relative group">
              <Link to="/pages" className="text-sm font-semibold transition-colors duration-200 flex items-center text-red-600">
                PAGES ▼
              </Link>
            </li>
            <li className="relative group">
              <Link to="/aboutpage" className="text-sm font-semibold transition-colors duration-200 flex items-center text-gray-800 hover:text-red-600">
                ABOUT US
              </Link>
            </li>
            <li className="relative group">
              <Link to="/typography" className="text-sm font-semibold transition-colors duration-200 flex items-center text-gray-800 hover:text-red-600">
                TYPOGRAPHY
              </Link>
            </li>
            <li className="relative group">
              <Link to="/contact" className="text-sm font-semibold transition-colors duration-200 flex items-center text-gray-800 hover:text-red-600">
                CONTACT
              </Link>
            </li>
            <li className="relative group">
              <Link to="/faq" className="text-sm font-semibold transition-colors duration-200 flex items-center text-gray-800 hover:text-red-600">
                FAQ
              </Link>
            </li>
            <li>
              <button className="text-gray-600 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v12h12V4H4z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
