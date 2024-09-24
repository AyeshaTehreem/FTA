import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, Cloud, Wind, Droplet, Mail } from 'lucide-react';

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

const WeatherWidget = () => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-2xl font-bold">33°C</h3>
        <p className="text-gray-600">Clear sky</p>
      </div>
      <Cloud size={48} className="text-blue-500" />
    </div>
    <p className="text-lg font-semibold mb-2">Islamabad</p>
    <div className="flex justify-between text-sm text-gray-600">
      <span className="flex items-center"><Wind size={14} className="mr-1" /> 2.1 m/s</span>
      <span className="flex items-center"><Droplet size={14} className="mr-1" /> 45%</span>
    </div>
  </div>
);

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
);

const FeaturedArticle = ({ article }) => (
  <motion.div 
    className="mb-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.img 
      src={article.image} 
      alt="" 
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
      <span className="text-sm font-medium text-red-600 mb-2 block">{article.category}</span>
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">{article.title}</h2>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div className="flex items-center text-sm text-gray-500">
        <User size={14} className="mr-1" />
        <span className="mr-4">{article.author}</span>
        <Clock size={14} className="mr-1" />
        <span>{article.date}</span>
      </div>
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
      <img src={article.image} alt="" className="w-full h-full object-cover" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute bottom-4 left-4 text-white font-bold text-lg"
        initial={{ y: 20, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {article.category}
      </motion.span>
    </motion.div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 line-clamp-2 h-14">{article.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <User size={12} className="mr-1" />
          <span className="mr-3">{article.author}</span>
          <Clock size={12} className="mr-1" />
          <span>{article.date}</span>
        </div>
        <motion.button
          className="flex items-center text-red-600 font-semibold"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          Read More <ArrowRight size={14} className="ml-1" />
        </motion.button>
      </div>
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
        Sign Up Now
      </motion.button>
      <p className="text-xs text-gray-500 mt-4 text-center">
        By signing up, you agree to the terms & conditions
      </p>
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
  const tickerItems = [
    "Breaking: Major earthquake strikes Pacific region",
    "Global stock markets hit record highs",
    "New COVID-19 variant discovered in South America",
    "Tech company announces revolutionary product launch"
  ];

  const latestArticles = [
    {
      title: "The Rise of Solo Travel and Tips for a Safe Experience",
      excerpt: "Exploring the growing trend of solo travel and how to make the most of your journey.",
      category: "Travel",
      date: "2 hours ago"
    },
    {
      title: "Artificial Intelligence in Healthcare: Revolutionizing Patient Care",
      excerpt: "How AI is transforming diagnostics, treatment plans, and medical research.",
      category: "Technology",
      date: "4 hours ago"
    },
    {
      title: "The Future of Work: Remote vs. Office-Based Employment",
      excerpt: "Analyzing the pros and cons of different work models in the post-pandemic era.",
      category: "Business",
      date: "6 hours ago"
    },
    {
      title: "New Breakthrough in Quantum Computing",
      excerpt: "Scientists achieve major milestone in quantum supremacy.",
      category: "Technology",
      date: "8 hours ago"
    },
    {
      title: "Eco-Tourism: Balancing Adventure and Conservation",
      excerpt: "How responsible travel is shaping the future of tourism industry.",
      category: "Travel",
      date: "10 hours ago"
    }
  ];

  const featuredArticle = {
    title: "The Impact of Cultural Diversity on Fashion Trends",
    excerpt: "Exploring the Rich Tapestry of Global Fashion: How Cultural Diversity Shapes Trends and Inspires Innovation Across the Industry!",
    image: "/images/life/life2.jpg",
    category: "Fashion",
    author: "Sophie Ellis",
    date: "April 15, 2024"
  };

  const secondaryArticles = [
    {
      title: "Sustainable Fabrics and Materials Revolutionizing the Fashion Industry",
      excerpt: "How eco-friendly materials are changing the face of fashion.",
      image: "/images/life/life4.jpg",
      category: "Fashion",
      author: "John Doe",
      date: "April 14, 2024"
    },
    {
      title: "The Rise of Virtual Fashion Shows and Digital Clothing",
      excerpt: "Exploring the intersection of technology and fashion in the digital age.",
      image: "/images/life/life3.jpg",
      category: "Technology",
      author: "Jane Smith",
      date: "April 13, 2024"
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
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % allArticles.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
              <FeaturedArticle key={currentArticleIndex} article={allArticles[currentArticleIndex]} />
            </AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {secondaryArticles.map((article, index) => (
                <SecondaryArticleCard key={index} article={article} index={index} />
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