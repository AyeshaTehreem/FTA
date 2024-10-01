import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { UserContext } from "../../../UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [showMegamenu, setShowMegamenu] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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
        navigate('/'); // Navigate to home page after successful logout
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
        <Link to="/blogs" className="text-gray-600 hover:text-gray-800">BLOGS</Link>
        {user?.isLoggedIn && (
          <Link to="/verifyimage" className="text-sm text-gray-600 hover:text-gray-800">VERIFY NEWS</Link>
        )}
        {user?.isLoggedIn && user.role === 'verifier' && (
          <Link to="/pendingimages" className="text-sm text-gray-600 hover:text-gray-800">
            PENDING VERIFICATIONS
          </Link>
        )}
        {user?.isLoggedIn && (
          <Link to="/report" className="text-sm text-gray-600 hover:text-gray-800">
            REPORTS
          </Link>
        )}
        {user?.isLoggedIn && user.role === 'editor' && (
          <Link to="/editorblog" className="text-sm text-gray-600 hover:text-gray-800">ADD BLOG</Link>
        )}
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
            <Link to="/" className="center text-4xl font-bold">
              <span className="center text-gray-800">FTA</span>
              <span className="center text-red-600">TIMES.</span>
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
            <li><Link to="/lifestyle" className="text-sm font-semibold text-gray-800 hover:text-red-600">LIFESTYLE</Link></li>
            <li><Link to="/lifestylenews" className="text-sm font-semibold text-gray-800 hover:text-red-600">NEWS</Link></li>
          </ul>
        </nav>
        {showMegamenu && (
          <div className="mega-menu absolute top-full left-0 w-full bg-white shadow-lg py-4 z-50">
            <div className="container mx-auto px-4 grid grid-cols-4 gap-4">
              {newsItems.map((item, index) => (
                <Link to={item.link} className="block group" key={index}>
                  <img src={item.img} alt={item.title} className="w-full h-40 object-cover group-hover:opacity-75 transition-opacity" />
                  <div className="mt-2">
                    <div className="text-xs text-gray-500">{item.category}</div>
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">{item.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {sidebarOpen && (
        <div className="sm:hidden absolute top-0 left-0 w-full h-screen bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center py-4 px-4">
            <Link to="/" className="center text-4xl font-bold">
              <span className="center text-gray-800">FTA</span>
              <span className="center text-red-600">TIMES.</span>
            </Link>
            <button 
              className="text-2xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ×
            </button>
          </div>
          <TopBar isSidebar={true} />
          <nav className="py-2 px-4 border-t border-b border-gray-200">
            <ul className="flex flex-col space-y-2">
              <li><Link to="/" className="text-sm font-semibold text-gray-800 hover:text-red-600">HOME</Link></li>
              <li><Link to="/mega-menu" className="text-sm font-semibold text-gray-800 hover:text-red-600">MEGA MENU</Link></li>
              <li><Link to="/pages" className="text-sm font-semibold text-red-600">PAGES</Link></li>
              <li><Link to="/aboutpage" className="text-sm font-semibold text-gray-800 hover:text-red-600">ABOUT US</Link></li>
              <li><Link to="/lifestyle" className="text-sm font-semibold text-gray-800 hover:text-red-600">LIFESTYLE</Link></li>
              <li><Link to="/lifestylenews" className="text-sm font-semibold text-gray-800 hover:text-red-600">NEWS</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
