import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// BlogPosts Component
const BlogPosts = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${post.imageUrl}`} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-sm font-semibold rounded">
              {post.categories[0]}
            </span>
          </div>
          <div className="p-6 flex-grow">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{post.authorName}</span>
              <span className="mx-2">|</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 hover:text-red-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
          </div>
          <div className="px-6 pb-6">
            <Link to={`/blogs/${post._id}`}>
              <button className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors">
                Continue Reading
              </button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const categories = [
    { name: 'Fashion', count: 22 },
    { name: 'Winter', count: 16 },
    { name: 'Exclusive', count: 84 },
    { name: 'Summer', count: 11 },
    { name: 'Heavy Style', count: 19 },
  ];

  const tags = ['Property', 'Programming', 'Life Style', 'Technology',
    'Framework', 'Sport', 'Game',];

  const archives = [
    { month: 'March 2017', count: 22 },
    { month: 'April 2017', count: 16 },
    { month: 'May 2017', count: 84 },
    { month: 'January 2016', count: 11 },
    { month: 'February 2016', count: 19 },
    { month: 'March 2016', count: 36 },
    { month: 'April 2016', count: 41 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-600 mb-4">CATEGORY</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <motion.li 
              key={index} 
              className="flex justify-between items-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="group-hover:text-red-600 transition-colors">{category.name}</span>
              <span className="text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-full">{category.count}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-600 mb-4">TAGS</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-600 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-600 mb-4">ARCHIVES</h3>
        <ul className="space-y-2">
          {archives.map((archive, index) => (
            <motion.li 
              key={index} 
              className="flex justify-between items-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="group-hover:text-red-600 transition-colors">{archive.month}</span>
              <span className="text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded-full">{archive.count}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// NewsTicker Component
const NewsTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const newsItems = [
    "Contrary to popular belief Lorem Ipsum is not simply random text.",
    "Education to popular belief Lorem Ipsum is not simply",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Corporis repellendus eum nobis cum ab",
    "Voluptatibus laudantium itaque, sunt natus hic assumenda",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 border-y border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-red-600 text-white px-4 py-2 mr-4 font-bold flex items-center">
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
                className="text-gray-800"
              >
                {newsItems[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// BlogPage Component (Main)
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5002/blogs/', { withCredentials: true });
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-6 text-sm font-medium">
            <motion.li whileHover={{ scale: 1.1 }}><a href="#" className="hover:underline">Featured News</a></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><a href="#" className="hover:underline">Most Popular</a></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><a href="#" className="hover:underline">Hot News</a></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><a href="#" className="hover:underline">Recent News</a></motion.li>
          </ul>
        </div>
      </div>
      <NewsTicker />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <main className="md:w-3/4">
            {blogs.length > 0 ? (
              <BlogPosts posts={blogs} />
            ) : (
              <p className="text-center text-gray-600">No blog posts available.</p>
            )}
          </main>
          <aside className="md:w-1/4 mt-8 md:mt-0">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
