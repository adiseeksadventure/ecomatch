import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Leaf,
  Phone,
  Globe,
  Users,
  ShoppingBag,
  Home,
} from "lucide-react";
import { API_BASE_URL } from "../api/config";
import { sampleVendors, Vendor } from "../data/sampleVendors";

// UI filter value -> category label used by both the API and sample data.
const CATEGORY_LABELS: Record<string, string> = {
  food: "Food & Dining",
  fashion: "Fashion & Beauty",
  home: "Home & Garden",
  services: "Services & Utilities",
};

const BusinessDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [businesses, setBusinesses] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Filter the bundled sample data the same way the API would.
    const filterSample = (): Vendor[] => {
      const label = CATEGORY_LABELS[selectedCategory];
      const term = searchTerm.trim().toLowerCase();
      return sampleVendors.filter((v) => {
        const matchesCategory =
          selectedCategory === "all" || v.category === label;
        const matchesSearch = !term || v.name.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
      });
    };

    const fetchVendors = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "all") {
          params.append(
            "category",
            CATEGORY_LABELS[selectedCategory] ?? "Other"
          );
        }
        if (searchTerm) params.append("search", searchTerm);

        const query = params.toString();
        const url = `${API_BASE_URL}/api/vendors${query ? `?${query}` : ""}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();

        const mapped: Vendor[] = (data as any[]).map((item) => ({
          id: item._id ?? item.id,
          name: item.name,
          category: item.category,
          description: item.description,
          location: item.location,
          rating: item.rating ?? 0,
          certifications: item.certifications ?? [],
          image: item.image,
          phone: item.contact?.phone,
          website: item.contact?.website,
        }));

        // Backend reachable but empty (not seeded) -> use bundled samples.
        if (!cancelled) setBusinesses(mapped.length ? mapped : filterSample());
      } catch {
        // Backend unreachable -> the directory still works with bundled data.
        if (!cancelled) setBusinesses(filterSample());
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Debounce search/filter changes.
    const timeoutId = setTimeout(fetchVendors, 400);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
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

  // Filtering is handled at fetch time; sorting is client-side.
  const sortedBusinesses = [...businesses].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return b.rating - a.rating; // default: rating
  });

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
                className="input-field pl-12 uppercase text-xs font-black tracking-widest appearance-none bg-none"
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
                className="input-field uppercase text-xs font-black tracking-widest appearance-none bg-none"
              >
                <option value="rating" className="bg-white">Sort by Rating</option>
                <option value="name" className="bg-white">Sort by Name</option>
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
                  <span className="truncate">{business.location}</span>
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
                      <span className="text-[10px] text-nature-sage font-bold italic opacity-60 uppercase">No certifications listed</span>
                   )}
                </div>

                {/* Contact Info */}
                {(business.phone || business.website) && (
                  <div className="pt-6 border-t border-nature-sage/10 grid grid-cols-2 gap-4">
                    {business.phone && (
                      <div className="flex items-center space-x-2 text-xs text-nature-primary font-bold">
                        <Phone className="h-4 w-4 opacity-50" />
                        <span className="truncate">{business.phone}</span>
                      </div>
                    )}
                    {business.website && (
                      <div className="flex items-center space-x-2 text-xs text-nature-primary font-bold">
                        <Globe className="h-4 w-4 opacity-50" />
                        <span className="truncate">{business.website}</span>
                      </div>
                    )}
                  </div>
                )}

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
