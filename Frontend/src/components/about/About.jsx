import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertTriangle, BarChart2, Shield, ArrowUp, ChevronDown, ChevronUp, ExternalLink, GitHub, Linkedin, Twitter, Zap, Globe, Users, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CounterSection from './CounterSection';



const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-red-600"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-red-600 mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        className="w-full text-left bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-t-2xl flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-2xl font-bold">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-b-2xl shadow-lg"
          >
            <p className="text-lg text-gray-700 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TeamMember = ({ name, role, image, socialLinks, index }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl transform rotate-6 group-hover:rotate-0 transition-transform duration-300"></div>
    <div className="relative bg-white p-6 rounded-2xl shadow-xl overflow-hidden">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded-xl mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-lg text-red-600 mb-4">{role}</p>
      <div className="flex space-x-4 justify-center">
        {Object.entries(socialLinks).map(([platform, link]) => (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-600 transition-colors duration-300"
          >
            {platform === 'linkedin' && <Linkedin size={24} />}
          </a>
        ))}
      </div>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, company, testimonial, image }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img src={image} alt={name} className="w-24 h-24 rounded-full mb-6 object-cover" />
    <p className="text-gray-600 italic mb-6">"{testimonial}"</p>
    <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
    <p className="text-red-600">{role}, {company}</p>
  </motion.div>
);

const FakeNewsAuthenticator = () => {
  const features = [
    { icon: <Search size={48} />, title: 'Advanced Source Verification', description: 'Our AI algorithms meticulously analyze the credibility of news sources, cross-referencing them with our extensive database of verified outlets.' },
    { icon: <AlertTriangle size={48} />, title: 'Real-time Fact Checking', description: 'Instantly cross-reference information with our continuously updated database of facts, ensuring you always have the most accurate information.' },
    { icon: <BarChart2 size={48} />, title: 'Trend Analysis & Prediction', description: 'Identify patterns in fake news spread and predict potential misinformation outbreaks before they happen.' },
    { icon: <Shield size={48} />, title: 'Personalized User Protection', description: 'Tailored alerts and recommendations based on your reading habits and interests, safeguarding you from targeted misinformation.' },
    { icon: <Zap size={48} />, title: 'Instant Analysis', description: 'Get results in seconds, allowing you to quickly determine the reliability of any news article or social media post.' },
    { icon: <Globe size={48} />, title: 'Multi-language Support', description: 'Detect and analyze fake news across multiple languages, helping you navigate global information with confidence.' },
    { icon: <Users size={48} />, title: 'Community-driven Reporting', description: 'Leverage the power of our user community to flag and report potential misinformation, enhancing our detection capabilities.' },
    { icon: <BookOpen size={48} />, title: 'Educational Resources', description: 'Access a wealth of resources to improve your critical thinking skills and become a more discerning news consumer.' },
  ];

  const faqItems = [
    { question: "What sets your Fake News Authenticator apart from others?", answer: "Our authenticator combines cutting-edge AI with a vast, continually updated database and community-driven insights. This multi-faceted approach allows for unparalleled accuracy and real-time protection against evolving misinformation tactics." },
    { question: "How does the authenticator handle complex or nuanced topics?", answer: "We employ advanced natural language processing to understand context and nuance. For complex topics, our system provides a confidence score along with explanations, allowing users to make informed judgments." },
    { question: "Can the authenticator be integrated into other platforms or apps?", answer: "Absolutely! We offer robust APIs and SDKs that allow seamless integration into various platforms, from social media apps to news aggregators, ensuring widespread protection against misinformation." },
    { question: "How do you ensure the privacy and security of user data?", answer: "We prioritize user privacy and employ end-to-end encryption for all data transmissions. Our analysis is performed locally when possible, and any stored data is anonymized and protected by state-of-the-art security measures." },
    { question: "How often is your database updated?", answer: "Our database is updated in real-time, with new information and fact-checks being added continuously. We also perform scheduled comprehensive updates every 24 hours to ensure the highest level of accuracy." },
  ];

  const teamMembers = [
    { name: "Dr. Alex Johnson", role: "Chief AI Researcher", image: "/api/placeholder/300/300", socialLinks: { github: "#", linkedin: "#", twitter: "#" } },
    { name: "Samantha Lee, Ph.D.", role: "Lead Data Scientist", image: "/api/placeholder/300/300", socialLinks: { github: "#", linkedin: "#", twitter: "#" } },
    { name: "Michael Chen", role: "UX/UI Design Director", image: "/api/placeholder/300/300", socialLinks: { github: "#", linkedin: "#", twitter: "#" } },
    { name: "Emily Taylor, M.A.", role: "Head of Content Strategy", image: "/api/placeholder/300/300", socialLinks: { github: "#", linkedin: "#", twitter: "#" } },
  ];

  const testimonials = [
    { name: "John Smith", role: "Editor-in-Chief", company: "Global News Network", testimonial: "This tool has revolutionized our fact-checking process. It's an indispensable asset in our newsroom.", image: "/api/placeholder/100/100" },
    { name: "Sarah Johnson", role: "Social Media Manager", company: "Tech Innovations Inc.", testimonial: "The real-time analysis has helped us maintain credibility in our fast-paced social media environment.", image: "/api/placeholder/100/100" },
    { name: "David Lee", role: "Professor", company: "University of Technology", testimonial: "An excellent educational tool. It's helping my students develop critical thinking skills for the digital age.", image: "/api/placeholder/100/100" },
  ];

  const chartData = [
    { name: 'Jan', fakeNews: 4000, authenticNews: 2400 },
    { name: 'Feb', fakeNews: 3000, authenticNews: 1398 },
    { name: 'Mar', fakeNews: 2000, authenticNews: 9800 },
    { name: 'Apr', fakeNews: 2780, authenticNews: 3908 },
    { name: 'May', fakeNews: 1890, authenticNews: 4800 },
    { name: 'Jun', fakeNews: 2390, authenticNews: 3800 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-red-600 opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-red-900"></div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-7xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unveil the Truth in a World of Misinformation
          </motion.h1>
          <motion.p
            className="text-2xl mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Harness the power of AI to distinguish fact from fiction. Our Fake News Authenticator empowers you to navigate the digital landscape with confidence.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Zap className="mr-2" /> Try It Now
            </motion.button>
            <motion.button
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BookOpen className="mr-2" /> Learn More
            </motion.button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
          <svg className="relative block w-full h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      <CounterSection/>

   {/* Features Section */}
   <section className="py-20 px-4 bg-gray-50">
     <div className="max-w-6xl mx-auto">
       <motion.h2
         className="text-5xl font-bold text-center mb-16 text-gray-800"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         Cutting-Edge Features
       </motion.h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {features.map((feature, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.1 }}
           >
             <FeatureCard {...feature} />
           </motion.div>
         ))}
       </div>
     </div>
   </section>

   {/* How It Works Section */}
   <section className="py-20 px-4 bg-white">
     <div className="max-w-6xl mx-auto">
       <motion.h2
         className="text-5xl font-bold text-center mb-16 text-gray-800"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         How It Works
       </motion.h2>
       <div className="relative">
         <div className="absolute inset-0 flex items-center" aria-hidden="true">
           <div className="w-full border-t-4 border-red-200"></div>
         </div>
         <div className="relative flex justify-between">
           {['Input Article', 'AI Analysis', 'Fact Checking', 'User Alert'].map((step, index) => (
             <motion.div
               key={index}
               className="text-center"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
             >
               <span className="relative flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full h-24 w-24 text-3xl font-bold">
                 {index + 1}
               </span>
               <span className="mt-4 block text-xl font-medium text-gray-900">{step}</span>
             </motion.div>
           ))}
         </div>
       </div>
     </div>
   </section>

   {/* Analytics Dashboard */}
   <section className="py-20 px-4 bg-gray-50">
     <div className="max-w-6xl mx-auto">
       <motion.h2
         className="text-5xl font-bold text-center mb-16 text-gray-800"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         Real-time Analytics Dashboard
       </motion.h2>
       <motion.div
         className="bg-white p-8 rounded-2xl shadow-lg"
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
       >
         <ResponsiveContainer width="100%" height={400}>
           <LineChart data={chartData}>
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="name" />
             <YAxis />
             <Tooltip />
             <Line type="monotone" dataKey="fakeNews" stroke="#ef4444" strokeWidth={3} />
             <Line type="monotone" dataKey="authenticNews" stroke="#22c55e" strokeWidth={3} />
           </LineChart>
         </ResponsiveContainer>
       </motion.div>
     </div>
   </section>

   {/* FAQ Section */}
   <section className="py-20 px-4 bg-white">
     <div className="max-w-4xl mx-auto">
       <motion.h2
         className="text-5xl font-bold text-center mb-16 text-gray-800"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         Frequently Asked Questions
       </motion.h2>
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.2 }}
       >
         {faqItems.map((item, index) => (
           <FAQItem key={index} {...item} index={index} />
         ))}
       </motion.div>
     </div>
   </section>

   {/* Team Section */}
   <section className="py-20 px-4 bg-gray-50">
     <div className="max-w-6xl mx-auto">
       <motion.h2
         className="text-5xl font-bold text-center mb-16 text-gray-800"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         Meet Our Expert Team
       </motion.h2>
       <motion.div
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.2 }}
       >
         {teamMembers.map((member, index) => (
           <TeamMember key={index} {...member} index={index} />
         ))}
       </motion.div>
     </div>
   </section>

   {/* Testimonials Section */}
   <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-100">
     <div className="max-w-6xl mx-auto">
       <motion.h2
         className="text-5xl font-bold text-center mb-16 text-gray-800"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         What Our Users Say
       </motion.h2>
       <motion.div
         className="grid grid-cols-1 md:grid-cols-3 gap-12"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5, delay: 0.2 }}
       >
         {testimonials.map((testimonial, index) => (
           <TestimonialCard key={index} {...testimonial} />
         ))}
       </motion.div>
     </div>
   </section>

   {/* Call-to-Action Section */}
   <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-red-800 text-white">
     <div className="max-w-4xl mx-auto text-center">
       <motion.h2
         className="text-5xl font-bold mb-8"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
       >
         Ready to Unveil the Truth?
       </motion.h2>
       <motion.p
         className="text-2xl mb-12"
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 0.2 }}
       >
         Join millions of users who are already navigating the digital world with confidence. Try our Fake News Authenticator today!
       </motion.p>
       <motion.button
         className="bg-white text-red-600 px-10 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
       >
         Get Started for Free
       </motion.button>
     </div>
   </section>
 </div>
);
};

export default FakeNewsAuthenticator;