import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [currentColor, setCurrentColor] = useState('#EF4444'); // Initial red color
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / pageHeight;
      const colorIndex = Math.floor(scrollPercentage * colors.length);
      setCurrentColor(colors[colorIndex]);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 overflow-hidden">
      <motion.div
        style={{ backgroundColor: currentColor }}
        className="fixed top-0 left-0 right-0 h-2 z-50"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <motion.h1 
          className="text-7xl font-bold text-center mb-16"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ color: currentColor }}
        >
          Contact TruthGuard News
        </motion.h1>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: -1 }}
          >
            <h2 className="text-3xl font-semibold mb-6" style={{ color: currentColor }}>Contact Information</h2>
            <div className="space-y-6">
              {[
                { Icon: MapPin, text: "123 Truth Street, Factville, FA 12345, USA" },
                { Icon: Phone, text: "+1 (555) 123-4567" },
                { Icon: Mail, text: "contact@truthguardnews.com" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center" 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <item.Icon className="mr-4 w-6 h-6" style={{ color: currentColor }} />
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mt-10 mb-6" style={{ color: currentColor }}>Follow Us</h3>
           
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-6" style={{ color: currentColor }}>Send Us a Message</h2>
            <form className="space-y-4">
              {[
                { type: "text", placeholder: "Full Name" },
                { type: "email", placeholder: "Email Address" },
                { type: "select", placeholder: "Select Reason for Contact", options: ["Report Misinformation", "Request News Verification", "Provide Feedback", "Other"] },
                { type: "textarea", placeholder: "Your Message", rows: 4 }
              ].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {field.type === "select" ? (
                    <select 
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{ focusRing: currentColor }}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea 
                      placeholder={field.placeholder}
                      rows={field.rows}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{ focusRing: currentColor }}
                    />
                  ) : (
                    <input 
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{ focusRing: currentColor }}
                    />
                  )}
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full text-white font-semibold py-3 rounded-lg transition duration-300"
                style={{ backgroundColor: currentColor }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold mb-10 text-center" style={{ color: currentColor }}>Our News Authentication Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: "Fact Verification", description: "Our team of expert fact-checkers rigorously verify every piece of information before publication." },
              { icon: AlertTriangle, title: "Misinformation Alert", description: "We actively identify and flag potential misinformation to keep our readers well-informed." },
              { icon: HelpCircle, title: "Community Engagement", description: "We encourage our readers to report suspicious news and participate in the verification process." }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                  backgroundColor: currentColor,
                  color: "white"
                }}
                onClick={() => setActiveSection(index)}
              >
                <motion.div
                  className="w-16 h-16 mb-4 mx-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <item.icon size={64} />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activeSection === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-center">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl font-semibold mb-10 text-center" style={{ color: currentColor }}>Visit Our Headquarters</h2>
          <motion.div
            className="rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12420.472664642805!2d-74.00597299999999!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1b7e4f3f0f%3A0x4a01c8df6fb3cb8!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1628703993307!5m2!1sen!2sus"
              className="w-full h-96"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-gray-300"
        style={{ scaleX: pathLength }}
      />
    </div>
  );
};

export default Contact;