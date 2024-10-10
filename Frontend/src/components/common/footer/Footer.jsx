import React from "react";
import { ChevronRight, Twitter, Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const categories = [
    "Business", "Technology", "Lifestyle", "Entertainment", "Culture", "Startups"
  ];
  
  const hotTopics = [
    "AI & Future", "Crypto", "Climate Change", "Innovation", "Digital Life",
    "Smart Cities", "Future of Work", "Sustainability"
  ];

  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-45 -left-1/4 -top-1/4 w-1/2 h-1/2 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute transform -rotate-45 -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-red-700 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main Content Section */}
          <div className="md:col-span-5">
            <h2 className="text-4xl font-bold mb-6">Stay Ahead of the Curve</h2>
            <p className="text-gray-400 mb-8">Join our community of forward-thinkers and innovators. Get exclusive insights delivered to your inbox.</p>
            <div className="flex mb-8">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 px-4 py-3 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-500 px-6 py-3 rounded-r-lg hover:bg-red-600 transition-colors flex items-center">
                Subscribe <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
            <div className="flex space-x-4">
              <Twitter className="hover:text-red-500 cursor-pointer transition-colors" />
              <Instagram className="hover:text-red-500 cursor-pointer transition-colors" />
              <Facebook className="hover:text-red-500 cursor-pointer transition-colors" />
              <Linkedin className="hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index} className="flex items-center group cursor-pointer">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:text-red-500 transition-colors">{category}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Trending Topics Section */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-6">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {hotTopics.map((topic, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-white/10 rounded-full text-sm hover:bg-red-500 cursor-pointer transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2024 FTA TIMES Platform. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-500 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
