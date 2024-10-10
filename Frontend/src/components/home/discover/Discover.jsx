import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, Cloud, Wind, Droplet, Mail } from 'lucide-react';
import axios from 'axios';
import WeatherWidget from './WeatherWidgets';
import { Link } from 'react-router-dom';


const NewsTicker = ({ items }) => (
  <div className="bg-red-600 text-white py-2 px-4 overflow-hidden">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: '-100%' }}
      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
    >
      {items.concat(items).map((item, index) => (
        <span key={index} className="mr-8 text-sm font-medium">{item}</span>
      ))}
    </motion.div>
  </div>
);
<WeatherWidget/>
const SmallArticleCard = ({ article, index }) => (
  <motion.div
    className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <div className="flex items-center mb-2">
      <span className="text-sm font-medium text-gray-500 mr-2">{article.category}</span>
      <span className="text-xs text-gray-400">{article.date}</span>
    </div>
    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
    <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
  </motion.div>
);const FeaturedArticle = ({ article }) => (
  <motion.div 
    className="mb-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.img 
      src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${article.imageUrl}`}
      alt={article.status}
      className="w-full h-48 sm:h-64 md:h-96 object-cover mb-4 rounded-lg"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${article.status === 'Verified' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        {article.status === 'Verified' ? 'Real' : 'Fake'}
      </span>
    </motion.div>
  </motion.div>
);

const SecondaryArticleCard = ({ article, index }) => (
  <motion.div
    className="mb-8 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    whileHover={{ scale: 1.03 }}
  >
    <motion.div
      className="relative h-48 overflow-hidden"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${article.imageUrl}`} 
        alt={article.status} 
        className="w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
    </motion.div>
    <div className="p-4 sm:p-6">
      <motion.button
        className="flex items-center text-red-600 font-semibold"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full mb-3 ${article.status === 'Verified' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        {article.status === 'Verified' ? 'Real' : 'Fake'}
      </span>
      </motion.button>
    </div>
  </motion.div>
);


const AdWidget = () => (
  <div className="bg-gray-200 p-4 rounded-lg mb-8">
    <img src="/images/life/life1.jpg" alt="Advertisement" className="w-full" />
  </div>
);

const PopularArticles = ({ articles }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Popular Articles</h3>
    {articles.map((article, index) => (
      <div key={index} className="flex items-center mb-4">
        <span className="text-2xl font-bold text-gray-300 mr-3">{index + 1}</span>
        <p className="text-sm font-medium line-clamp-2">{article.title}</p>
      </div>
    ))}
  </div>
);

const NewsletterSidebar = () => {
  const [email, setEmail] = useState('');

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 sticky top-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Mail size={48} className="text-red-600" />
      </motion.div>
      <h3 className="text-2xl font-bold text-center mb-2">Subscribe Newsletter</h3>
      <p className="text-gray-600 text-center mb-4">
        Be the first to know about our newest articles by subscribing to our newsletter!
      </p>
      <motion.input
        type="email"
        placeholder="Your email address"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        whileFocus={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <motion.button
  className="w-full bg-red-600 text-white py-2 rounded font-semibold"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Link to="/login" className="text-white">
    Sign Up Now
  </Link>
</motion.button>
      <p className="text-xs text-gray-400 mt-2 text-center">You can unsubscribe at any time.</p>
    </motion.div>
  );
};

const CategorizedLatestNews = ({ articles }) => {
  const categorizedArticles = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(categorizedArticles).map(([category, categoryArticles], categoryIndex) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-red-600">{category}</h3>
          {categoryArticles.map((article, index) => (
            <SmallArticleCard key={index} article={article} index={categoryIndex * 10 + index} />
          ))}
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [tickerItems, setTickerItems] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5002/verifications/requests/statuscount/2', { withCredentials: true });
        setArticles(response.data.reverse()); // Assuming response.data is an array of articles
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5002/blogs/latest'); // Replace with your API endpoint
        const titles = response.data.map(blog => blog.title); // Assuming the response contains an array of blog objects with a 'title' field
        setTickerItems(titles);
      } catch (error) {
        console.error('Error fetching latest blogs:', error);
      }
    };

    fetchLatestBlogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [articles.length]); // Ensure this runs when the articles length changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  const featuredArticle = articles[0]; // Get the first article for the featured display
  const secondaryArticles = articles.slice(1, 3);

  const latestArticles = [
    {
      title: "The Rise of Solo Travel and Tips for a Safe Experience",
      excerpt: "Exploring the growing trend of solo travel and how to make the most of your journey.",
      category: "Travel",
      date: "2 hours ago"
    },
   
   
   
    {
      title: "Eco-Tourism: Balancing Adventure and Conservation",
      excerpt: "How responsible travel is shaping the future of tourism industry.",
      category: "Travel",
      date: "10 hours ago"
    }
  ];


  
  

  const popularArticles = [
    { title: "South Africa bounce back on eventful day" },
    { title: "Steyn ruled out of series with shoulder fracture" },
    { title: "BCCI asks ECB to bear expenses of team's India tour" },
    { title: "Duminy, Elgar tons set Australia huge target" },
    { title: "English spinners are third-class citizens, says Graeme Swann" }
  ];

  const allArticles = [featuredArticle, ...secondaryArticles];
  return (
    <div className="bg-gray-100 min-h-screen">
      <NewsTicker items={tickerItems} />
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <WeatherWidget />
            <h2 className="text-2xl font-bold my-6">LATEST</h2>
            <CategorizedLatestNews articles={latestArticles} />
          </div>
          <div className="md:col-span-6">
            <AnimatePresence mode="wait">
              {featuredArticle && <FeaturedArticle key={featuredArticle._id} article={featuredArticle} />}
            </AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {secondaryArticles.map((article) => (
                <SecondaryArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <NewsletterSidebar />
            <AdWidget />
            <PopularArticles articles={popularArticles} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;