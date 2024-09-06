import React, { useState } from 'react';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    '#PROPERTY', '#SEA', '#PROGRAMMING', '#LIFE STYLE', '#TECHNOLOGY',
    '#FRAMEWORK', '#SPORT', '#GAME', '#WFH'
  ];

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogPostData = {
      title,
      image,
      description,
      tags: selectedTags
    };
    console.log('Submitting blog post:', blogPostData);
    // Submit to backend or API here
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
              <img src={image} alt="Preview" className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300" />
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
          ></textarea>
        </div>

        {/* Tags Field */}
        <div className="mb-8">
          <label className="block text-lg text-gray-900 font-semibold mb-4">Select Tags (Categories)</label>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-full border ${
                  selectedTags.includes(tag)
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-gray-200 text-gray-800 border-gray-300'
                } hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out shadow-md`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-2xl hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
          >
            POST ARTICLE
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogPostForm;
