// Bundled sample vendor data so the Business Directory works with zero
// backend. The live API (when reachable and seeded) takes precedence; this
// is the offline / first-run fallback.
//
// Category values match the backend's labels so the same filtering logic
// works against either source.

export interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  rating: number;
  certifications: string[];
  image: string;
  phone?: string;
  website?: string;
}

export const VENDOR_CATEGORIES = [
  "Food & Dining",
  "Fashion & Beauty",
  "Home & Garden",
  "Services & Utilities",
] as const;

export const sampleVendors: Vendor[] = [
  // Food & Dining
  {
    id: "v1",
    name: "Green Earth Grocers",
    category: "Food & Dining",
    description:
      "Organic, locally sourced produce and bulk foods with zero-waste packaging options.",
    location: "123 Eco Lane, Portland, OR",
    rating: 4.8,
    certifications: ["Organic", "Zero Waste"],
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60",
    phone: "(503) 555-0142",
    website: "greenearthgrocers.com",
  },
  {
    id: "v2",
    name: "Harvest Table Cafe",
    category: "Food & Dining",
    description:
      "Farm-to-table cafe serving seasonal plant-forward dishes and compostable takeaway.",
    location: "88 Market St, Austin, TX",
    rating: 4.6,
    certifications: ["Local Sourcing", "Composts"],
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=500&q=60",
    phone: "(512) 555-0188",
    website: "harvesttable.cafe",
  },
  {
    id: "v3",
    name: "Bulk & Bare Co-op",
    category: "Food & Dining",
    description:
      "Package-free pantry staples, refill stations, and fair-trade goods sold by weight.",
    location: "210 Pearl St, Denver, CO",
    rating: 4.7,
    certifications: ["Package-Free", "Fair Trade"],
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=500&q=60",
    website: "bulkandbare.coop",
  },

  // Fashion & Beauty
  {
    id: "v4",
    name: "Sustainable Style Co",
    category: "Fashion & Beauty",
    description:
      "Ethically made clothing using recycled materials and certified organic cotton.",
    location: "456 Fashion Ave, Seattle, WA",
    rating: 4.5,
    certifications: ["Recycled Materials", "Organic Cotton"],
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=60",
    phone: "(206) 555-0119",
    website: "sustainablestyle.co",
  },
  {
    id: "v5",
    name: "Renew Thrift Boutique",
    category: "Fashion & Beauty",
    description:
      "Curated secondhand and upcycled fashion that keeps textiles out of landfill.",
    location: "77 Bedford Ave, Brooklyn, NY",
    rating: 4.4,
    certifications: ["Secondhand", "Carbon Neutral"],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=60",
    website: "renewthrift.shop",
  },
  {
    id: "v6",
    name: "Pure Glow Naturals",
    category: "Fashion & Beauty",
    description:
      "Cruelty-free skincare in refillable packaging, made with plant-based ingredients.",
    location: "920 Coast Hwy, San Diego, CA",
    rating: 4.9,
    certifications: ["Cruelty-Free", "Refillable"],
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=500&q=60",
    phone: "(619) 555-0173",
    website: "pureglow.eco",
  },

  // Home & Garden
  {
    id: "v7",
    name: "Eco Home Solutions",
    category: "Home & Garden",
    description:
      "Energy-efficient appliances, solar solutions, and sustainable furniture.",
    location: "789 Green St, San Francisco, CA",
    rating: 4.9,
    certifications: ["Energy Star", "Solar Certified"],
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=500&q=60",
    phone: "(415) 555-0156",
    website: "ecohomesolutions.com",
  },
  {
    id: "v8",
    name: "Terra Verde Gardens",
    category: "Home & Garden",
    description:
      "Native plants, water-wise landscaping, and organic soil for regenerative gardens.",
    location: "330 Riverside Dr, Sacramento, CA",
    rating: 4.6,
    certifications: ["Native Plants", "Water-Wise"],
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=60",
    website: "terraverde.garden",
  },

  // Services & Utilities
  {
    id: "v9",
    name: "BrightSun Energy",
    category: "Services & Utilities",
    description:
      "100% renewable residential electricity plans and home solar installation.",
    location: "1400 Sunbelt Rd, Phoenix, AZ",
    rating: 4.7,
    certifications: ["100% Renewable", "B Corp"],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=60",
    phone: "(602) 555-0101",
    website: "brightsun.energy",
  },
  {
    id: "v10",
    name: "CleanCommute Bikeshare",
    category: "Services & Utilities",
    description:
      "Community-owned electric bikeshare reducing car trips across the city.",
    location: "55 Lakefront Ave, Minneapolis, MN",
    rating: 4.5,
    certifications: ["Carbon Neutral", "Community Owned"],
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=60",
    website: "cleancommute.bike",
  },
];
