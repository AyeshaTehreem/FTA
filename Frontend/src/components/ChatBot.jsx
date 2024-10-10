import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sun, Moon, Zap } from 'lucide-react';
import axios from 'axios';

const API_KEY = "AIzaSyB4sFnRfvnLN9UXShb9UNZGG3s7zIyFn3E";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "I'm here to help you with news verification. Please ask about our process or related topics.", sender: 'AI' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSend = async () => {
    if (inputMessage.trim()) {
      const newMessage = { text: inputMessage, sender: 'user' };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInputMessage('');
      setIsTyping(true);
      await processUserMessage(newMessages, inputMessage);
    }
  };

  const processUserMessage = async (chatMessages, userMessage) => {
    let responseMessage;

    // Normalize the user message for easier comparison
    const normalizedMessage = userMessage.toLowerCase().trim();

    // Basic keyword matching for specific questions
    if (normalizedMessage.includes("how does it work",) || normalizedMessage.includes("how it works") || normalizedMessage.includes("what is the process")|| normalizedMessage.includes("what is it do")|| normalizedMessage.includes("how")) {
        responseMessage = "Our news verification process involves analyzing the credibility of sources, fact-checking claims, and providing users with accurate information. You can submit any news article for verification, and our AI will assess its validity based on established criteria.";
    } else if (normalizedMessage.includes("how to contact you") || normalizedMessage.includes("contact")|| normalizedMessage.includes("how to reach out to you"|| normalizedMessage.includes("where to contact you")|| normalizedMessage.includes("where are you"))) {
        responseMessage = "You can reach us via our [Contact Us](http://localhost:3000/contact) page. We're happy to assist you!";
    }
        else if (normalizedMessage.includes("how to contact you") || normalizedMessage.includes("contact")|| normalizedMessage.includes("how to reach out to you"|| normalizedMessage.includes("where to contact you")|| normalizedMessage.includes("where are you"))) {
          responseMessage = "You can reach us via our [Contact Us](http://localhost:3000/contact) page. We're happy to assist you!";
  

    } else {
        responseMessage = "I'm here to help you with news verification. Please ask about our process or related topics.";
    }


    setMessages([...chatMessages, {
        text: responseMessage,
        sender: "AI"
    }]);

    setIsTyping(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`fixed bottom-4 right-4 font-sans ${isDarkMode ? 'dark' : ''}`}>
      {isOpen ? (
        <div className="w-96 h-[32rem] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col animate-slideUp"> {/* Set background to white */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center"> {/* Header in red */}
            <h2 className="text-xl font-bold">FTA Times Chatbot</h2>
            <div className="flex items-center space-x-2">
              <button onClick={toggleDarkMode} className="text-white hover:text-yellow-300 transition-colors">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 bg-opacity-10 custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-black'
                } shadow-md max-w-[80%] animate-fadeIn`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-red-600 text-sm animate-pulse flex items-center">
                <Zap size={16} className="mr-2" />
                AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-300"> {/* Footer in light color */}
            <div className="flex items-center bg-gray-200 rounded-full shadow-inner overflow-hidden">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow px-4 py-2 bg-transparent text-black placeholder-gray-400 focus:outline-none"
                placeholder="Type your message..."
              />
              <button onClick={handleSend} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"> {/* Button in red */}
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all flex items-center animate-pulse"> {/* Button in red */}
          <MessageCircle size={24} className="mr-2" />
          <span className="font-bold">Chat with AI</span>
        </button>
      )}
    </div>
  );
};

const CustomStyles = () => (
  <style jsx global>{`
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slideUp {
      animation: slideUp 0.3s ease-out;
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    .dark .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }
    .dark .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
    }
  `}</style>
);

const ChatBotWithCustomStyles = () => (
  <>
    <ChatBox />
    <CustomStyles />
  </>
);

export default ChatBotWithCustomStyles;
