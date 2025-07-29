import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Users,
  Calculator,
  MapPin,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Sustainability Quiz",
      description:
        "Take our interactive quiz to discover products and services that match your environmental values.",
      href: "/quiz",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Local Business Directory",
      description:
        "Find verified eco-friendly businesses and artisans in your area with detailed sustainability ratings.",
      href: "/directory",
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Carbon Calculator",
      description:
        "Calculate the environmental impact of your purchases and track your carbon footprint.",
      href: "/calculator",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Dashboard",
      description:
        "Join challenges, track your impact, and connect with like-minded eco-conscious individuals.",
      href: "/dashboard",
    },
  ];

  const stats = [
    { number: "500+", label: "Sustainable Businesses" },
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "CO2 Saved (kg)" },
    { number: "95%", label: "User Satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-3 rounded-full">
                <Leaf className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect with
              <span className="text-primary-600"> Sustainable</span>
              <br />
              Local Businesses
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover eco-friendly products and services from verified
              sustainable businesses in your area. Make informed choices that
              benefit both you and the planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz" className="btn-primary text-lg px-8 py-3">
                Take Sustainability Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/directory" className="btn-secondary text-lg px-8 py-3">
                Browse Businesses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Sustainable Living
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to make eco-conscious
              decisions and support local sustainable businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="card hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How EcoMatch Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start your sustainable journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Take the Quiz
              </h3>
              <p className="text-gray-600">
                Answer a few questions about your lifestyle and environmental
                values
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Get Matched
              </h3>
              <p className="text-gray-600">
                Discover businesses and products that align with your
                sustainability goals
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Make Impact
              </h3>
              <p className="text-gray-600">
                Support local sustainable businesses and track your
                environmental impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious consumers making a difference in
            their communities.
          </p>
          <Link
            to="/quiz"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 inline" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
