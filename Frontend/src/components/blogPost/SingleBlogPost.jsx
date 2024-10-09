import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Heart, Share2, MessageSquare, Bookmark, Eye, Calendar, Tag, User, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { UserContext } from '../../UserContext'; // Adjust the path based on the relative location

const SingleBlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoggedIn } = useContext(UserContext); // Access the UserContext here
  const [mostReadArticles, setMostReadArticles] = useState([]);
  const [mostReadBlogs, setMostReadBlogs] = useState([]);
  const [email, setEmail] = useState('');
  const [trendingTopics, setTrendingTopics] = useState(['AI Ethics', 'Cybersecurity', 'Renewable Tech', 'Space Exploration', 'Biotechnology']);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const API_BASE_URL = 'http://localhost:5002/blogs';

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
      const response = await axios.post(`${API_BASE_URL}/${post._id}/like`, {}, { withCredentials: true });
      setPost(prevPost => ({
        ...prevPost,
        likes: response.data.likes,
        userLiked: response.data.userLiked
      }));
    } catch (error) {
      console.error('Error liking post:', error);
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
      }
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

      console.log(response.data); // Debugging - Check if the response contains comments

      setPost(response.data); // Ensure post is updated
      setNewComment(''); // Clear the input
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
            <button
        onClick={handleLike}
        className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
      >
        <Heart size={20} className={post.userLiked ? 'fill-current text-red-600' : ''} />
        <span>{post.likes.length}</span>
      </button>

              <button className="text-gray-600 hover:text-blue-600">
                <Share2 size={20} />
              </button>

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
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-6 text-red-600 border-b pb-2">
              Comments ({post.comments ? post.comments.length : 0})
            </h2>

            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Share your thoughts..."
                rows="4"
                required
              />
              <button type="submit" className="mt-3 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-center">
                <MessageSquare size={18} className="mr-2" />
                Post Comment
              </button>
            </form>

            {/* Display comments if they exist */}
            {Array.isArray(post.comments) && post.comments.length > 0 ? (
              <div className="space-y-6">
                {post.comments
                  .slice(0, showAllComments ? post.comments.length : 3)
                  .reverse() // Reverse the order of comments here
                  .map((comment, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-md border-l-4 border-red-500 transition duration-300 ease-in-out hover:shadow-lg">
                      <div className="flex items-center mb-2">
                        <User size={24} className="text-gray-500 mr-2" />
                        <span className="font-semibold text-gray-800">{comment.userName}</span>
                        <span className="ml-auto text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-gray-700 ml-8">{comment.text || comment.content}</p>
                    </div>
                  ))}

                {/* Toggle between showing all and fewer comments */}
                {post.comments.length > 3 && (
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="mt-6 text-red-600 font-semibold hover:text-red-800 transition-colors duration-200 flex items-center justify-center w-full"
                  >
                    {showAllComments ? (
                      <>
                        <ChevronUp size={20} className="mr-1" />
                        Show Fewer Comments
                      </>
                    ) : (
                      <>
                        <ChevronDown size={20} className="mr-1" />
                        Show All Comments
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
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