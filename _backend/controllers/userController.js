// Use in-memory database for demo (no PostgreSQL required)
const db = require('../config/database-memory');
const { v4: uuidv4 } = require('uuid');

const createProfile = async (req, res) => {
  try {
    const { careerInterests, skills, classYear, goals } = req.body;

    // Validate required fields
    if (!careerInterests || !Array.isArray(careerInterests) || careerInterests.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Career interests are required and must be a non-empty array'
      });
    }

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be an array'
      });
    }

    if (!classYear) {
      return res.status(400).json({
        success: false,
        message: 'Class year is required'
      });
    }

    if (!goals || !Array.isArray(goals) || goals.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Goals are required and must be a non-empty array'
      });
    }

    // Insert profile into database
    const result = await db.query(
      `INSERT INTO user_profiles (career_interests, skills, class_year, goals) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, created_at`,
      [careerInterests, skills, classYear, goals]
    );

    const profile = result.rows[0];

    console.log('Profile created:', {
      id: profile.id,
      careerInterests,
      skills: skills.length,
      classYear,
      goals
    });

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      profileId: profile.id,
      createdAt: profile.created_at
    });

  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating profile'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid profile ID format'
      });
    }

    const result = await db.query(
      'SELECT * FROM user_profiles WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const profile = result.rows[0];

    res.json({
      success: true,
      profile: {
        id: profile.id,
        careerInterests: profile.career_interests,
        skills: profile.skills,
        classYear: profile.class_year,
        goals: profile.goals,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching profile'
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const result = await db.query(
      `SELECT id, career_interests, skills, class_year, goals, created_at 
       FROM user_profiles 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );

    const countResult = await db.query('SELECT COUNT(*) FROM user_profiles');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      profiles: result.rows.map(profile => ({
        id: profile.id,
        careerInterests: profile.career_interests,
        skills: profile.skills,
        classYear: profile.class_year,
        goals: profile.goals,
        createdAt: profile.created_at
      })),
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      }
    });

  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching profiles'
    });
  }
};

module.exports = {
  createProfile,
  getProfile,
  getAllProfiles
};
