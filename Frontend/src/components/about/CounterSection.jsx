import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Users, CheckCircle, FileText } from 'lucide-react';

const Counter = ({ value, label, icon: Icon, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/,/g, ''));
    const incrementTime = (2000 / end) * 1000;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      className={`bg-white rounded-2xl shadow-2xl p-6 text-center relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute top-0 left-0 w-full h-2 ${color}`}></div>
      <motion.div
        className="text-6xl font-bold mb-2 relative z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
          {count.toLocaleString()}
        </span>
        <motion.span 
          className="text-2xl ml-1 inline-block"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowUp className={`inline ${color.replace('from-', 'text-').split(' ')[0]}`} />
        </motion.span>
      </motion.div>
      <p className="text-xl text-gray-600 mb-4">{label}</p>
      <motion.div
        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${color} text-white`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <Icon size={32} />
      </motion.div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gray-100 opacity-20"></div>
    </motion.div>
  );
};

const CountersSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Impact in Numbers
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Counter
            value="10,000,000" 
            label="Articles Analyzed Daily" 
            icon={FileText}
            color="from-blue-500 to-blue-700"
          />
          <Counter 
            value="99.9" 
            label="Accuracy Rate" 
            icon={CheckCircle}
            color="from-green-500 to-green-700"
          />
          <Counter
            value="5,000,000" 
            label="Users Protected" 
            icon={Users}
            color="from-purple-500 to-purple-700"
          />
        </div>
      </div>
    </div>
  );
};

export default CountersSection;
