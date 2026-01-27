import React, { useState, useEffect } from "react";
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
  hours?: string;
}

const BusinessDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        let url = 'http://localhost:5000/api/vendors';
        const params = new URLSearchParams();
        
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory === 'food' ? 'Food & Dining' : 
                                  selectedCategory === 'fashion' ? 'Fashion & Beauty' :
                                  selectedCategory === 'home' ? 'Home & Garden' :
                                  selectedCategory === 'services' ? 'Services & Utilities' : 'Other');
        }
        
        if (searchTerm) {
          params.append('search', searchTerm);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        // Map backend data to frontend interface
        const mappedData = data.map((item: any) => ({
          id: item._id,
          name: item.name,
          category: item.category,
          description: item.description,
          address: item.location,
          rating: item.rating,
          reviews: 0, // Backend doesn't have reviews yet
          certifications: [], // Backend doesn't have certifications yet
          distance: "N/A", // Backend doesn't have geo-location yet
          image: item.image,
          phone: item.contact?.phone || "N/A",
          website: item.contact?.website || "N/A",
          hours: "9AM - 5PM" // Default
        }));
        
        setBusinesses(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchVendors();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory]);

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

  // Removed hardcoded businesses

  // Filtering is now done on backend, client-side sorting only
  const sortedBusinesses = [...businesses].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
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
    <div className="min-h-screen bg-nature-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-nature-heading mb-6 tracking-tight">
            Sustainable Directory
          </h1>
          <p className="text-xl text-nature-primary max-w-2xl mx-auto font-medium opacity-80">
            Discover verified eco-conscious businesses. All partners are certified 
            sustainable and support local regenerative growth.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card shadow-xl shadow-nature-sage/10 rounded-[2.5rem] p-8 mb-12 border-nature-sage/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-nature-sage h-5 w-5" />
              <input
                type="text"
                placeholder="Search local heroes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-nature-sage h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pl-12 uppercase text-xs font-black tracking-widest appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value} className="bg-white text-nature-heading">
                    {category.label}
                  </option>
                ))}
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-nature-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field uppercase text-xs font-black tracking-widest appearance-none"
              >
                <option value="rating" className="bg-white">Sort by Rating</option>
                <option value="reviews" className="bg-white">Sort by Reviews</option>
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-nature-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-nature-primary font-bold">
            Found <span className="text-nature-heading">{sortedBusinesses.length}</span> sustainable matches
          </p>
        </div>

        {/* Business Grid */}
        {loading ? (
           <div className="text-center py-24">
             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-nature-primary mx-auto"></div>
             <p className="mt-8 text-nature-primary font-bold">Growing your directory...</p>
           </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedBusinesses.map((business) => (
            <div
              key={business.id}
              className="group bg-white rounded-[2.5rem] border border-nature-sage/10 overflow-hidden hover:shadow-2xl hover:shadow-nature-sage/20 transition-all duration-500"
            >
              {/* Business Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-nature-heading/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={business.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=60"}
                  alt={business.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-nature-sage/10">
                  {business.distance}
                </div>
                <div className="absolute bottom-6 left-6 z-20">
                   <span className="bg-nature-accent text-nature-heading px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                     {business.category}
                   </span>
                </div>
              </div>

              {/* Business Info */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-black text-nature-heading leading-tight group-hover:text-nature-primary transition-colors">
                    {business.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 bg-nature-accent/20 px-3 py-1.5 rounded-xl border border-nature-accent/30">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-black text-nature-heading">
                      {business.rating}
                    </span>
                  </div>
                </div>

                <p className="text-nature-primary font-medium opacity-70 text-sm line-clamp-2 leading-relaxed">{business.description}</p>

                <div className="flex items-center space-x-3 text-sm text-nature-primary font-semibold">
                  <MapPin className="h-5 w-5 text-nature-sage opacity-60" />
                  <span className="truncate">{business.address}</span>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {business.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="bg-[#F1F5EF] text-nature-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1.5"
                    >
                      <Leaf className="h-3 w-3" />
                      {cert}
                    </span>
                  ))}
                   {business.certifications.length === 0 && (
                      <span className="text-[10px] text-nature-sage font-bold italic opacity-60 uppercase">No certifications yet</span>
                   )}
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-nature-sage/10 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-xs text-nature-primary font-bold">
                      <Phone className="h-4 w-4 opacity-50" />
                      <span className="truncate">{business.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-nature-primary font-bold">
                      <Clock className="h-4 w-4 opacity-50" />
                      <span>{business.hours}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 btn-primary py-4 text-xs font-black uppercase tracking-widest shadow-none">
                    View
                  </button>
                  <button className="flex-1 btn-secondary py-4 text-xs font-black uppercase tracking-widest">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* No Results */}
        {sortedBusinesses.length === 0 && !loading && (
          <div className="text-center py-24 card rounded-[3.5rem] bg-white/50 border-nature-sage/10">
            <div className="bg-nature-accent/30 p-8 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center border-4 border-white shadow-xl shadow-nature-sage/10">
               <Leaf className="h-12 w-12 text-nature-primary" />
            </div>
            <h3 className="text-3xl font-black text-nature-heading mb-4 tracking-tight">
              Nothing to harvest
            </h3>
            <p className="text-xl text-nature-primary font-medium opacity-70">
              Try adjusting your filters to find the right eco-match.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;
