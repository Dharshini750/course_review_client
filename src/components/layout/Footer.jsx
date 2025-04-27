import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold text-yellow-400">About Prof Finder</h2>
            <p className="text-gray-400 text-sm mt-4">
              Prof Finder is your trusted platform for course reviews, personalized recommendations, and academic analytics. We aim to empower students with the tools they need to make informed decisions about their education.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-yellow-400">Our Products</h2>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-400 text-sm">Course Reviews</li>
              <li className="text-gray-400 text-sm">Personalized Recommendations</li>
              <li className="text-gray-400 text-sm">Sentiment Analysis</li>
              <li className="text-gray-400 text-sm">Visual Analytics Dashboard</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-yellow-400">Analytics</h2>
            <div className="mt-4">
              <p className="text-gray-400 text-sm mt-2">
                Gain insights into course trends, student preferences, and review patterns.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-yellow-400">Connect with Us</h2>
            <p className="text-gray-400 text-sm mt-2">
              Follow us on social media for updates and news.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Prof Finder. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Built with ❤️ by [Your Team/Name].
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;