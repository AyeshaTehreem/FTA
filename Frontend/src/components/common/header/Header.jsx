import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { UserContext } from "../../../UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [showMegamenu, setShowMegamenu] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const newsItems = [
    { img: "/images/life/life1.jpg", link: "/news/item1", title: "Lorem ipsum dolor sit amet, consectetur adipiscing.", category: "FASHION" },
    { img: "/images/gallery/g2.jpg", link: "/news/item2", title: "Proin quis massa tincidunt justo cursus dapibus.", category: "SPORTS" },
    { img: "/images/gallery/g3.jpg", link: "/news/item3", title: "Nulla hendrerit dui in erat varius vestibulum.", category: "TRAVEL" },
    { img: "/images/gallery/g4.jpg", link: "/news/item4", title: "Maecenas dictum lacus in bibendum commodo.", category: "BUSINESS" },
  ];

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
    }, []);

    return (
      <div className="bg-gray-100 py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center">
          <span className="bg-black text-white px-2 py-1 text-xs sm:text-sm font-bold mr-4 flex-shrink-0">TRENDING NOW</span>
          <AnimatePresence>
            <motion.p
              key={currentTextIndex}
              className="text-xs sm:text-sm text-gray-700 truncate"
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
        logout();
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  const TopBar = ({ isSidebar = false }) => (
    <div className={`flex ${isSidebar ? 'flex-col space-y-4' : 'flex-wrap justify-between items-center'} py-2 ${!isSidebar && 'border-b border-gray-200'}`}>
      <div className={`flex ${isSidebar ? 'flex-col' : 'space-x-4'} mb-2 sm:mb-0`}>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-instagram"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-youtube"></i></a>
        <a href="#" className="text-gray-600 hover:text-gray-800"><i className="fab fa-vimeo-v"></i></a>
      </div>
      <div className={`flex ${isSidebar ? 'flex-col space-y-2' : 'flex-wrap space-x-2 sm:space-x-4'} text-xs sm:text-sm`}>
        <Link to="/contact" className="text-gray-600 hover:text-gray-800">CONTACT</Link>
        <Link to="/donation" className="text-gray-600 hover:text-gray-800">DONATION</Link>
        <Link to="/blogpost" className="text-gray-600 hover:text-gray-800">BLOGS</Link>
        <div className="text-gray-600">CURRENCY: USD</div>
        <div className="text-gray-600">WISHLIST: 12</div>
        <Link to="/editorblog" className="text-gray-600 hover:text-gray-800">ADD BLOG</Link>
        <div className="text-gray-600">FAKE NEWS</div>
        {user.isLoggedIn ? (
          <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">LOGOUT</button>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-gray-800">SIGN UP OR LOGIN</Link>
        )}
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4">
        {windowWidth >= 640 && <TopBar />}
        
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              className="text-2xl mr-4 sm:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <Link to="/" className="center text-4xl font-bold  ">
              <span className="center text-gray-800  ">FTA</span>
              <span className="center text-red-600  ">TIMES.</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm sm:text-lg">
              {currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}
            </div>
            <select className="bg-gray-100 rounded px-2 py-1 text-sm">
              <option>En</option>
            </select>
          </div>
        </div>
        
        <TrendingSection />
        
        <nav className="py-2 border-t border-b border-gray-200 hidden sm:block">
          <ul className="flex justify-between items-center">
            <li><Link to="/" className="text-sm font-semibold text-gray-800 hover:text-red-600">HOME</Link></li>
            <li className="relative group" onMouseEnter={() => setShowMegamenu(true)} onMouseLeave={() => setShowMegamenu(false)}>
              <Link to="/mega-menu" className="text-sm font-semibold text-gray-800 hover:text-red-600">MEGA MENU ▼</Link>
            </li>
            <li><Link to="/pages" className="text-sm font-semibold text-red-600">PAGES ▼</Link></li>
            <li><Link to="/aboutpage" className="text-sm font-semibold text-gray-800 hover:text-red-600">ABOUT US</Link></li>
            <li><Link to="/typography" className="text-sm font-semibold text-gray-800 hover:text-red-600">TYPOGRAPHY</Link></li>
            <li><Link to="/contact" className="text-sm font-semibold text-gray-800 hover:text-red-600">CONTACT</Link></li>
            <li><Link to="/faq" className="text-sm font-semibold text-gray-800 hover:text-red-600">FAQ</Link></li>
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
        <div className="absolute left-0 w-full bg-white shadow-lg z-20 hidden sm:block">
          <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {newsItems.map((newsItem, index) => (
              <div key={index} className="relative group">
                <Link to={newsItem.link} className="block overflow-hidden rounded-lg shadow-lg transition-transform transform hover:-translate-y-1">
                  <img src={newsItem.img} alt={newsItem.title} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-25 transition-opacity opacity-0 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <p className="text-sm text-white">{newsItem.category}</p>
                    <p className="text-lg text-white font-bold">{newsItem.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar for mobile */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-30 sm:hidden`}>
        <div className="p-4">
          <button onClick={() => setSidebarOpen(false)} className="text-2xl mb-4">×</button>
          <TopBar isSidebar={true} />
          <nav className="mt-4">
            <ul className="space-y-2">
              <li><Link to="/" className="block text-sm font-semibold text-gray-800 hover:text-red-600">HOME</Link></li>
              <li><Link to="/mega-menu" className="block text-sm font-semibold text-gray-800 hover:text-red-600">MEGA MENU</Link></li>
              <li><Link to="/pages" className="block text-sm font-semibold text-red-600">PAGES</Link></li>
              <li><Link to="/aboutpage" className="block text-sm font-semibold text-gray-800 hover:text-red-600">ABOUT US</Link></li>
              <li><Link to="/typography" className="block text-sm font-semibold text-gray-800 hover:text-red-600">TYPOGRAPHY</Link></li>
              <li><Link to="/contact" className="block text-sm font-semibold text-gray-800 hover:text-red-600">CONTACT</Link></li>
              <li><Link to="/faq" className="block text-sm font-semibold text-gray-800 hover:text-red-600">FAQ</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;