// In-memory database for demo purposes (no PostgreSQL required)
const { v4: uuidv4 } = require('uuid');

class MemoryDatabase {
  constructor() {
    this.profiles = [];
    console.log('🗄️  Using in-memory database (no PostgreSQL required)');
  }

  async query(text, params = []) {
    // Simulate database operations
    if (text.includes('SELECT 1')) {
      // Health check
      return { rows: [{ '?column?': 1 }] };
    }
    
    if (text.includes('INSERT INTO user_profiles')) {
      // Create profile
      const [careerInterests, skills, classYear, goals] = params;
      const profile = {
        id: uuidv4(),
        career_interests: careerInterests,
        skills: skills,
        class_year: classYear,
        goals: goals,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      this.profiles.push(profile);
      return { rows: [{ id: profile.id, created_at: profile.created_at }] };
    }
    
    if (text.includes('SELECT * FROM user_profiles WHERE id')) {
      // Get profile by ID
      const profileId = params[0];
      const profile = this.profiles.find(p => p.id === profileId);
      return { rows: profile ? [profile] : [] };
    }
    
    if (text.includes('SELECT id, career_interests')) {
      // Get all profiles
      const limit = parseInt(params[0]) || 10;
      const offset = parseInt(params[1]) || 0;
      const paginatedProfiles = this.profiles
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(offset, offset + limit);
      return { rows: paginatedProfiles };
    }
    
    if (text.includes('SELECT COUNT(*)')) {
      // Count profiles
      return { rows: [{ count: this.profiles.length.toString() }] };
    }
    
    return { rows: [] };
  }
}

const memoryDb = new MemoryDatabase();

// Add some sample data
memoryDb.profiles = [
  {
    id: uuidv4(),
    career_interests: ['tech-software', 'tech-data'],
    skills: ['Python', 'JavaScript', 'React', 'Communication'],
    class_year: 'junior',
    goals: ['internship', 'skills'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    career_interests: ['finance-ib', 'consulting-strategy'],
    skills: ['Excel', 'Financial Modeling', 'Leadership'],
    class_year: 'senior',
    goals: ['fulltime', 'networking'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

module.exports = {
  query: (text, params) => memoryDb.query(text, params),
  pool: memoryDb,
};
