import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, Search, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Sustainability Quiz", href: "/quiz" },
    { name: "Business Directory", href: "/directory" },
    { name: "Carbon Calculator", href: "/calculator" },
    { name: "Community", href: "/dashboard" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-nature-sage/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1.5 bg-nature-accent rounded-lg group-hover:bg-nature-sage transition-colors duration-300">
                <Leaf className="h-6 w-6 text-nature-heading" />
              </div>
              <span className="text-xl font-bold text-nature-heading tracking-tight">EcoMatch</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-nature-primary hover:text-nature-heading hover:bg-nature-sage/10 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => navigate("/directory")}
              title="Search businesses"
              aria-label="Search businesses"
              className="p-2 text-nature-primary hover:text-nature-heading transition-colors duration-200"
            >
              <Search className="h-5 w-5" />
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-nature-heading">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-nature-primary hover:text-red-600 transition-colors duration-200"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary flex items-center ml-4">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-nature-heading hover:bg-nature-sage/10 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 border-t border-nature-sage/10 bg-white">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-nature-primary hover:text-nature-heading hover:bg-nature-sage/10 block px-3 py-3 rounded-xl text-base font-semibold transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-3 space-y-2">
                {user ? (
                  <>
                    <div className="py-2 text-base font-bold text-nature-heading">
                      Signed in as {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="w-full btn-primary flex justify-center items-center py-4">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
