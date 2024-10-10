import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import { UserContext } from "../../../UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [showMegamenu, setShowMegamenu] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [factChecks, setFactChecks] = useState([]);
  const [factLoading, setFactLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
  const fetchFactChecks = async () => {
    try {
      const response = await axios.get('http://localhost:5002/verifications/requests/statuscount/2', { withCredentials: true });
      setFactChecks(response.data.reverse().slice(0, 4));  // Fetch and limit to 4 fact checks
      setFactLoading(false);
    } catch (error) {
      console.error('Error fetching fact checks:', error);
      setFactLoading(false);
    }
  };
  
  fetchFactChecks();
}, []);

    

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const newsItems = [
    { img: "/images/life/life1.jpg", status: "Rejected" },
    { img: "/images/gallery/g2.jpg", status: "Rejected" },
    { img: "/images/gallery/g3.jpg", status: "Rejected" },
    { img: "/images/gallery/g4.jpg", status: "Rejected" },
  ];
  const CACHE_KEY = 'trendingBlogTitles';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  const TrendingSection = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [trendingTexts, setTrendingTexts] = useState([]);

    

    useEffect(() => {
      const fetchTrendingBlogs = async () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

        if (cachedData && cachedTimestamp) {
          const now = new Date().getTime();
          if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
            const parsedData = JSON.parse(cachedData);
            setTrendingTexts(parsedData);
            return;
          }
        }

        try {
          const response = await axios.get('http://localhost:5000/blogs/latest');
          const titles = response.data.map(blog => blog.title);
          setTrendingTexts(titles);
          localStorage.setItem(CACHE_KEY, JSON.stringify(titles));
          localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime().toString());
        } catch (error) {
          console.error('Error fetching trending blogs:', error);
        }
      };

      fetchTrendingBlogs();
      const refreshInterval = setInterval(fetchTrendingBlogs, CACHE_DURATION);

      return () => clearInterval(refreshInterval);
    }, []);

    useEffect(() => {
      if (trendingTexts.length > 0) {
        const rotationInterval = setInterval(() => {
          setCurrentTextIndex((prevIndex) => {
            const newCurrentTextIndex = (prevIndex + 1) % trendingTexts.length; // Correct variable declaration
            console.log("New currentTextIndex:", newCurrentTextIndex);
            return newCurrentTextIndex; // Return the updated index
          });
        }, 3000);

        return () => clearInterval(rotationInterval);
      }
    }, [trendingTexts]);


    return (
      <div className="bg-gray-100 py-2 overflow-hidden">
        <div className="container mx-auto px-4 flex items-center">
          <span className="bg-black text-white px-2 py-1 text-xs sm:text-sm font-bold mr-4 flex-shrink-0">
            TRENDING NOW
          </span>
          {trendingTexts.length > 0 && (
            <motion.p
              key={currentTextIndex}
              className="text-xs sm:text-sm text-gray-700 truncate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {trendingTexts[currentTextIndex]} {/* Display current index */}
            </motion.p>
          )}
        </div>
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5002/auth/logout', {}, { withCredentials: true });
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
        <Link to="/blogs" className="text-gray-600 hover:text-gray-800">BLOGS</Link>
        {user?.isLoggedIn && (
          <Link to="/verifyimage" className="text-sm text-gray-600 hover:text-gray-800">VERIFY NEWS</Link>
        )}
        {user?.isLoggedIn && user?.role === 'verifier' && (
          <Link to="/pendingimages" className="text-sm text-gray-600 hover:text-gray-800">
            PENDING VERIFICATIONS
          </Link>
        )}

        {user?.isLoggedIn && user?.role === 'admin' && (
          <Link to="/manageverified" className="text-sm text-gray-600 hover:text-gray-800">
            MANAGE VERIFICATIONS
          </Link>
        )}
        {user?.isLoggedIn && (
          <Link to="/report" className="text-sm text-gray-600 hover:text-gray-800">
            REPORTS
          </Link>
        )}
        {user?.isLoggedIn && user?.role === 'editor' && (
          <Link to="/editorblog" className="text-sm text-gray-600 hover:text-gray-800">ADD BLOG</Link>
        )}
        <Link to="/fakenews" className="text-gray-600 hover:text-gray-800">FACT CHECK</Link>
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
            <li className="relative">
              <button onClick={toggleDropdown} className="text-sm font-semibold text-red-600">
                PAGES ▼
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-white shadow-lg mt-2 rounded z-50">
                  <li>
                    <Link
                      to="/fakenews"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      FAKE NEWS
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blogs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      BLOGS
                    </Link>
                  </li>
                </ul>
              )}
            </li>


            <li><Link to="/aboutpage" className="text-sm font-semibold text-gray-800 hover:text-red-600">ABOUT US</Link></li>
            <li><Link to="/contact" className="text-sm font-semibold text-gray-800 hover:text-red-600">CONTACT US</Link></li>
            <li><Link to="/fakenews" className="text-sm font-semibold text-gray-800 hover:text-red-600">FAKE NEWS</Link></li>
          </ul>
        </nav>
        {showMegamenu && (
        <div className="mega-menu absolute top-full left-0 w-full bg-white shadow-lg py-4 z-50">
          <div className="container mx-auto px-4 flex space-x-4 overflow-x-auto">
          {factChecks.map((fact) => (
            <div key={fact._id} className="flex-none w-80"> {/* Increased width to make images larger */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${fact.imageUrl}`} alt={fact.status} className="w-full h-48 object-cover" /> {/* Increased image height */}
                <div className="p-4">
                  <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${fact.status === 'Verified' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {fact.status === 'Verified' ? 'Real' : 'Fake'}
                  </span>
                </div>
              </div>
            </div>
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
              <li><Link to="/lifestylenews" className="text-sm font-semibold text-gray-800 hover:text-red-600">FakeNews</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
