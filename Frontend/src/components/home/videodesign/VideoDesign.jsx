import React from 'react';

const NewsSection = () => {
  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Top Slider */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto gap-4">
            {[1, 2].map((item) => (
              <div key={item} className="relative flex-shrink-0 w-full md:w-1/2">
                <img src={`/images/gallery/g${item}.jpg`} alt="News" className="w-full h-64 object-cover rounded-lg" />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
                  <span className="text-xs bg-red-600 px-2 py-1 rounded">TECHNOLOGY</span>
                  <h3 className="text-xl font-bold mt-2">Success is not a good food failure makes you humble</h3>
                  <p className="text-sm">March 26, 2020</p>
                </div>
                <button className="absolute top-4 right-4 bg-red-600 rounded-full p-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black p-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Video News */}
        <h2 className="text-2xl font-bold mb-4">Video News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 relative">
            <img src="/images/gallery/g3.jpg" alt="Video News" className="w-full h-96 object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">TECHNOLOGY</span>
              <h3 className="text-xl font-bold mt-2">Riots Report Shows London Needs To Maintain Police Numbers, Says Mayor</h3>
              <p className="text-sm">March 26, 2020</p>
            </div>
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full p-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Posts</h3>
            {[4, 5, 1, 3, 2].map((item) => (
              <div key={item} className="flex items-center mb-4">
                <img src={`/images/gallery/g${item}.jpg`} alt="Thumbnail" className="w-24 h-16 object-cover rounded mr-4" />
                <div>
                  <h4 className="font-semibold">Cheap smartphone sensor could help you old</h4>
                  <span className="text-xs text-gray-400">TECHNOLOGY</span>
                </div>
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-700 p-2 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="bg-gray-700 p-2 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
