import React from 'react';

const BlogPost = () => {
  return (
    <div className="container mx-auto px-4 lg:px-0 font-sans">
      <div className="flex flex-col lg:flex-row">
        {/* Main content */}
        <main className="lg:w-2/3 lg:pr-8">
          <h1 className="text-3xl font-bold mb-2">These Are the 5 Big Tech Stories to Watch in 2017</h1>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, hic.</p>
          <div className="mb-4 flex items-center">
            <img src="/images/gallery/g1.jpg" alt="John Doe" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-gray-600">By John Doe, December 09, 2016 in Business</span>
          </div>
          <img src="/images/gallery/g1.jpg" alt="White House Press Conference" className="mb-4 w-full" />
          <div className="mb-4 flex items-center">
            <span className="text-gray-600 mr-4">15.k views</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2">f Facebook</button>
            <button className="bg-blue-400 text-white px-3 py-1 rounded mr-2">Twitter</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Whatsapp</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Telegram</button>
            <button className="bg-blue-700 text-white px-3 py-1 rounded">in LinkedIn</button>
          </div>
          <article className="prose lg:prose-xl">
            <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life...</p>
            {/* Rest of the article content */}
          </article>
          
          {/* Comments section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">2 Comments:</h2>
            {/* Comment components */}
          </div>
          
          {/* Leave a reply form */}
          <form className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Leave a Reply</h2>
            <p className="mb-4">Your email address will not be published. Required fields are marked *</p>
            <div className="mb-4">
              <label className="block mb-2">Comment</label>
              <textarea className="w-full border p-2" rows="5"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">Name *</label>
                <input type="text" className="w-full border p-2" />
              </div>
              <div>
                <label className="block mb-2">Email *</label>
                <input type="email" className="w-full border p-2" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Website</label>
              <input type="text" className="w-full border p-2" />
            </div>
            <div className="mb-4">
              <input type="checkbox" className="mr-2" />
              <label>Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded">POST COMMENT</button>
          </form>
          
          {/* Previous/Next Post */}
          <div className="flex justify-between mt-8">
            <div>
              <span className="text-gray-600 block">PREVIOUS POST</span>
              <a href="#" className="font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, similique.</a>
            </div>
            <div className="text-right">
              <span className="text-gray-600 block">NEXT POST</span>
              <a href="#" className="font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, nesciunt.</a>
            </div>
          </div>
          
          {/* You May Also Like section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Related post cards */}
            </div>
          </div>
        </main>
        
       {/* Sidebar */}
<aside className="lg:w-1/3 mt-8 lg:mt-0">
  <div className="mb-8">
    <input type="text" placeholder="Search" className="w-full p-2 border rounded" />
  </div>
  
  <div className="mb-8">
    <div className="mb-4 flex items-center">
      <img src="/images/gallery/g1.jpg" alt="Thumbnail" className="w-20 h-14 object-cover mr-4" />
      <div>
        <span className="text-red-600 text-sm">By David Hall  December 09, 2016</span>
        <h4 className="font-bold">6 Best Tips For Building A Good Shipping Boat</h4>
      </div>
    </div>
    <div className="mb-4 flex items-center">
      <img src="/images/gallery/g1.jpg" alt="Thumbnail" className="w-20 h-14 object-cover mr-4" />
      <div>
        <span className="text-red-600 text-sm">By David Hall  December 09, 2016</span>
        <h4 className="font-bold">Pembalap Mulai Melaju Kencang</h4>
      </div>
    </div>
    <div className="mb-4 flex items-center">
      <img src="/images/gallery/g1.jpg" alt="Thumbnail" className="w-20 h-14 object-cover mr-4" />
      <div>
        <span className="text-red-600 text-sm">By David Hall  December 09, 2016</span>
        <h4 className="font-bold">Cristian Ronaldo Mulai Mengocek Lawannya,</h4>
      </div>
    </div>
  </div>
  
  <div className="mb-8">
    <img src="/images/gallery/g1.jpg" alt="Featured Image" className="w-full h-48 object-cover mb-2" />
    <span className="bg-red-600 text-white px-2 py-1 text-sm">TRAVEL</span>
    <span className="text-red-600 text-sm ml-2">By David Hall  December 09, 2016</span>
    <h3 className="text-xl font-bold my-2">Proin eu nisl et arcu iaculis placerat sollicitudin ut est</h3>
    <p className="text-gray-600 mb-4">Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.</p>
    <button className="bg-red-600 text-white px-4 py-2 rounded">Read More</button>
  </div>

  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
    <button className="w-full bg-blue-600 text-white py-2 mb-2 flex justify-between items-center px-4">
      <span>f</span>
      <span>19,243 Fans</span>
      <span>Like</span>
    </button>
    <button className="w-full bg-blue-400 text-white py-2 mb-2 flex justify-between items-center px-4">
      <span>t</span>
      <span>2,076 Followers</span>
      <span>Follow</span>
    </button>
    <button className="w-full bg-red-600 text-white py-2 flex justify-between items-center px-4">
      <span>y</span>
      <span>15,200 Followers</span>
      <span>Subscribe</span>
    </button>
  </div>
  
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Tags</h3>
    <div className="flex flex-wrap">
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#PROPERTY</span>
      <span className="bg-red-600 text-white px-2 py-1 m-1 text-sm">#SEA</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#PROGRAMMING</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#LIFE STYLE</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#TECHNOLOGY</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#FRAMEWORK</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#SPORT</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#GAME</span>
      <span className="bg-gray-200 px-2 py-1 m-1 text-sm">#WFH</span>
    </div>
  </div>

  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Newsletter</h3>
    <p className="mb-4">The most important world news and events of the day.</p>
    <p className="mb-4">Get magzrenvi daily newsletter on your inbox.</p>
    <form className="flex">
      <input type="email" placeholder="Your email address" className="flex-grow p-2 border rounded-l" />
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-r">SIGN UP</button>
    </form>
  </div>

  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">Advertise</h3>
    <img src="/path-to-cyber-monday-image.jpg" alt="Cyber Monday Sale" className="w-full" />
  </div>
</aside>
      </div>
    </div>
  );
};

export default BlogPost;