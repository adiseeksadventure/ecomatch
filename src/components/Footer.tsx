import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F1F5EF] text-nature-heading border-t border-nature-sage/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-1.5 bg-nature-accent rounded-lg">
                <Leaf className="h-6 w-6 text-nature-heading" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-nature-heading">EcoMatch</span>
            </div>
            <p className="text-nature-primary mb-6 max-w-md leading-relaxed">
              Connecting eco-conscious consumers with sustainable local
              businesses and artisans. Together, we're building a greener
              future, one sustainable choice at a time.
            </p>
            <div className="flex space-x-4">
              <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm text-nature-primary hover:text-nature-heading hover:shadow-md transition-all duration-300">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-nature-heading mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/quiz"
                  className="text-nature-primary hover:text-nature-heading text-sm font-semibold transition-all duration-200"
                >
                  Sustainability Quiz
                </Link>
              </li>
              <li>
                <Link
                  to="/directory"
                  className="text-nature-primary hover:text-nature-heading text-sm font-semibold transition-all duration-200"
                >
                  Business Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/calculator"
                  className="text-nature-primary hover:text-nature-heading text-sm font-semibold transition-all duration-200"
                >
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-nature-primary hover:text-nature-heading text-sm font-semibold transition-all duration-200"
                >
                  Community Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-nature-heading mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-nature-sage" />
                <span className="text-nature-primary text-sm font-medium">hello@ecomatch.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-nature-sage" />
                <span className="text-nature-primary text-sm font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-nature-sage" />
                <span className="text-nature-primary text-sm font-medium">Green City, EC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nature-sage/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-medium">
            <p className="text-nature-sage">
              © {new Date().getFullYear()} EcoMatch. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link
                to="/privacy"
                className="text-nature-sage hover:text-nature-heading transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-nature-sage hover:text-nature-heading transition-colors duration-200"
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
