const express = require('express');
const jwt = require('jsonwebtoken');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT and check if Admin
const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    if (!decoded.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update vehicle price (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { price } = req.body;
    let vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    vehicle.price = price;
    await vehicle.save();

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
