const express = require('express');
const router = express.Router();
const { createProfile, getProfile, getAllProfiles } = require('../controllers/userController');

// POST /api/user/profile - Create a new user profile
router.post('/profile', createProfile);

// GET /api/user/profile/:id - Get a specific user profile
router.get('/profile/:id', getProfile);

// GET /api/user/profiles - Get all user profiles (for development/testing)
router.get('/profiles', getAllProfiles);

module.exports = router;
