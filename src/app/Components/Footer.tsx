import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { michroma } from '../layout';

const Footer = () => {
  return (
    <footer className=" text-white px-6 md:px-20 shadow-md shadow-black/30 py-14">
      <div className="grid md:grid-cols-5 gap-10 mb-10">

        {/* Logo & Description */}
        <div className="md:col-span-2">
          <h2 className={`${michroma.className} text-3xl mb-4 text-gradient font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text`}>
            PinDrop
          </h2>
          <p className="text-gray-400 text-sm font-semibold leading-relaxed">
            PinDrop is a next-gen platform helping users mark, track, and manage virtual pins and geolocation content with ease. Elevate your mapping game today!
          </p>

          <div className="flex gap-5 mt-6">
            <a href="#"><FaFacebook size={30} className="hover:text-blue-500 text-xl" /></a>
            <a href="#"><FaTwitter size={30}  className="hover:text-sky-400 text-xl" /></a>
            <a href="#"><FaInstagram size={30}  className="hover:text-pink-500 text-xl" /></a>
            <a href="#"><FaLinkedin  size={30} className="hover:text-blue-600 text-xl" /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div>
          <h3 className="font-bold text-2xl mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400 font-semibold text-md">
            <li><a href="#">Features</a></li>
            <li><a href="#">Use Cases</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-2xl mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 font-semibold text-md">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-2xl mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400 font-semibold text-md">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">API Reference</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter + Bottom */}
      <div className="border-t border-gray-700 pt-8 md:flex items-center justify-between">
        <p className="text-gray-500 text-md font-semibold mb-4 md:mb-0">© {new Date().getFullYear()} PinDrop. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 placeholder:font-semibold rounded-md bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-600 hover:bg-purple-700 animate-pulse text-2xl cursor-pointer font-semibold px-4 py-2 rounded-md text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text transition duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
