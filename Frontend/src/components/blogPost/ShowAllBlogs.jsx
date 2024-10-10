import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ChevronRight, ChevronLeft, Loader2, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// NewsTicker Component
const NewsTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const newsItems = [
    "The Evolution of Laptops: From Bulk to Sleek Powerhouses",
    "The Thrilling World of Gaming In Industry",
    "Programming is life",
    "Navigating the Shifting Political Landscape: Challenges and Opportunities for Democracy",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 mb-8 rounded-xl shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-white text-red-600 px-4 py-2 mr-4 font-bold rounded-full flex items-center">
            <span>Breaking News</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white font-medium"
              >
                {newsItems[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button 
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Read More Button Component
const AnimatedReadMoreButton = ({ to }) => {
  return (
    <Link to={to}>
      <motion.button
        className="group relative bg-red-600 text-white px-8 py-3 rounded-full shadow-md text-lg font-semibold overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-600"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span className="relative flex items-center justify-center">
          <span>Read More</span>
          <motion.span
            className="ml-2"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={20} />
          </motion.span>
        </motion.span>
      </motion.button>
    </Link>
  );
};

// Refined BlogPosts Component
const BlogPosts = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 gap-12">
      {posts.map((post) => (
        <motion.article
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300"
        >
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${post.imageUrl}`} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <motion.span
                className="bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg mb-4 inline-block"
                whileHover={{ scale: 1.05, backgroundColor: "#E53E3E" }}
              >
                {post.categories[0]}
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                {post.title}
              </h2>
              <div className="flex items-center text-sm opacity-80 space-x-4">
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <User size={16} className="mr-2" />
                  <span>{post.authorName}</span>
                </motion.div>
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                  <Calendar size={16} className="mr-2" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{post.excerpt}</p>
            <AnimatedReadMoreButton to={`/blogs/${post._id}`} />
          </div>
        </motion.article>
      ))}
    </div>
  );
};

// Enhanced Sidebar Component
const Sidebar = ({ onCategorySelect }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Property', 'Programming', 'Life Style', 'Technology', 'Framework', 'Sport', 'Game'];
  const tags = ['Property', 'Programming', 'Life Style', 'Technology', 'Framework', 'Sport', 'Game'];
  const archives = [
    { month: 'March 2017', count: 22 },
    { month: 'April 2017', count: 16 },
    { month: 'May 2017', count: 84 }
  ];

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const promises = categories.map(category =>
          fetch(`http://localhost:5002/blogs/category/${category}/count`)
            .then(res => res.json())
        );
        
        const results = await Promise.all(promises);
        setCategoryData(results);
      } catch (err) {
        setError('Failed to fetch category counts');
        console.error('Error fetching category counts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <div className="space-y-10 bg-white p-8 shadow-xl rounded-2xl sticky top-32">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-4 pl-14 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-gray-50"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">CATEGORIES</h3>
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        ) : (
          <ul className="space-y-4">
            {categoryData.map((category, index) => (
              <motion.li 
                key={index} 
                className="flex justify-between items-center group cursor-pointer bg-gray-50 p-3 rounded-lg"
                whileHover={{ scale: 1.03, backgroundColor: "#FEE2E2" }}
                onClick={() => onCategorySelect(category.category)}
              >
                <span className="group-hover:text-red-600 transition-colors flex items-center font-medium">
                  <Tag size={18} className="mr-3 text-red-600" />
                  {category.category}
                </span>
                <span className="text-gray-500 text-sm px-3 py-1 bg-white rounded-full shadow-sm">{category.count}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">TAGS</h3>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.1, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategorySelect(tag)}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-600 pb-2">ARCHIVES</h3>
        <ul className="space-y-4">
          {archives.map((archive, index) => (
            <motion.li 
              key={index} 
              className="flex justify-between items-center group cursor-pointer bg-gray-50 p-3 rounded-lg"
              whileHover={{ scale: 1.03, backgroundColor: "#FEE2E2" }}
            >
              <span className="group-hover:text-red-600 transition-colors flex items-center font-medium">
                <Calendar size={18} className="mr-3 text-red-600" />
                {archive.month}
              </span>
              <span className="text-gray-500 text-sm px-3 py-1 bg-white rounded-full shadow-sm">{archive.count}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Enhanced BlogPage Component
const EnhancedBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5002/blogs');
        const reversedBlogs = response.data.reverse(); // Reverse the order of blogs
        setBlogs(reversedBlogs);
        setFilteredBlogs(reversedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilteredBlogs(blogs.filter(blog => blog.categories.includes(category)));
  };

  const handleResetCategory = () => {
    setSelectedCategory(null);
    setFilteredBlogs(blogs);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
            Trending Blog Posts
          </span>
        </h1>
        <NewsTicker />
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-red-600" />
              </div>
            ) : (
              <>
                {selectedCategory && (
                  <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
                    <span className="text-lg text-gray-700">
                      Filtering by category: <strong className="text-red-600">{selectedCategory}</strong>
                    </span>
                    <button 
                      onClick={handleResetCategory} 
                      className="ml-6 text-red-600 hover:text-red-800 underline transition-colors font-medium"
                    >
                      Reset Filter
                    </button>
                  </div>
                )}
                <BlogPosts posts={filteredBlogs} />
              </>
            )}
          </div>
          <div className="lg:w-1/3">
            <Sidebar onCategorySelect={handleCategorySelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBlogPage;