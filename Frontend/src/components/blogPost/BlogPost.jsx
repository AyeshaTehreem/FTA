import React, { useState } from 'react';

const BlogPost = () => {
  // Initialize state to keep track of active tags
  const [activeTag, setActiveTag] = useState(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

  // Array of tags
  const tags = [
    '#PROPERTY', '#SEA', '#PROGRAMMING', '#LIFE STYLE', '#TECHNOLOGY', 
    '#FRAMEWORK', '#SPORT', '#GAME', '#WFH'
  ];

  // Handle tag click
  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  // Handle search button click
  const handleSearch = () => {
    console.log(`Searching for: Year ${year}, Month ${month}, Date ${date}`);
    // Add your search functionality here
  };

  return (
    <div className="container mx-auto px-4 lg:px-0 font-sans">
      <div className="flex flex-col lg:flex-row">
        {/* Main content */}
        <main className="lg:w-2/3 lg:pr-8">
          <h1 className="text-3xl font-bold mb-2">These Are the 5 Big Tech Stories to Watch in 2017</h1>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, hic.</p>
          <div className="mb-4 flex items-center">
            <img 
              src="/images/gallery/g1.jpg" 
              alt="John Doe" 
              className="w-10 h-10 rounded-full mr-2" 
            />
            <span className="text-gray-600">By John Doe, December 09, 2016 in Business</span>
          </div>
          {/* Image with hover effect */}
          <img 
            src="/images/gallery/g1.jpg" 
            alt="White House Press Conference" 
            className="mb-4 w-full rounded-lg shadow-md transition-all duration-300 transform hover:scale-101 hover:brightness-105 hover:shadow-xl hover:rounded-2xl" 
          />

          <div className="mb-4 flex items-center">
            <span className="text-gray-600 mr-4">15.k views</span>
            <button className="bg-red-600 text-white px-3 py-1 rounded mr-2 hover:bg-red-700">Facebook</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600">Twitter</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Whatsapp</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Telegram</button>
            <button className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">LinkedIn</button>
          </div>
          <article className="prose lg:prose-xl">
           
<p>Even the all-powerful Pointing has no control over the blind texts; it is an almost unorthographic life, full of the unknown and the unpredictable. In the realm of text and typography, 'blind texts' often refer to placeholder content used to fill space and demonstrate the visual form of a document or a typeface without relying on meaningful content. This concept highlights the tension between form and function, showing how design elements can sometimes overpower the content they are meant to support. Our blog delves into this fascinating interplay, exploring how design choices can influence our perception and understanding of text, and how the invisible forces of design shape our interactions with the written word.</p>{/* Rest of the article content */}
          </article>

          {/* Comments section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments:</h2>
            {/* Comment components */}
          </div>

          {/* Leave a reply form */}
          <form className="mt-8 p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave a Reply</h2>
            <p className="text-gray-700 mb-6 text-sm">Your email address will not be published. Required fields are marked *</p>
            <div className="mb-6">
              <label className="block mb-2 text-gray-800 text-sm font-medium">Comment</label>
              <textarea 
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none" 
                rows="5"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-gray-800 text-sm font-medium">Name *</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-800 text-sm font-medium">Email *</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-800 text-sm font-medium">Website</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" 
              />
            </div>
            <div className="mb-6 flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 border-gray-300 rounded" 
              />
              <label className="text-gray-700 text-sm">Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <button 
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              POST COMMENT
            </button>
          </form>

          {/* You May Also Like section */}
          <div className="mt-8">
            
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:w-1/3 mt-8 lg:mt-0">
          {/* Date Filter */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Filter By Date</h3>
            <div className="flex items-center gap-4">
            <select 
  value={year} 
  onChange={(e) => setYear(e.target.value)} 
  className="border border-gray-300 p-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
>
  <option value="">Year</option>
  {[2023, 2022, 2021, 2020].map(y => (
    <option key={y} value={y}>{y}</option>
  ))}
</select>

<select 
  value={month} 
  onChange={(e) => setMonth(e.target.value)} 
  className="border border-gray-300 p-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
>
  <option value="">Month</option>
  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>
</select>

<select 
  value={date} 
  onChange={(e) => setDate(e.target.value)} 
  className="border border-gray-300 p-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
>
  <option value="">Date</option>
  {[...Array(31).keys()].map(d => (
    <option key={d} value={d+1}>{d+1}</option>
  ))}
</select>

              <button 
                onClick={handleSearch} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg ml-4 shadow-md hover:bg-red-700 transition-colors duration-300"
              >
                Search
              </button>
            </div>
          </div>

          {/* Most Read */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-8">Most Read</h3>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">6 Best Tips For Building A Good Shipping Boat</h4>
              </div>
            </div>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">Pembalap Mulai Melaju Kencang</h4>
              </div>
            </div>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">Cristian Ronaldo Mulai Mengocek Lawannya</h4>
              </div>
            </div>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">Pembalap Mulai Melaju Kencang</h4>
              </div>
            </div>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">Pembalap Mulai Melaju Kencang</h4>
              </div>
            </div>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">Pembalap Mulai Melaju Kencang</h4>
              </div>
            </div>
            <div className="mb-6 flex items-center hover:shadow-lg transition-shadow duration-200">
              <img 
                src="/images/gallery/g1.jpg" 
                alt="Thumbnail" 
                className="w-28 h-20 object-cover mr-6 rounded-lg shadow-sm transition-transform transform hover:scale-105" 
              />
              <div>
                <span className="text-red-600 text-base">By David Hall, December 09, 2016</span>
                <h4 className="font-bold text-lg">Pembalap Mulai Melaju Kencang</h4>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 m-1 text-sm cursor-pointer ${activeTag === tag ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="mb-8 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Newsletter</h3>
            <p className="text-gray-700 mb-4">Sign up for free and be the first to get notified about new posts.</p>
            <div className="flex flex-col md:flex-row items-center">
              <input
                type="email"
                className="border border-gray-300 p-3 rounded-lg flex-grow mb-4 md:mb-0 md:mr-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
              />
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300">
                SIGN UP
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;
