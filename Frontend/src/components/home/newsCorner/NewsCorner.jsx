import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { ArrowRight, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewsSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pollVotes, setPollVotes] = useState({ option1: 0, option2: 0, option3: 0, option4: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const postsPerPage = 5;

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

  const handleVote = (option) => {
    setPollVotes((prev) => ({ ...prev, [option]: prev[option] + 1 }));
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const categoryColors = {
    BUSINESS: 'bg-yellow-400 text-gray-900',
    WORLD: 'bg-green-500 text-white',
    POLITICS: 'bg-red-500 text-white',
    TECH: 'bg-blue-500 text-white',
  };

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-12 bg-gradient-to-b from-gray-100 to-white"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-8"
      />
      
      <div className="flex flex-wrap -mx-4">
        {/* Left sidebar */}
                {/* Left sidebar */}
                <div className="w-full md:w-1/4 px-4">
          <div className="sticky top-4">
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4 text-red-600 uppercase">
                Tech & Innovation
              </h2>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <img
                    src="/images/life/life3.jpg"
                    alt="Laptop"
                    className="w-full mb-2 rounded-lg"
                  />
                  <h3 className="font-semibold">
                    Phasellus placerat massa nec metus ornare molestie.
                  </h3>
                  <p className="text-xs text-red-600 uppercase">Europe - Jan 4, 2021</p>
                  <p className="text-sm">
                    To understand the new politics stance and other pro nationals of recent...
                  </p>
                </motion.div>
                <div className="space-y-2">
                  {[
                    'Trainings are getting really hard reaching the final',
                    'The victory against The Sharks brings us closer to the Final',
                    'The next match against The Clovers will be this Friday',
                  ].map((text, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="font-semibold">{text}</p>
                      <p className="text-xs text-gray-500">Jan 4, 2021</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4 text-red-600 uppercase">
                Editor's Picks
              </h2>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <img
                  src="/images/life/life2.jpg"
                  alt="City"
                  className="w-full rounded-lg"
                />
                <h3 className="font-semibold mt-2">
                  Donec scelerisque massa quis ante facilisis, non pulvinar.
                </h3>
                <p className="text-xs text-red-600 uppercase">Europe - Jan 4, 2021</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      

        {/* Main content */}
        <div className="w-full md:w-1/2 px-4">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-6 text-red-600 uppercase border-b-2 border-red-600 pb-2"
          >
            Latest Articles
          </motion.h2>
          <AnimatePresence>
            {currentPosts.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-8 bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300"
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${blog.imageUrl}`}
                      alt={blog.title}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
                      {blog.categories[0]}
                    </div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                      {blog.title}
                    </a>
                    <p className="mt-2 text-gray-500">{blog.excerpt}</p>
                    <div className="mt-4 flex items-center">
                      <div className="flex items-center">
                        <User size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-600 text-sm">{blog.authorName}</span>
                      </div>
                      <div className="ml-6 flex items-center">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-600 text-sm">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`mx-1 px-4 py-2 rounded-full ${
                  currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </div>


        {/* Right sidebar */}
        <div className="w-full md:w-1/4 px-4">
          <div className="sticky top-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white shadow-2xl rounded-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-600 uppercase border-b-2 border-red-600 pb-2">
                Poll of the Week
              </h2>
              <p className="text-sm mb-4">What emerging technology excites you the most?</p>
              {['Artificial Intelligence', 'Quantum Computing', 'Biotechnology', 'Space Exploration'].map((option, index) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mb-2 bg-blue-100 py-2 rounded-full text-blue-800 font-medium transition duration-300"
                  onClick={() => handleVote(`option${index + 1}`)}
                >
                  {option} (Votes: {pollVotes[`option${index + 1}`]})
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-white shadow-2xl rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-600 uppercase border-b-2 border-red-600 pb-2">
                Trending Topics
              </h2>
              <ul className="space-y-2">
                {['#AIEthics', '#QuantumBreakthrough', '#MarsColony', '#CybersecurityAlert'].map((topic, index) => (
                  <motion.li
                    key={topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {topic}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsSection;

