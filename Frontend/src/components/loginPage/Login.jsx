import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-400 to-black">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row relative">
          <motion.div 
            initial={false}
            animate={{ x: isLogin ? '0%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-red-600 text-white p-12 md:w-1/2 absolute top-0 left-0 h-full rounded-r-3xl flex flex-col justify-center items-center"
          >
            <h2 className="text-4xl font-bold mb-6">{isLogin ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
            <p className="mb-8 text-lg">
              {isLogin 
                ? 'Enter your personal details to use all of site features' 
                : 'Register with your personal details to use all of site features'}
            </p>
            <button
              onClick={toggleForm}
              className="px-8 py-3 border-2 border-white rounded-full text-lg font-semibold hover:bg-white hover:text-red-600 transition duration-300"
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </motion.div>

          <div className="md:flex md:w-full">
            <div className={`p-12 md:w-1/2 ${isLogin ? 'hidden md:block' : ''}`}>
              <h2 className="text-4xl font-bold mb-8">Create Account</h2>
              <div className="flex space-x-4 mb-8">
                {['G', 'f', 'in'].map((icon, index) => (
                  <button key={index} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 text-xl">
                    {icon}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-8">or use your email for registration</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300" 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300" 
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-6 w-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'SIGN UP'}
                </motion.button>
              </form>
            </div>

            <div className={`p-12 md:w-1/2 ${isLogin ? '' : 'hidden md:block'}`}>
              <h2 className="text-4xl font-bold mb-8">Sign In</h2>
              <div className="flex space-x-4 mb-8">
                {['G', 'f', 'in'].map((icon, index) => (
                  <button key={index} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 text-xl">
                    {icon}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-8">or use your email account</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300" 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300" 
                />
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 form-checkbox text-red-600" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-red-600 hover:underline">Forgot Password?</button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-6 w-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'SIGN IN'}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
