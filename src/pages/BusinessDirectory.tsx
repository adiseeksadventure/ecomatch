import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Leaf,
  Phone,
  Globe,
  Clock,
  Award,
  Users,
  ShoppingBag,
  Home,
} from "lucide-react";

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  rating: number;
  reviews: number;
  certifications: string[];
  distance: string;
  image: string;
  phone: string;
  website: string;
  hours: string;
}

const BusinessDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const categories = [
    {
      value: "all",
      label: "All Categories",
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      value: "food",
      label: "Food & Dining",
      icon: <Leaf className="h-4 w-4" />,
    },
    {
      value: "fashion",
      label: "Fashion & Beauty",
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      value: "home",
      label: "Home & Garden",
      icon: <Home className="h-4 w-4" />,
    },
    {
      value: "services",
      label: "Services",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  const businesses: Business[] = [
    {
      id: 1,
      name: "Green Grocers Market",
      category: "food",
      description:
        "Organic and locally-sourced produce, dairy, and pantry items. Supporting local farmers and sustainable agriculture.",
      address: "123 Main St, Green City",
      rating: 4.8,
      reviews: 127,
      certifications: ["Organic Certified", "Local Sourcing"],
      distance: "0.5 miles",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
      phone: "(555) 123-4567",
      website: "www.greengrocers.com",
      hours: "Mon-Sat: 8AM-8PM, Sun: 9AM-6PM",
    },
    {
      id: 2,
      name: "Eco Fashion Collective",
      category: "fashion",
      description:
        "Sustainable clothing and accessories made from organic materials and recycled fabrics. Ethical fashion for conscious consumers.",
      address: "456 Oak Ave, Green City",
      rating: 4.6,
      reviews: 89,
      certifications: ["Fair Trade", "Organic Materials"],
      distance: "1.2 miles",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      phone: "(555) 234-5678",
      website: "www.ecofashion.com",
      hours: "Mon-Fri: 10AM-7PM, Sat: 11AM-6PM",
    },
    {
      id: 3,
      name: "Sustainable Home Solutions",
      category: "home",
      description:
        "Eco-friendly home improvement products, energy-efficient appliances, and sustainable building materials.",
      address: "789 Pine St, Green City",
      rating: 4.7,
      reviews: 156,
      certifications: ["Energy Star", "Green Building"],
      distance: "2.1 miles",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      phone: "(555) 345-6789",
      website: "www.sustainablehome.com",
      hours: "Mon-Sat: 9AM-6PM",
    },
    {
      id: 4,
      name: "Community Solar Co-op",
      category: "services",
      description:
        "Community-owned solar energy solutions. Join our cooperative to access clean, affordable renewable energy.",
      address: "321 Elm St, Green City",
      rating: 4.9,
      reviews: 203,
      certifications: ["Solar Certified", "Community Owned"],
      distance: "3.5 miles",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      phone: "(555) 456-7890",
      website: "www.communitysolar.com",
      hours: "Mon-Fri: 8AM-5PM",
    },
    {
      id: 5,
      name: "Local Artisan Bakery",
      category: "food",
      description:
        "Handcrafted breads and pastries using organic ingredients and traditional baking methods. Zero waste packaging.",
      address: "654 Maple Dr, Green City",
      rating: 4.5,
      reviews: 94,
      certifications: ["Organic Certified", "Zero Waste"],
      distance: "0.8 miles",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      phone: "(555) 567-8901",
      website: "www.localartisanbakery.com",
      hours: "Tue-Sun: 7AM-3PM",
    },
    {
      id: 6,
      name: "Natural Wellness Center",
      category: "services",
      description:
        "Holistic health services, organic supplements, and wellness consultations. Supporting mind-body wellness.",
      address: "987 Cedar Ln, Green City",
      rating: 4.8,
      reviews: 178,
      certifications: ["Natural Products", "Wellness Certified"],
      distance: "1.8 miles",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      phone: "(555) 678-9012",
      website: "www.naturalwellness.com",
      hours: "Mon-Sat: 9AM-7PM",
    },
  ];

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sustainable Business Directory
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover verified eco-friendly businesses in your area. All
            businesses are certified sustainable and support local communities.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pl-10"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="rating">Sort by Rating</option>
                <option value="distance">Sort by Distance</option>
                <option value="reviews">Sort by Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {sortedBusinesses.length} sustainable business
            {sortedBusinesses.length !== 1 ? "es" : ""}
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBusinesses.map((business) => (
            <div
              key={business.id}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              {/* Business Image */}
              <div className="relative mb-4">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {business.distance}
                </div>
              </div>

              {/* Business Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {business.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(business.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      ({business.reviews})
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm">{business.description}</p>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{business.address}</span>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2">
                  {business.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{business.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{business.website}</span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{business.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-3">
                  <button className="btn-primary flex-1 text-sm">
                    View Details
                  </button>
                  <button className="btn-secondary text-sm px-4">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedBusinesses.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No businesses found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;
