const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

const testProfile = {
  careerInterests: ['tech-software', 'tech-data'],
  skills: ['Python', 'JavaScript', 'React', 'Communication', 'Problem Solving'],
  classYear: 'junior',
  goals: ['internship', 'skills', 'networking']
};

async function testAPI() {
  try {
    console.log('🧪 Testing Eventus API...\n');

    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data.status);
    console.log('   Database:', healthResponse.data.database);

    // Test profile creation
    console.log('\n2. Testing profile creation...');
    const createResponse = await axios.post(`${API_BASE_URL}/api/user/profile`, testProfile);
    console.log('✅ Profile created successfully');
    console.log('   Profile ID:', createResponse.data.profileId);
    
    const profileId = createResponse.data.profileId;

    // Test profile retrieval
    console.log('\n3. Testing profile retrieval...');
    const getResponse = await axios.get(`${API_BASE_URL}/api/user/profile/${profileId}`);
    console.log('✅ Profile retrieved successfully');
    console.log('   Career Interests:', getResponse.data.profile.careerInterests);
    console.log('   Skills:', getResponse.data.profile.skills);
    console.log('   Class Year:', getResponse.data.profile.classYear);
    console.log('   Goals:', getResponse.data.profile.goals);

    // Test all profiles endpoint
    console.log('\n4. Testing all profiles endpoint...');
    const allProfilesResponse = await axios.get(`${API_BASE_URL}/api/user/profiles`);
    console.log('✅ All profiles retrieved successfully');
    console.log('   Total profiles:', allProfilesResponse.data.pagination.total);

    console.log('\n🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running:');
      console.log('   cd backend && npm run dev');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
