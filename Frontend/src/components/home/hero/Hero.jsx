import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewsGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const scrollRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5002/blogs/', { withCredentials: true });
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categoryColors = {
    BUSINESS: 'bg-yellow-400 text-gray-900',
    WORLD: 'bg-green-500 text-white',
    POLITICS: 'bg-red-500 text-white',
    TECH: 'bg-blue-500 text-white',
  };

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    if (scrollContainer) {
      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1;
          }
        }, 30);
      };

      const stopScrolling = () => {
        clearInterval(scrollInterval);
      };

      startScrolling();

      scrollContainer.addEventListener('mouseenter', stopScrolling);
      scrollContainer.addEventListener('mouseleave', startScrolling);

      return () => {
        stopScrolling();
        scrollContainer.removeEventListener('mouseenter', stopScrolling);
        scrollContainer.removeEventListener('mouseleave', startScrolling);
      };
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const featuredBlogs = blogs.slice(0, 3);

  const tickerNews = [
    {
      id: 1,
      title: "Expanding Peacefull Political Climate Gears up for this Election",
      category: "POLITICS",
      image: "/images/popular/pop1.jpg",
      isExclusive: false,
    },
    {
      id: 2,
      title: "Things You Didn't Know About the American Past Politicians",
      category: "POLITICS",
      image: "/images/popular/pop7.jpg",
      isExclusive: false,
    },
    {
      id: 3,
      title: "New Harvard Student Candidates Presented Minutes Before Results",
      category: "POLITICS",
      image: "/images/popular/pop6.jpg",
      isExclusive: true,
    },
    {
      id: 4,
      title: "Sanders Gets Respectful Welcome at Conservative College",
      category: "POLITICS",
      image: "/images/popular/pop5.jpg",
      isExclusive: false,
    },
    {
      id: 5,
      title: "The Hottest Wearable Tech and Smart Gadgets of 2021 Will Blow Your Mind",
      category: "TECH",
      image: "/images/popular/pop3.jpg",
      isExclusive: true,
    },
    {
      id: 6,
      title: "New Technology Will Help Keep Your Smart Home from Becoming Obsolete",
      category: "TECH",
      image: "/images/popular/pop4.jpg",
      isExclusive: false,
    },
    {
      id: 7,
      title: "Apple Computers Climb the List of the Top Gadgets in Forbes Magazine",
      category: "TECH",
      image: "/images/popular/pop1.jpg",
      isExclusive: false,
    },
    {
      id: 8,
      title: "New Soundboard from Bose Review: Pricing is Not Always the Only Criteria",
      category: "TECH",
      image: "/images/popular/pop2.jpg",
      isExclusive: true,
    },
  ];

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <h2 className="text-5xl font-extrabold mb-12 text-gray-900 relative">
        Recent News
        <span className="absolute -bottom-2 left-0 w-24 h-2 bg-yellow-400"></span>
      </h2>
      <div className="grid grid-cols-12 gap-8 mb-12">
        {featuredBlogs.map((blog, index) => (
          <motion.div 
            key={blog._id}
            className={`${index === 0 ? 'col-span-12 md:col-span-8 row-span-2' : 'col-span-12 md:col-span-4'} group relative overflow-hidden rounded-lg shadow-xl cursor-pointer`}
            onMouseEnter={() => setHoveredId(blog._id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ scale: 1.03 }}
            layout
            onClick={() => handleBlogClick(blog._id)}
          >
            <div className="aspect-w-16 aspect-h-9 md:aspect-h-12">
              <img src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${blog.imageUrl}`} alt={blog.title} className="object-cover w-full h-full filter brightness-75 group-hover:brightness-50 transition-all duration-300" />
            </div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${categoryColors[blog.categories[0]] || 'bg-gray-500 text-white'}`}>
                  {blog.categories[0]}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white leading-tight">{blog.title}</h3>
                <AnimatePresence>
                  {hoveredId === blog._id && (
                    <motion.p 
                      className="text-white text-sm mb-4 line-clamp-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {blog.excerpt}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex items-center text-xs text-gray-300">
                  <span className="flex items-center mr-4"><User size={12} className="mr-1" /> {blog.authorName}</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleBlogClick(blog._id);
              }}
            >
              <ArrowRight size={20} className="text-gray-800" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Trending News</h2>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {tickerNews.map((item) => (
            <div key={item.id} className="flex-none w-64">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${categoryColors[item.category] || 'bg-gray-500 text-white'}`}>
                    {item.category}
                  </span>
                  <p className="text-gray-600">{item.isExclusive ? 'Exclusive' : 'Read More'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 h-full flex items-center">
          <button className="bg-white rounded-full p-2 shadow-lg" onClick={() => scroll(-200)}>
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute top-0 right-0 h-full flex items-center">
          <button className="bg-white rounded-full p-2 shadow-lg" onClick={() => scroll(200)}>
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;

