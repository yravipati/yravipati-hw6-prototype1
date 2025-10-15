const db = require('../config/database');

const seedData = async () => {
  try {
    console.log('Seeding database with sample data...');

    const sampleProfiles = [
      {
        career_interests: ['tech-software', 'tech-data'],
        skills: ['Python', 'JavaScript', 'Data Analysis', 'Communication'],
        class_year: 'junior',
        goals: ['internship', 'skills']
      },
      {
        career_interests: ['finance-ib', 'consulting-strategy'],
        skills: ['Excel', 'Financial Modeling', 'Leadership', 'Public Speaking'],
        class_year: 'senior',
        goals: ['fulltime', 'networking']
      },
      {
        career_interests: ['tech-product', 'consulting-tech'],
        skills: ['Project Management', 'SQL', 'Figma', 'Problem Solving'],
        class_year: 'sophomore',
        goals: ['exploration', 'skills', 'networking']
      }
    ];

    for (const profile of sampleProfiles) {
      await db.query(
        `INSERT INTO user_profiles (career_interests, skills, class_year, goals) 
         VALUES ($1, $2, $3, $4)`,
        [profile.career_interests, profile.skills, profile.class_year, profile.goals]
      );
    }

    console.log('✅ Sample data inserted successfully');
    console.log('🎉 Database seeding completed!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedData()
    .then(() => {
      console.log('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedData };
