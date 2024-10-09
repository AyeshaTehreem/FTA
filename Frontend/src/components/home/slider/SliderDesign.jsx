import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const NewsSlider = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5002/blogs/');
        setPosts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
        // Error logging remains the same
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [posts.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const visibleItems = posts.length > 0 ? [
    posts[currentIndex],
    posts[(currentIndex + 1) % posts.length],
    posts[(currentIndex + 2) % posts.length],
  ].filter(Boolean) : [];

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-pink-500 pb-2">Latest News</h2>
        <div className="flex gap-2">
          <button onClick={handlePrev} className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        {visibleItems.map((post, idx) => (
          <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 flex-grow">
                <div className="flex mb-4">
                  <div className="w-20 h-20 flex-shrink-0 mr-4 relative">
                    {post.imageUrl && (
                      <img 
                        src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${post.imageUrl}`} 
                        alt={post.title || 'News image'} 
                        className="w-full h-full object-cover rounded-full border-2 border-pink-500"

                      />
                    )}
                    {post.categories && post.categories.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                        {post.categories[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold line-clamp-2 text-gray-800 hover:text-pink-500 transition-colors">
                      {post.title || 'Untitled Post'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <Calendar size={14} className="mr-1 text-pink-500" />
                      <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date not available'}</span>
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3 mb-4">{post.content || 'No content available'}</p>
                <div className="flex items-center mt-auto pt-2 border-t border-gray-200">
                  {post.authorImage && (
                    <img src={post.authorImage} alt={post.author || 'Author'} className="w-8 h-8 rounded-full mr-2 object-cover" />
                  )}
                  <span className="text-sm font-medium text-gray-700">{post.author || 'WebDesk'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSlider;