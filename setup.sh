#!/bin/bash

echo "🚀 Setting up Eventus User Onboarding Prototype..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "🗄️  Setting up database..."

# Create database (you may need to adjust this based on your PostgreSQL setup)
createdb eventus_prototype 2>/dev/null || echo "Database may already exist"

# Run migrations
echo "🔄 Running database migrations..."
cd backend
npm run migrate
cd ..

# Seed database with sample data
echo "🌱 Seeding database with sample data..."
cd backend
npm run seed
cd ..

echo "✅ Setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Update backend/.env with your database credentials if needed"
echo "3. Run 'npm run dev' to start both frontend and backend servers"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   Health:   http://localhost:5000/health"
