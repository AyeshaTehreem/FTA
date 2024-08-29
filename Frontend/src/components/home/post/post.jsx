import React from 'react';

const NewsItem = ({ image, author, date, title }) => (
  <div className="flex flex-col">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="mt-2">
      <p className="text-xs text-gray-500">By {author} • {date}</p>
      <h3 className="text-sm font-semibold mt-1">{title}</h3>
    </div>
  </div>
);

const NewsGrid = () => (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <NewsItem 
        image="/path/to/error155-image.jpg"
        author="David Hall"
        date="December 09, 2020"
        title="Proin eu nisl et arcu iaculis placerat sollicitudin ut est."
      />
      <NewsItem 
        image="/path/to/best-deal-image.jpg"
        author="David Hall"
        date="December 09, 2020"
        title="Demonstration we already have the best deal"
      />
      <NewsItem 
        image="/path/to/formula-one-image.jpg"
        author="David Hall"
        date="December 09, 2020"
        title="formula one have best deal winner sponsor power drink"
      />
      <NewsItem 
        image="/path/to/flags-image.jpg"
        author="David Hall"
        date="December 09, 2020"
        title="many flag have a spirit freedom placerat sollicitudin ut est."
      />
    </div>
  </div>
);

export default NewsGrid;