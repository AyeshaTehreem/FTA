import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

// BlogPost Component
const BlogPost = ({ post }) => (
  <div className="mb-8 border-b pb-8 flex flex-col md:flex-row">
    <div className="relative overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4 md:w-1/3 flex-shrink-0">
      <img 
        src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${post.imageUrl}`} 
        alt={post.title} 
        className="w-full h-48 md:h-full object-cover"
      />
      <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-sm font-semibold">
        {post.categories.join(', ')}
      </div>
    </div>
    <div className="md:w-2/3">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span>{post.authorName}</span>
        <span className="mx-2">|</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-black hover:text-red-600 transition-colors">
        {post.title}
      </h2>
      <p className="text-gray-700 mb-2">{post.excerpt}</p>
      <a href={`/blog/${post._id}`} className="text-red-600 hover:underline">Continue Reading...</a>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = () => {
  const categories = [
    { name: 'Fashion', count: 22 },
    { name: 'Winter', count: 16 },
    { name: 'Exclusive', count: 84 },
    { name: 'Summer', count: 11 },
    { name: 'Heavy Style', count: 19 },
  ];

  const tags = ['NEWS', 'IMAGE', 'MUSIC', 'VIDEO', 'AUDIO', 'FASHION', 'LATEST', 'TRENDY', 'SPECIAL', 'RECIPE', 'SPORTS'];

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
      <div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-red-600 border-b pb-2">CATAGORY</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index} className="flex justify-between items-center group cursor-pointer">
              <span className="group-hover:text-red-600 transition-colors">{category.name}</span>
              <span className="text-gray-500 text-sm">({category.count})</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-red-600 border-b pb-2">TAGS</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded hover:bg-red-600 hover:text-white cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-red-600 border-b pb-2">ARCHIVES</h3>
        <ul className="space-y-2">
          {archives.map((archive, index) => (
            <li key={index} className="flex justify-between items-center group cursor-pointer">
              <span className="group-hover:text-red-600 transition-colors">{archive.month}</span>
              <span className="text-gray-500 text-sm">({archive.count})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// NewsTicker Component
const NewsTicker = () => {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const newsItems = [
    "Contrary to popular belief Lorem Ipsum is not simply random text.",
    "Education to popular belief Lorem Ipsum is not simply",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    "Corporis repellendus eum nobis cum ab",
    "Voluptatibus laudantium itaque, sunt natus hic assumenda",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdateTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const minutes = Math.floor((new Date() - date) / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  };

  const tickerStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: 'ticker 30s linear infinite',
  };

  const keyframes = `
    @keyframes ticker {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <style>{keyframes}</style>
      <div className="container mx-auto px-4">
        <div className="flex items-center py-2">
          <div className="bg-black text-white px-3 py-1 mr-4 text-sm font-bold flex items-center whitespace-nowrap">
            <span>News Updates</span>
            <span className="ml-2 text-xs">({formatTime(lastUpdateTime)})</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div style={tickerStyle}>
              {newsItems.concat(newsItems).map((item, index) => (
                <span
                  key={index}
                  className="inline-block mr-8 text-gray-600 hover:text-red-600 cursor-pointer transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 text-gray-600 py-2">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-4 text-sm">
            <li><a href="#" className="hover:text-red-600">Featured News</a></li>
            <li><a href="#" className="hover:text-red-600">Most Popular</a></li>
            <li><a href="#" className="hover:text-red-600">Hot News</a></li>
            <li><a href="#" className="hover:text-red-600">Trending News</a></li>
            <li><a href="#" className="hover:text-red-600">Most Watched</a></li>
          </ul>
        </div>
      </div>
      
      <NewsTicker />
      
      <header className="bg-white text-black py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-red-600">Home</a>
            <span className="text-gray-400">/</span>
            <span className="text-red-600">Blog</span>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="md:w-2/3">
            {blogs.map(post => (
              <BlogPost key={post._id} post={post} />
            ))}
            <div className="bg-gray-200 p-4 text-center">
              <span className="text-gray-700">728 x 200 ADVERTISEMENT</span>
            </div>
          </div>
          <aside className="md:w-1/3 mt-8 md:mt-0">
            <Sidebar />
          </aside>
        </div>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
