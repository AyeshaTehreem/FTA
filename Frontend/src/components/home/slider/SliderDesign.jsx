import React, { useState, useEffect } from 'react';

const newsItems = [
    {
        date: "December 09, 2020",
        author: "David Hall",
        title: "Republican Senator Vital To Health",
        category: "FASHION",
        image: "/images/discover/d1.jpg"
    },
    {
        date: "December 09, 2020",
        author: "David Hall",
        title: "Barack Obama And Family Visit Indonesia",
        category: "SPORTS",
        image: "/images/discover/d2.jpg"
    },
    {
        date: "December 09, 2020",
        author: "David Hall",
        title: "6 Best Tips For Building A Good Shipping Boat",
        category: "TRAVEL",
        image: "/images/discover/d3.jpg"
    },
    {
        date: "December 10, 2020",
        author: "Jane Doe",
        title: "New Advances in AI Technology",
        category: "BUSINESS",
        image: "/images/discover/d4.jpg"
    },
    {
        date: "December 11, 2020",
        author: "John Smith",
        title: "The Future of Renewable Energy",
        category: "SCIENCE",
        image: "/images/discover/d5.jpg"
    },
    {
        date: "December 12, 2020",
        author: "Alice Johnson",
        title: "Exploring the Depths of the Ocean",
        category: "NATURE",
        image: "/images/discover/d6.jpg"
    },
];

const NewsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 3) % newsItems.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center w-full overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}>
                {Array.from({ length: Math.ceil(newsItems.length / 3) }).map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-full flex justify-center space-x-4">
                        {newsItems.slice(index * 3, index * 3 + 3).map((item, idx) => (
                            <div key={idx} className="p-4 flex flex-row bg-white rounded-lg shadow-lg w-96">
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">{item.category}</div>
                                </div>
                                <div className="p-2 ml-4 flex flex-col justify-between">
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">
                                            {item.title}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {item.date}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center mt-2">
                                        <svg className="w-4 h-4 text-pink-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 4a4 4 0 110-8 4 4 0 010 8zm12 0a4 4 0 110-8 4 4 0 010 8zM6 10a6 6 0 000 12h8a6 6 0 000-12H6zm0 2h8a4 4 0 010 8H6a4 4 0 010-8z" />
                                        </svg>
                                        {item.author}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsSlider;
