import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart, Share2, MessageSquare, Bookmark, Eye, Calendar, Tag, User, ChevronLeft, ChevronRight } from 'lucide-react';

const SingleBlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mostReadArticles, setMostReadArticles] = useState([]);
  const [mostReadBlogs, setMostReadBlogs] = useState([]);
  const [email, setEmail] = useState('');
  const [trendingTopics, setTrendingTopics] = useState(['AI Ethics', 'Cybersecurity', 'Renewable Tech', 'Space Exploration', 'Biotechnology']);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [newComment, setNewComment] = useState('');

  const API_BASE_URL = 'http://localhost:5000/blogs';

  // Fetch blogs from backend
  const fetchMostReadBlogs = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setMostReadBlogs(response.data);
    } catch (error) {
      console.error('Error fetching most read blogs:', error);
    }
  };

  useEffect(() => {
    fetchMostReadBlogs();
  }, []);

  useEffect(() => {
    const fetchBlogPost = async () => {
      console.log("Blog ID from params:", id);

      if (!id) {
        setError('Blog ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, { withCredentials: true });
        setPost(response.data);

        // Simulated data for related articles and most read
        // In a real application, these would be separate API calls
        setRelatedArticles([
          { title: 'The Future of AI in 2024', author: 'Sarah Connor', date: '2024-01-15', image: "/images/life/life1.jpg" },
          { title: 'Blockchain Revolution in Finance', author: 'Mark Zuckerberg', date: '2024-01-18', image: "/images/life/life3.jpg" },
        ]);
        setMostReadArticles([
          { title: 'The Rise of Quantum Computing in Business', author: 'David Hall', date: '2024-01-20', image: "/images/popular/pop2.jpg" },
          { title: 'AI Ethics: Navigating the Gray Areas', author: 'Emma Watson', date: '2024-01-22', image: "/images/popular/pop1.jpg" },
          { title: 'Cybersecurity in the Age of IoT', author: 'Michael Chen', date: '2024-01-25', image: "/images/popular/pop3.jpg" },
        ]);

        // Simulated author info
        setAuthorInfo({
          name: response.data.authorName,
          bio: "Experienced tech journalist and futurist with over a decade of experience covering emerging technologies.",
          image: "/images/authors/author1.jpg"
        });
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('Failed to fetch the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`${API_BASE_URL}/${id}/like`, {}, { withCredentials: true });
      setPost(prevPost => ({
        ...prevPost,
        likes: prevPost.likes + 1
      }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement bookmark logic here (you might want to add a new API endpoint for this)
  };

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % relatedArticles.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + relatedArticles.length) % relatedArticles.length);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Implement newsletter subscription logic here (you might want to add a new API endpoint for this)
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/${id}/comment`, { text: newComment }, { withCredentials: true });
      // Refresh the post data to include the new comment
      const response = await axios.get(`${API_BASE_URL}/${id}`, { withCredentials: true });
      setPost(response.data);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Blog not found.</p>;

  return (
    <div className="container mx-auto px-4 lg:px-0 font-sans bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <main className="lg:w-2/3 lg:pr-8 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <img src={"/images/popular/pop1.jpg"} alt={post.authorName} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <span className="text-gray-800 font-semibold">By {post.authorName}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <Tag size={16} className="ml-4 mr-1" />
                  <span>{post.categories.join(', ')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleLike} className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                <Heart size={20} className={post.likes > 0 ? 'fill-current text-red-600' : ''} />
                <span>{post.likes}</span>
              </button>
              <button onClick={handleBookmark} className={`text-gray-600 hover:text-yellow-500 ${isBookmarked ? 'text-yellow-500' : ''}`}>
                <Bookmark size={20} className={`${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="text-gray-600 hover:text-blue-600">
                <Share2 size={20} />
              </button>
              <div className="flex items-center text-gray-600">
                <Eye size={20} className="mr-1" />
                <span>{post.views || 0}</span>
              </div>
            </div>
          </div>
          {post.imageUrl && (
            <img
              src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${post.imageUrl}`}
              alt={post.title}
              className="mb-4 w-full rounded-lg shadow-md transition-all duration-300 transform hover:scale-101 hover:brightness-105 hover:shadow-xl hover:rounded-2xl"
            />
          )}
          <article className="prose lg:prose-xl text-2xl">
            <p>{post.content}</p>
          </article>

          {/* Comments section */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-red-600">Comments ({post.comments})</h2>
            {/* Implement comment rendering here */}
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Write a comment..."
              />
              <button type="submit" className="mt-2 bg-red-600 text-white px-4 py-2 rounded">
                Submit Comment
              </button>
            </form>
          </div>

          {/* Related Articles */}
          <div className="mt-8">
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

        {/* Sidebar */}
        <aside className="lg:w-1/3 mt-8 lg:mt-0">
          {/* About the Author */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">About the Author</h3>
            <div className="flex items-center mb-4">
              <img src={"/images/popular/pop1.jpg"} alt={authorInfo?.name} className="w-20 h-20 rounded-full mr-4" />
              <div>
                <h4 className="font-bold text-lg">{authorInfo?.name}</h4>
                <p className="text-gray-600">Tech Journalist & Futurist</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{authorInfo?.bio}</p>
          </div>

          {/* Most Read Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Most Read Articles</h3>
            {mostReadBlogs.map((blog, index) => (
              <div key={index} className="mb-4 flex items-center">
                {blog.imageUrl && (
                  <img
                    src={`https://ftatimesfyp.s3.eu-north-1.amazonaws.com/${blog.imageUrl}`}
                    alt={blog.title}
                    className="w-28 h-20 object-cover mr-4 rounded-lg"
                  />
                )}
                <div>
                  <span className="text-red-600 text-sm">
                    By {blog.authorName}, {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <h4 className="font-bold">{blog.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Trending Topics */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Trending Topics</h3>
            <ul className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <span className="text-lg">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-red-600 to-black p-6 rounded-lg shadow-lg mb-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest tech insights. Subscribe to our newsletter!</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg mb-2 text-gray-800"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SingleBlogPost;