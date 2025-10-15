const db = require('../config/database');

const createTables = async () => {
  try {
    console.log('Creating database tables...');

    // Create user_profiles table
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        career_interests TEXT[] NOT NULL,
        skills TEXT[] NOT NULL,
        class_year VARCHAR(20) NOT NULL,
        goals TEXT[] NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ user_profiles table created successfully');

    // Create indexes for better query performance
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_user_profiles_class_year 
      ON user_profiles(class_year)
    `);

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at 
      ON user_profiles(created_at)
    `);

    console.log('✅ Database indexes created successfully');
    console.log('🎉 Database migration completed!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

// Run migration if called directly
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { createTables };
