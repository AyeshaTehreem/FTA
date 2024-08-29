import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Get My App</h3>
            <div className="w-32 h-32 bg-white mb-4"></div>
            <p className="text-sm">Scan qr code and download the app for your mobile.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Twitter feeds</h3>
            <div className="mb-4">
              <p className="text-sm mb-1">Typi non habent claritatem insitam est usus legent is iis qui facit claritatem.</p>
              <p className="text-sm text-red-500">Investigatione https://t.co/erenthemeGHTQ</p>
              <p className="text-xs text-red-500 mt-1">12 days ago</p>
            </div>
            <div>
              <p className="text-sm mb-1">Typi non habent claritatem insitam est usus legent is</p>
              <p className="text-sm text-red-500">https://t.co/erenthemeGHTQ</p>
              <p className="text-xs text-red-500 mt-1">10 days ago</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Category</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>Business</li>
              <li>News</li>
              <li>LifeStyle</li>
              <li>Career</li>
              <li>Technology</li>
              <li>Technology</li>
              <li>Culture</li>
              <li>Startups</li>
              <li>Entertainment</li>
              <li>Gadgets</li>
              <li>Support</li>
              <li>Inspiration</li>
              <li>Privacy Policy</li>
              <li>Newsletter</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Recent Post</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <p className="text-sm">Cooking Recipes Anytime And Anywhere</p>
              </div>
              <p className="text-xs text-gray-400">Jan 4, 2021</p>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <p className="text-sm">Duis ac arcu porttitor, varius tortor vel, cursus ipsum.</p>
              </div>
              <p className="text-xs text-gray-400">Jan 4, 2021</p>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <p className="text-sm">Quisque nec orci eget libero semper dignissim.</p>
              </div>
              <p className="text-xs text-gray-400">Jan 4, 2021</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Hot topics</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <span>Media</span>
            <span>NewsCyber</span>
            <span>Half Full</span>
            <span>Covid-19</span>
            <span>Politics</span>
            <span>Opinion</span>
            <span>Entertainment</span>
            <span>Share Market</span>
            <span>Royalist</span>
            <span>Beast Inside</span>
            <span>World</span>
            <span>Newsletters</span>
            <span>Scouted</span>
            <span>Travel</span>
            <span>Auction 2022</span>
            <span>Crossword</span>
            <span>Tech And Auto</span>
            <span>Podcasts</span>
            <span>Protests</span>
            <span>Education</span>
            <span>Sports</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-800 pt-4">
        <div className="container mx-auto px-4 flex justify-between text-sm">
          <p>Copyright©2023 I-News Inc.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-red-500">Privacy</a>
            <a href="#" className="hover:text-red-500">Contact</a>
            <a href="#" className="hover:text-red-500">About</a>
            <a href="#" className="hover:text-red-500">Donation</a>
            <a href="#" className="hover:text-red-500">F.A.Q</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;