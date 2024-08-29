import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NewsSection = () => {
  const [showScroll, setShowScroll] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pollVotes, setPollVotes] = useState({ option1: 0, option2: 0, option3: 0, option4: 0 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleVote = (option) => {
    setPollVotes(prev => ({ ...prev, [option]: prev[option] + 1 }));
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <motion.div
          key={i}
          className={`cursor-pointer ${i === selectedDate.getDate() ? 'bg-red-600 text-white' : 'hover:bg-gray-200'} rounded-full w-8 h-8 flex items-center justify-center`}
          onClick={() => handleDateClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {i}
        </motion.div>
      );
    }

    return days;
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-12"
    >
      <div className="w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 mb-8"></div>
      <div className="flex flex-wrap -mx-4">
        
        {/* Left sidebar */}
        <div className="w-full md:w-1/4 px-4">
          <div className="sticky top-4">
            <motion.div 
              className="bg-white shadow-lg rounded-lg p-6 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4 text-red-600 uppercase">Tech & Innovation</h2>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <img src="/images/life/life3.jpg" alt="Laptop" className="w-full mb-2 rounded-lg" />
                  <h3 className="font-semibold">Phasellus placerat massa nec metus ornare molestie.</h3>
                  <p className="text-xs text-red-600 uppercase">Europe - Jan 4, 2021</p>
                  <p className="text-sm">To understand the new politics stance and other pro nationals of recent...</p>
                </motion.div>
                <div className="space-y-2">
                  {['Trainings are getting really hard reaching the final',
                    'The victory against The Sharks brings us closer to the Final',
                    'The next match against The Clovers will be this Friday'].map((text, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="font-semibold">{text}</p>
                      <p className="text-xs text-gray-500">Jan 4, 2021</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white shadow-lg rounded-lg p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4 text-red-600 uppercase">Editor's Picks</h2>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <img src="/images/life/life2.jpg" alt="City" className="w-full rounded-lg" />
                <h3 className="font-semibold mt-2">Donec scelerisque massa quis ante facilisis, non pulvinar.</h3>
                <p className="text-xs text-red-600 uppercase">Europe - Jan 4, 2021</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-2xl font-bold mb-6 text-red-600 uppercase">Latest Articles</h2>
          <div className="space-y-8">
            {[...Array(5)].map((_, index) => (
              <motion.div 
                className="flex bg-white shadow-lg rounded-lg overflow-hidden" 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img className="w-1/3 object-cover" src="/images/life/life3.jpg" alt="Article" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">There are many variations of passages of Lorem Ipsum available, but the majority have</h3>
                  <p className="text-xs text-red-600 uppercase mb-2">Tech - By John Doe - Aug 16, 2023</p>
                  <p className="text-sm text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500...</p>
                  <motion.button
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {[1, 2, 3, '...', 12].map((item, index) => (
              <motion.button 
                key={index}
                className={`px-3 py-1 ${item === 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-full`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-full md:w-1/4 px-4">
          <div className="sticky top-4 space-y-8">
            <motion.div 
              className="bg-blue-500 text-white p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-4xl font-bold">39°C</h2>
              <p className="text-xl">Partly Sunny</p>
              <p className="text-sm">Real Feel: 67° Chance of Rain</p>
              <p className="mt-4">Saturday, March 26th</p>
              <p>San Francisco, CA</p>
            </motion.div>
            <motion.div 
              className="bg-gray-100 p-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/images/life/life1.jpg" alt="Advertisement" className="w-full rounded-lg mb-4" />
              <h3 className="text-lg font-bold mt-2">THE BEST MAGAZINE & BLOG THEME</h3>
              <motion.button 
                className="bg-yellow-500 text-black px-6 py-2 mt-4 rounded-full font-semibold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                BUY NOW
              </motion.button>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-bold mb-4">August 2024</h3>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="font-semibold">{day}</div>
                ))}
                {renderCalendar()}
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Selected date: {selectedDate.toDateString()}
              </p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-bold mb-4">POLL</h3>
              <p className="mb-4">What's your favorite season?</p>
              {['Spring', 'Summer', 'Autumn', 'Winter'].map((season, index) => (
                <motion.button
                  key={season}
                  className="w-full mb-2 p-2 bg-gray-100 rounded-lg text-left"
                  onClick={() => handleVote(`option${index + 1}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {season}
                  <span className="float-right">{pollVotes[`option${index + 1}`]} votes</span>
                </motion.button>
              ))}
              <p className="mt-4 text-sm text-gray-600">
                Total votes: {Object.values(pollVotes).reduce((a, b) => a + b, 0)}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {showScroll && (
        <motion.button
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg"
          onClick={scrollTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      )}
    </motion.div>
  );
};

export default NewsSection;