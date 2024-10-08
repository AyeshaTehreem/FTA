import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
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
            <div className="text-sm text-gray-600">CURRENCY: USD</div>
            <div className="text-sm text-gray-600">WISHLIST: 12</div>
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-800">SIGN UP OR LOGIN</Link>
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
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
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
