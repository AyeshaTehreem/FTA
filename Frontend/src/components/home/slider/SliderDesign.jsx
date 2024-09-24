import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const newsItems = [
    {
        date: "December 09, 2020",
        author: "David Hall",
        title: "Republican Senator Vital To Health",
        category: "FASHION",
        image: "/images/discover/d1.jpg",
        authorImage: "/images/life/life2.jpg"
      },
      {
        date: "December 09, 2020",
        author: "David Hall",
        title: "Barack Obama And Family Visit Indonesia",
        category: "SPORTS",
        image: "/images/discover/d2.jpg",
        authorImage:"/images/life/life3.jpg"
      },
      {
        date: "December 09, 2020",
        author: "David Hall",
        title: "6 Best Tips For Building A Good Shipping Boat",
        category: "TRAVEL",
        image: "/images/discover/d3.jpg",
        authorImage: "/images/life/life4.jpg"
      },
      {
        date: "December 10, 2020",
        author: "Jane Doe",
        title: "New Advances in AI Technology",
        category: "BUSINESS",
        image: "/images/discover/d4.jpg",
        authorImage:"/images/life/life3.jpg"
      },
      {
        date: "December 11, 2020",
        author: "John Smith",
        title: "The Future of Renewable Energy",
        category: "SCIENCE",
        image: "/images/discover/d5.jpg",
        authorImage: "/images/life/life1.jpg"
      },
      {
        date: "December 12, 2020",
        author: "Alice Johnson",
        title: "Exploring the Depths of the Ocean",
        category: "NATURE",
        image: "/images/discover/d6.jpg",
        authorImage:"/images/life/life2.jpg"
      },
    ];

    const NewsSlider = () => {
        const [currentIndex, setCurrentIndex] = useState(0);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
          }, 5000);
          return () => clearInterval(interval);
        }, []);
      
        const handlePrev = () => {
          setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
        };
      
        const handleNext = () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
        };
      
        const visibleItems = [
          newsItems[currentIndex],
          newsItems[(currentIndex + 1) % newsItems.length],
          newsItems[(currentIndex + 2) % newsItems.length],
        ];
      
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
              {visibleItems.map((item, idx) => (
                <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <div className="p-4 flex-grow">
                      <div className="flex mb-4">
                        <div className="w-16 h-16 flex-shrink-0 mr-4 relative">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-full border-2 border-pink-500" />
                          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                            {item.category}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold line-clamp-2 text-gray-800 hover:text-pink-500 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                      <div className="flex items-center mt-auto border-t pt-2 border-gray-200">
                        <img src={item.authorImage} alt={item.author} className="w-8 h-8 rounded-full mr-2 object-cover" />
                        <span className="text-sm font-medium text-gray-700">{item.author}</span>
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