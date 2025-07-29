import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">EcoMatch</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting eco-conscious consumers with sustainable local
              businesses and artisans. Together, we're building a greener
              future, one sustainable choice at a time.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-primary-400 transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/quiz"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Sustainability Quiz
                </Link>
              </li>
              <li>
                <Link
                  to="/directory"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Business Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/calculator"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Community Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">hello@ecomatch.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">Green City, EC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 EcoMatch. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
