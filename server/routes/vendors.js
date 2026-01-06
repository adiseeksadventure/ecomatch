const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (admin only for mutations)
const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (req.user.role !== 'admin') {
         return res.status(403).json({ message: 'Not authorized as admin' });
      }
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const vendors = await Vendor.find(query).sort({ createdAt: -1 });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single vendor
// @route   GET /api/vendors/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
      res.status(200).json(vendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a vendor
// @route   POST /api/vendors
// @access  Private/Admin
router.post('/', protectAdmin, async (req, res) => {
  const { name, category, description, location, image, contact } = req.body;

  if (!name || !category || !description || !location) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }

  try {
    const vendor = await Vendor.create({
      name,
      category,
      description,
      location,
      image,
      contact
    });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Seed sample vendors (dev only)
// @route   POST /api/vendors/seed
// @access  Public (for demo purposes)
router.post('/seed', async (req, res) => {
    try {
        const count = await Vendor.countDocuments();
        if (count > 0) {
            return res.status(400).json({ message: 'Vendors already seeded' });
        }

        const sampleVendors = [
            {
                name: "Green Earth Grocers",
                category: "Food & Dining",
                description: "Organic, locally sourced produce and bulk foods with zero-waste packaging options.",
                location: "123 Eco Lane, Portland",
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=60",
                contact: { website: "www.greenearth.com" }
            },
            {
                name: "Sustainable Style Co",
                category: "Fashion & Beauty",
                description: "Ethically made clothing using recycled materials and organic cotton.",
                location: "456 Fashion Ave, Seattle",
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=60",
                contact: { website: "www.sustainablestyle.com" }
            },
            {
                name: "Eco Home Solutions",
                category: "Home & Garden",
                description: "Energy-efficient appliances, solar solutions, and sustainable furniture.",
                location: "789 Green St, San Francisco",
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=500&q=60",
                contact: { website: "www.ecohome.com" }
            }
        ];

        await Vendor.insertMany(sampleVendors);
        res.status(201).json({ message: 'Sample vendors seeded' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
