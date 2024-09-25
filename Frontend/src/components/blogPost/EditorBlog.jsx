import React, { useState } from 'react';
import axios from 'axios';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false); // State to track uploading status
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');

  const categories = [
    'Property', 'Sea', 'Programming', 'Life Style', 'Technology',
    'Framework', 'Sport', 'Game', 'WFH'
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('');
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('categories', JSON.stringify([category])); // Convert category to JSON string
    if (image) {
      formData.append('image', image); // Append image if selected
    } else {
      setError('Please select an image to upload.');
      return;
    }

    try {
      setUploading(true); // Set uploading state to true
      const response = await axios.post('http://localhost:5000/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure multipart/form-data is set
        },
        withCredentials: true, // Include cookies for session authentication
      });

      console.log('Blog post created:', response.data);
      setUploadStatus('Blog post uploaded successfully!');
      // Reset the form after successful submission
      setTitle('');
      setDescription('');
      setCategory('');
      setImage(null);
    } catch (error) {
      console.error('Error creating blog post:', error.response?.data || error.message);
      setError('Failed to upload blog post. Please try again.');
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 font-sans py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight border-b-4 border-red-600 inline-block pb-2">
        Create a New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto">

        {/* Title Field */}
        <div className="mb-8">
          <label className="block text-lg text-gray-900 font-semibold mb-2">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 shadow-sm"
            placeholder="Enter the post title"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <label className="block text-lg text-gray-900 font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-red-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300"
          />
          {image && (
            <div className="mt-4">
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" />
            </div>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-8">
          <label className="block text-lg text-gray-900 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 shadow-sm"
            rows="8"
            placeholder="Write the blog post content"
            required
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="mb-8">
          <label className="block text-lg text-gray-900 font-semibold mb-4">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-red-400 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 shadow-sm"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-2xl hover:bg-red-500 transition-all duration-300 transform hover:scale-105 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'POST ARTICLE'}
          </button>
        </div>

        {/* Upload Status and Error Messages */}
        {uploadStatus && <p className="text-green-600 text-center mt-4">{uploadStatus}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default BlogPostForm;
