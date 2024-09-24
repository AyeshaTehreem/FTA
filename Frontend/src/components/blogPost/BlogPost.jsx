import React, { useState, useEffect } from 'react';
import { Heart, Share2, MessageSquare, Bookmark, ThumbsUp, Eye, Clock, Tag, User, Calendar, ChevronLeft, ChevronRight, Flag } from 'lucide-react';

const BlogPost = () => {
  const [activeTag, setActiveTag] = useState(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [likes, setLikes] = useState(1523);
  const [views, setViews] = useState(15234);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: 'Jane Doe', content: 'Great article! Very insightful.', likes: 12, replies: [], timestamp: '2024-01-15T10:30:00Z' },
    { id: 2, author: 'John Smith', content: 'I disagree with point 3. Here\'s why...', likes: 5, replies: [], timestamp: '2024-01-15T11:45:00Z' },
    { id: 3, author: 'Alice Johnson', content: 'Thanks for sharing this information!', likes: 8, replies: [], timestamp: '2024-01-15T13:20:00Z' },
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState([
    { title: 'The Future of AI in 2024', author: 'Sarah Connor', date: '2024-01-15', image: "/images/life/life1.jpg" },
    { title: 'Blockchain Revolution in Finance', author: 'Mark Zuckerberg', date: '2024-01-18', image: "/images/life/life3.jpg" },
    { title: '5G and Its Impact on IoT', author: 'Elon Musk', date: '2024-01-20', image:"/images/life/life3.jpg" },
  ]);
  const [showFullContent, setShowFullContent] = useState(false);

  const tags = [
    '#AI', '#BLOCKCHAIN', '#5G', '#IOT', '#CYBERSECURITY', 
    '#CLOUD', '#BIGDATA', '#VR', '#AR', '#QUANTUM'
  ];

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const handleSearch = () => {
    console.log(`Searching for: Year ${year}, Month ${month}, Date ${date}`);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % relatedArticles.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + relatedArticles.length) % relatedArticles.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setViews((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const CommentSection = ({ comments: initialComments }) => {
    const [localComments, setLocalComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
  
    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim()) {
        const newCommentObj = {
          id: localComments.length + 1,
          author: 'Anonymous',
          content: newComment,
          likes: 0,
          replies: [],
          timestamp: new Date().toISOString(),
        };
        setLocalComments([newCommentObj, ...localComments]);
        setComments([newCommentObj, ...localComments]); // Update the parent state
        setNewComment('');
      }
    };
  
    const handleCommentLike = (commentId) => {
      const updatedComments = localComments.map(comment => 
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      );
      setLocalComments(updatedComments);
      setComments(updatedComments); // Update the parent state
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Comments ({localComments.length})</h2>
        
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border-2 border-red-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Add a comment..."
            rows="3"
          ></textarea>
          <button 
            type="submit" 
            className="mt-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            Post Comment
          </button>
        </form>
  
        <div className="space-y-6">
          {localComments.map((comment) => (
            <div key={comment.id} className="bg-gray-100 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {comment.author[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-red-600">{comment.author}</p>
                    <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-red-600 transition-colors duration-300">
                  <Flag size={16} />
                </button>
              </div>
              <p className="text-gray-800 mb-3">{comment.content}</p>
              <div className="flex items-center space-x-4 text-sm">
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300"
                  onClick={() => handleCommentLike(comment.id)}
                >
                  <Heart size={16} className={comment.likes > 0 ? 'fill-current text-red-600' : ''} />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300">
                  <MessageSquare size={16} />
                  <span>{comment.replies.length}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-300">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 font-sans bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <main className="lg:w-2/3 lg:pr-8 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2">The 5 Biggest Tech Trends to Watch in 2024</h1>
          <p className="text-gray-600 mb-4 text-lg">Exploring the cutting-edge innovations shaping our digital future</p>
          
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <img src="/images/popular/pop3.jpg" alt="John Doe" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <span className="text-gray-800 font-semibold">By John Doe</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span>January 15, 2024</span>
                  <Tag size={16} className="ml-4 mr-1" />
                  <span>Technology</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleLike} className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                <Heart size={20} className={likes > 1523 ? 'fill-current text-red-600' : ''} />
                <span>{likes}</span>
              </button>
              <button onClick={handleBookmark} className={`text-gray-600 hover:text-yellow-500 ${isBookmarked ? 'text-yellow-500' : ''}`}>
                <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
              </button>
              <button className="text-gray-600 hover:text-blue-600">
                <Share2 size={20} />
              </button>
              <div className="flex items-center text-gray-600">
                <Eye size={20} className="mr-1" />
                <span>{views}</span>
              </div>
            </div>
          </div>
          {/* Image with hover effect */}
          <img 
            src="/images/gallery/g1.jpg" 
            alt="White House Press Conference" 
            className="mb-4 w-full rounded-lg shadow-md transition-all duration-300 transform hover:scale-101 hover:brightness-105 hover:shadow-xl hover:rounded-2xl" 
          />
<div className="mb-4 flex items-center">
  <span className="text-gray-600 mr-4 font-bold hover:text-red-600 cursor-pointer">15.5k views</span>
  <span className="text-gray-600 mr-4 flex items-center font-bold hover:text-red-600 cursor-pointer">
    <i className="fa-regular fa-heart text-red-600 mr-1"></i>
    1.2k Likes
  </span>
  <span className="text-gray-600 mr-4 flex items-center font-bold hover:text-red-600 cursor-pointer">
    <i className="fa-regular fa-comment text-red-600 mr-1"></i>
    320 Comments
  </span>
  <button className="bg-red-600 text-white px-3 py-1 rounded mr-2 hover:bg-red-700">Facebook</button>
  <button className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600">Twitter</button>
  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Whatsapp</button>
  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Telegram</button>
  <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">LinkedIn</button>
</div>





          <article className="prose lg:prose-xl">
           
<p>Even the all-powerful Pointing has no control over the blind texts; it is an almost unorthographic life, full of the unknown and the unpredictable. In the realm of text and typography, 'blind texts' often refer to placeholder content used to fill space and demonstrate the visual form of a document or a typeface without relying on meaningful content. This concept highlights the tension between form and function, showing how design elements can sometimes overpower the content they are meant to support. Our blog delves into this fascinating interplay, exploring how design choices can influence our perception and understanding of text, and how the invisible forces of design shape our interactions with the written word.</p>{/* Rest of the article content */}
          </article>

          <CommentSection comments={comments} />

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="relative">
              <button onClick={() => handleSlideChange('prev')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => handleSlideChange('next')} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10">
                <ChevronRight size={24} />
              </button>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {relatedArticles.map((article, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                      <h3 className="font-bold text-lg mb-1">{article.title}</h3>
                      <p className="text-sm text-gray-600">
                        <User size={16} className="inline mr-1" />
                        {article.author} | 
                        <Calendar size={16} className="inline mx-1" />
                        {article.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Filter By Date</h3>
            <div className="flex flex-col space-y-4">
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                className="border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Year</option>
                {[2024, 2023, 2022, 2021].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
                className="border border-gray-300 p-2 rounded-lg"
                >
                <option value="">Month</option>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
              <select 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="border border-gray-300 p-2 rounded-lg"
              >
                <option value="">Date</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <button 
                onClick={handleSearch} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Most Read</h3>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="mb-4 flex items-center">
                <img src="/images/popular/pop2.jpg" alt="Thumbnail" className="w-28 h-20 object-cover mr-4 rounded-lg" />
                <div>
                  <span className="text-red-600 text-sm">By David Hall, Jan 20, 2024</span>
                  <h4 className="font-bold">The Rise of Quantum Computing in Business</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 m-1 text-sm cursor-pointer rounded-full ${activeTag === tag ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-black p-6 rounded-lg shadow-lg mb-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest tech insights. Subscribe to our newsletter!</p>
            <form className="flex flex-col">
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-lg mb-2 text-gray-800"
                placeholder="Enter your email"
              />
              <button className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Trending Topics</h3>
            <ul className="space-y-2">
              {['AI Ethics', 'Cybersecurity', 'Renewable Tech', 'Space Exploration', 'Biotechnology'].map((topic, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <span className="text-lg">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">About the Author</h3>
            <div className="flex items-center mb-4">
              <img src="/images/popular/pop1.jpg" alt="John Doe" className="w-20 h-20 rounded-full mr-4" />
              <div>
                <h4 className="font-bold text-lg">John Doe</h4>
                <p className="text-gray-600">Tech Journalist & Futurist</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              John Doe is a renowned tech journalist with over a decade of experience covering emerging technologies and their impact on society. He's a regular contributor to leading tech publications and a frequent speaker at industry conferences.
            </p>
            <div className="flex space-x-2">
              <a href="#" className="text-red-600 hover:underline">Twitter</a>
              <a href="#" className="text-red-600 hover:underline">LinkedIn</a>
              <a href="#" className="text-red-600 hover:underline">Website</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;