import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;

      if (isLogin) {
        response = await axios.post('http://localhost:5002/auth/login', { email, password }, { withCredentials: true });
      } else {
        response = await axios.post('http://localhost:5002/auth/register', { username, email, password });
        setUsername('');
        setEmail('');
        setPassword('');
        setIsLogin(true);
        setIsLoading(false);
        return;
      }

      const { username: userName, email: userEmail, role } = response.data;
      login(userName, userEmail, role);
      navigate('/');
    } catch (error) {
      console.error(isLogin ? 'Login failed:' : 'Registration failed:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }

    setIsLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-400 to-black p-4 sm:p-6 md:p-8">
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
            className="bg-red-600 text-white p-6 sm:p-12 md:w-1/2 absolute top-0 left-0 h-full rounded-r-3xl flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{isLogin ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
            <p className="mb-6 sm:mb-8 text-sm sm:text-lg text-center">
              {isLogin 
                ? 'Enter your personal details to use all of site features' 
                : 'Register with your personal details to use all of site features'}
            </p>
            <button
              onClick={toggleForm}
              className="px-6 sm:px-8 py-2 sm:py-3 border-2 border-white rounded-full text-sm sm:text-lg font-semibold hover:bg-white hover:text-red-600 transition duration-300"
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </motion.div>

          <div className="md:flex md:w-full">
            <div className={`p-6 sm:p-12 md:w-1/2 ${isLogin ? 'hidden md:block' : ''}`}>
              <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Create Account</h2>
              <div className="flex space-x-4 mb-6 sm:mb-8">
                {['G', 'f', 'in'].map((icon, index) => (
                  <button key={index} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 text-lg sm:text-xl">
                    {icon}
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">or use your email for registration</p>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {!isLogin && (
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full p-3 sm:p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-3 sm:p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-3 sm:p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-lg font-semibold hover:bg-red-700 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isLogin ? 'SIGN IN' : 'SIGN UP'}
                </motion.button>
              </form>
            </div>

            <div className={`p-6 sm:p-12 md:w-1/2 ${isLogin ? '' : 'hidden md:block'}`}>
              <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Sign In</h2>
              <div className="flex space-x-4 mb-6 sm:mb-8">
                {['G', 'f', 'in'].map((icon, index) => (
                  <button key={index} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 text-lg sm:text-xl">
                    {icon}
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">or use your email account</p>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-3 sm:p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-3 sm:p-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-lg font-semibold hover:bg-red-700 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isLogin ? 'SIGN IN' : 'SIGN UP'}
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
