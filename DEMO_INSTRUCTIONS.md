# 🚀 Eventus User Onboarding Demo Instructions

This is a complete full-stack prototype for the Eventus user onboarding survey, built with Google Material Design principles.

## 🎯 What's Included

### ✅ Frontend Features
- **Multi-step survey form** with progress indicator
- **Material-UI components** following Google Material Design
- **Form validation** with real-time error handling
- **Responsive design** for mobile and desktop
- **Career interests selection** with categorized options
- **Skills selection** (technical & soft skills) + custom skills input
- **Class year selection** with visual cards
- **Goals selection** with color-coded options
- **Review step** showing all collected data
- **Success page** with next steps guidance

### ✅ Backend Features
- **Express.js API** with PostgreSQL database
- **RESTful endpoints** for profile management
- **Data validation** and error handling
- **CORS configuration** for frontend integration
- **Rate limiting** and security middleware
- **Health check endpoint** for monitoring
- **Database migrations** and seeding scripts

### ✅ Database Schema
- **User profiles table** with UUID primary keys
- **Array fields** for interests, skills, and goals
- **Indexes** for performance optimization
- **Sample data** for testing

## 🛠️ Quick Setup

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Git

### Option 1: Automated Setup
```bash
npm run setup
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
npm run install-all

# 2. Create database
createdb eventus_prototype

# 3. Set up database
npm run migrate
npm run seed

# 4. Start development servers
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🧪 Testing the Demo

### 1. Complete the Survey Flow
1. Open http://localhost:3000
2. Fill out each step of the survey:
   - **Career Interests**: Select multiple industries/roles
   - **Skills**: Choose from predefined options + add custom skills
   - **Class Year**: Pick your academic level
   - **Goals**: Select your primary objectives
   - **Review**: Verify all information
3. Submit and see the success page

### 2. Test API Endpoints
```bash
npm run test-api
```

### 3. Manual API Testing
```bash
# Health check
curl http://localhost:5000/health

# Create profile
curl -X POST http://localhost:5000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{
    "careerInterests": ["tech-software"],
    "skills": ["Python", "React"],
    "classYear": "junior",
    "goals": ["internship"]
  }'

# Get all profiles
curl http://localhost:5000/api/user/profiles
```

## 📱 Material Design Features Demonstrated

### Visual Design
- **Material color palette** (Primary blue, Secondary pink)
- **Elevation and shadows** on cards
- **Typography hierarchy** with Roboto font
- **Consistent spacing** and layout grid

### Interactive Elements
- **Material buttons** with proper states
- **Checkboxes and radio buttons** with Material styling
- **Text fields** with floating labels
- **Progress stepper** showing completion status
- **Chips** for displaying selected items

### User Experience
- **Clear navigation** with back/next buttons
- **Form validation** with helpful error messages
- **Loading states** during submission
- **Success feedback** with confirmation
- **Responsive layout** adapting to screen size

## 🎨 Customization Options

### Frontend Styling
- Modify theme in `frontend/src/index.js`
- Update colors, typography, and spacing
- Customize component styles in individual files

### Survey Content
- Edit career options in `CareerInterestsStep.js`
- Modify skills lists in `SkillsStep.js`
- Update class year options in `ClassYearStep.js`
- Change goals in `GoalsStep.js`

### Backend Configuration
- Database settings in `backend/.env`
- API endpoints in `backend/routes/`
- Validation rules in `backend/controllers/`

## 📊 Database Structure

```sql
user_profiles (
  id UUID PRIMARY KEY,
  career_interests TEXT[],
  skills TEXT[],
  class_year VARCHAR(20),
  goals TEXT[],
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## 🔧 Development Commands

```bash
# Start both servers
npm run dev

# Start backend only
cd backend && npm run dev

# Start frontend only
cd frontend && npm start

# Build for production
npm run build

# Run database migrations
npm run migrate

# Seed sample data
npm run seed

# Test API endpoints
npm run test-api
```

## 🚀 Production Deployment

### Frontend (Netlify/Vercel)
1. Build: `cd frontend && npm run build`
2. Deploy `frontend/build/` directory
3. Set environment variable: `REACT_APP_API_URL`

### Backend (Heroku/Railway)
1. Deploy `backend/` directory
2. Set environment variables from `.env.example`
3. Run migrations: `npm run migrate`

## 🎯 Success Criteria Met

✅ **Multi-step form** with progress indicator  
✅ **Data collection** for all required fields  
✅ **Form validation** with error handling  
✅ **Material Design** styling throughout  
✅ **Responsive design** for mobile/desktop  
✅ **Backend API** with PostgreSQL storage  
✅ **Full user flow** from survey to confirmation  
✅ **Mock data** for rapid prototyping  
✅ **Working prototype** ready for demonstration  

## 📞 Support

If you encounter any issues:
1. Check that PostgreSQL is running
2. Verify database credentials in `backend/.env`
3. Ensure all dependencies are installed
4. Check console logs for error messages

The prototype demonstrates a complete user onboarding flow with professional Material Design styling and full-stack functionality!
