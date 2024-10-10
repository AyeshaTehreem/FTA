import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sun, Moon, Zap } from 'lucide-react';
import axios from 'axios';

const API_KEY = "AIzaSyB4sFnRfvnLN9UXShb9UNZGG3s7zIyFn3E";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello, I'm the AI Assistant! How can I help you today?", sender: 'AI' }
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
      await processMessageToGemini(newMessages, inputMessage);
    }
  };

  const processMessageToGemini = async (chatMessages, userMessage) => {
    // Define keywords related to greetings
    const greetingKeywords = [
      'hello', 'hi', 'hey', 'greetings', 'what is this', 'introduce'
    ];
    
    // Define keywords related to the fake news verification platform
    const verificationKeywords = [
      'fake news', 'misinformation', 'disinformation', 'fact check', 'verify', 'truth', 'news', 'report', 
      // Add more keywords relevant to your platform
    ];

    // Check if the message contains greeting-related keywords
    const isGreeting = greetingKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    // Check if the message contains verification-related keywords
    const isVerificationQuestion = verificationKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    if (isGreeting) {
      // If it's a greeting, respond with an introduction to the platform
      const introductionMessage = "Welcome to FTA Times! We are dedicated to verifying news and combating misinformation. How can I assist you today?";
      setMessages([...chatMessages, {
        text: introductionMessage,
        sender: "AI"
      }]);
      setIsTyping(false);
    } else if (isVerificationQuestion) {
      // If it's a verification-related question, use Gemini API to process it
      const data = {
        contents: [
          {
            parts: [
              { 
                text: `You are an AI assistant for FTA Times, a platform dedicated to verifying news and combating misinformation. Here's a user query: "${userMessage}"` 
              }
            ]
          }
        ]
      };

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
          data,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

        setMessages([...chatMessages, {
          text: generatedContent,
          sender: "AI"
        }]);
      } catch (error) {
        console.error("Error with Gemini API request:", error);
        setMessages([...chatMessages, {
          text: "Error with Gemini API request. Please try again later.",
          sender: "AI"
        }]);
      } finally {
        setIsTyping(false);
      }
    } else {
      // If it's not a greeting or verification-related question, respond with a default message
      setMessages([...chatMessages, {
        text: 'For more information on how we verify news, please visit our website.',
        sender: 'AI'
      }]);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 font-sans">
      {isOpen ? (
        <div className="w-96 h-[32rem] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col animate-slideUp">
          <div className="bg-white text-gray-800 p-4 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold">AI Assistant</h2>
            <button onClick={toggleChat} className="text-gray-600 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-red-100 text-gray-800' 
                    : 'bg-gray-100 text-gray-800'
                } shadow-sm max-w-[80%] animate-fadeIn`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-red-500 text-sm animate-pulse flex items-center">
                <Zap size={16} className="mr-2" />
                AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex items-center bg-gray-100 rounded-full shadow-inner overflow-hidden">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow px-4 py-2 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                placeholder="Type your message..."
              />
              <button onClick={handleSend} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center animate-pulse"
        >
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
      background: rgba(0, 0, 0, 0.05);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 3px;
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