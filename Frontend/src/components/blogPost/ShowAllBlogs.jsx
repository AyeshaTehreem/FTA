import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';

const ShowAllBlogs = () => {
    const navigate = useNavigate();
    const [currentColor, setCurrentColor] = useState('#EF4444'); // Initial red color
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

    // Fetch all blog posts with images
    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/blogs/', { withCredentials: true });
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

    useEffect(() => {
        const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = scrollPosition / pageHeight;
            const colorIndex = Math.floor(scrollPercentage * colors.length);
            setCurrentColor(colors[colorIndex]);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

  
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 overflow-hidden">
            {/* Scroll Progress Bar */}
            <motion.div
                style={{ backgroundColor: currentColor }}
                className="fixed top-0 left-0 right-0 h-2 z-50"
            />

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="container mx-auto px-4 py-12"
            >
                <motion.h1
                    className="text-7xl font-bold text-center mb-16"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    style={{ color: currentColor }}
                >
                    All Blogs
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {blogs.map((blog) => (
                        <div 
                            key={blog._id} 
                            className="bg-white rounded-lg shadow-md p-4 text-center border border-red-500"
                            onClick={() => navigate(`/blog/${blog._id}`)} // Add click handler
                        >
                            <img
                                src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${blog.imageUrl}`}
                                alt={blog.title}
                                className="rounded-t-lg w-full h-48 object-cover mb-4"
                                onError={(e) => {
                                    e.target.onerror = null; // prevents looping
                                    e.target.src = '/path/to/fallback/image.png'; // a local fallback image
                                }}
                            />
                            <h3 className="text-lg font-semibold text-red-600 mb-2">{blog.title}</h3>
                            <p className="text-gray-500 mb-4">Author: {blog.authorName}</p>
                            <p className="text-gray-500 mb-4">Categories: {blog.categories.join(', ')}</p>
                            <p className="text-gray-500 mb-4">Likes: {blog.likes}</p>
                            <p className="text-gray-500 mb-4">Comments: {blog.comments}</p>
                            <p className="text-gray-400 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="fixed bottom-0 left-0 right-0 h-2 bg-gray-300"
                style={{ scaleX: pathLength }}
            />
        </div>
    );
};

export default ShowAllBlogs;