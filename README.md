# Eventus User Onboarding Survey Prototype

A full-stack demo prototype for user onboarding flow following Google's Material Design principles.

## Features

- Multi-step onboarding survey form
- Material-UI components with Google Material Design
- Form validation and error handling
- PostgreSQL database integration
- Responsive design for mobile and desktop
- Mock data for rapid prototyping

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI) v5
- React Hook Form for form management
- Axios for API calls

### Backend
- Node.js with Express.js
- PostgreSQL database
- CORS enabled for development

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)

### Installation

1. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

2. Set up the database:
```bash
# Create PostgreSQL database
createdb eventus_prototype

# Run database migrations (from backend directory)
npm run migrate
```

3. Start the development servers:
```bash
# Terminal 1: Start backend (from backend directory)
npm run dev

# Terminal 2: Start frontend (from frontend directory)
npm start
```

4. Open http://localhost:3000 to view the application

## Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Express.js backend API
├── database/          # Database schema and migrations
└── README.md
```

## API Endpoints

- `POST /api/user/profile` - Create user profile from onboarding survey
- `GET /api/user/profile/:id` - Get user profile by ID

## Material Design Principles

This prototype follows Google's Material Design principles to create an intuitive and visually appealing user experience.

### Design System Implementation

#### **Color Palette**
- **Primary Color**: Material Blue (#1976d2) - Used for main actions, navigation, and key UI elements
- **Secondary Color**: Material Pink (#dc004e) - Used for accent elements and secondary actions
- **Surface Colors**: Clean whites and subtle grays for backgrounds and cards
- **Semantic Colors**: Success green, warning amber, and error red for feedback states

#### **Typography Hierarchy**
- **Font Family**: Roboto - Google's signature typeface for digital interfaces
- **Scale**: Consistent type scale with proper heading hierarchy (H1-H6)
- **Weight Variations**: Light (300), Regular (400), Medium (500), Bold (700)
- **Line Height**: Optimized for readability across different screen sizes

#### **Elevation & Shadows**
- **Card Elevation**: Subtle shadows (0 2px 8px rgba(0,0,0,0.1)) for content separation
- **Interactive Elements**: Hover states with increased elevation for buttons and cards
- **Layering**: Proper z-index management for overlays and modals

#### **Spacing & Layout**
- **8dp Grid System**: All spacing follows Material's 8-density-pixel grid
- **Consistent Margins**: 16dp, 24dp, 32dp spacing for different hierarchy levels
- **Responsive Breakpoints**: Mobile-first approach with tablet and desktop adaptations

### Component Design Patterns

#### **Form Elements**
- **Text Fields**: Floating label design with proper focus states
- **Checkboxes & Radio Buttons**: Material ripple effects and proper touch targets
- **Buttons**: Contained, outlined, and text variants with appropriate elevation
- **Selection Controls**: Consistent styling across all input types

#### **Navigation & Progress**
- **Stepper Component**: Clear progress indication with completed, active, and pending states
- **Breadcrumbs**: Visual hierarchy showing user's current position in the flow
- **Back/Next Navigation**: Consistent placement and styling

#### **Feedback & States**
- **Loading States**: Material CircularProgress with proper timing
- **Error Handling**: Clear error messages with appropriate color coding
- **Success Feedback**: Confirmation states with positive reinforcement
- **Empty States**: Helpful guidance when no data is present

#### **Data Display**
- **Cards**: Consistent card design with proper padding and shadow
- **Chips**: Tag-like elements for displaying selected items and categories
- **Lists**: Structured information display with proper spacing and hierarchy
- **Icons**: Material Icons for consistent visual language

### Responsive Design Implementation

#### **Breakpoint Strategy**
- **Mobile**: 0-599px - Single column layout, larger touch targets
- **Tablet**: 600-959px - Adapted spacing and component sizing
- **Desktop**: 960px+ - Multi-column layouts where appropriate

#### **Touch Interaction**
- **Minimum Touch Target**: 48dp for all interactive elements
- **Ripple Effects**: Visual feedback for all button and selection interactions
- **Gesture Support**: Swipe and tap interactions where appropriate

### Accessibility Features

#### **Color Contrast**
- **WCAG AA Compliance**: All text meets minimum contrast ratios
- **Color Independence**: Information not conveyed by color alone
- **Focus Indicators**: Clear visual focus states for keyboard navigation

#### **Semantic Structure**
- **Proper Headings**: Logical heading hierarchy for screen readers
- **ARIA Labels**: Descriptive labels for form elements and interactive components
- **Keyboard Navigation**: Full functionality available via keyboard

### User Experience Patterns

#### **Progressive Disclosure**
- **Multi-step Form**: Complex information broken into digestible steps
- **Contextual Help**: Guidance provided when and where needed
- **Optional vs Required**: Clear indication of required fields

#### **Feedback Loops**
- **Real-time Validation**: Immediate feedback on form inputs
- **Progress Indication**: Clear progress through the onboarding flow
- **Confirmation States**: Success messaging with next steps

#### **Error Prevention**
- **Input Constraints**: Proper input types and validation rules
- **Clear Labels**: Descriptive field labels and placeholder text
- **Helper Text**: Additional context for complex fields

### Material-UI Implementation Details

#### **Theme Configuration**
```javascript
// Custom Material-UI theme with brand colors
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: { borderRadius: 8 },
});
```

#### **Component Customization**
- **Button Overrides**: Removed text transformation, adjusted font weights
- **Card Styling**: Custom shadow values for consistent elevation
- **Form Controls**: Enhanced focus states and error styling

This comprehensive implementation of Material Design ensures a professional, accessible, and user-friendly interface that aligns with modern design standards and user expectations.

## Survey Data Collection

The onboarding survey collects:
- Career Interests (industries and roles)
- Skills (technical and soft skills)
- Class Year (Freshman, Sophomore, Junior, Senior, Graduate)
- Primary Goals (Internship, Full-time job, Networking, etc.)
