# Eventus - Career Events Onboarding Prototype

A modern, **Material Design** onboarding system for personalized career event recommendations, built with Next.js and fully Vercel-ready! 🚀

## ✨ Features

- **Material Design** UI with Material-UI v5
- **Multi-step onboarding flow** with Material Stepper
- **Career interests** selection with Checkboxes and Chips
- **Skills assessment** (technical & soft skills)
- **Class year** selection with Radio buttons and Cards
- **Goals tracking** with colorful, interactive Cards
- **Review step** with Material List components
- **In-memory API** (no database required for demo)
- **Fully responsive** and mobile-friendly
- **Google Material Design compliant**

## 🎨 Design System

### Material Design (Google)
- **Primary Color:** #1976d2 (Material Blue)
- **Secondary Color:** #dc004e (Material Pink)
- **Typography:** Roboto font family
- **Elevation:** Card shadows for depth
- **Components:** Material-UI v5
- **Icons:** @mui/icons-material

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Styling:** Emotion (MUI's styling engine)
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Deployment:** Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yravipati-hw6-prototype1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
yravipati-hw6-prototype1/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── user/profile/         # User profile endpoints
│   ├── onboarding/               # Onboarding flow page
│   ├── success/                  # Success page
│   ├── theme.ts                  # Material theme config
│   ├── ThemeRegistry.tsx         # MUI theme provider
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (redirects)
├── components/                   # React components
│   └── steps/                    # Onboarding step components
│       ├── CareerInterestsStep.tsx
│       ├── SkillsStep.tsx
│       ├── ClassYearStep.tsx
│       ├── GoalsStep.tsx
│       └── ReviewStep.tsx
├── public/                       # Static assets
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── vercel.json                  # Vercel deployment config
```

## 🌐 Deployment to Vercel

This project is fully configured for Vercel deployment!

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy" (auto-detects Next.js)

That's it! Your app will be live at `https://your-project.vercel.app`

## 📝 API Endpoints

### POST `/api/user/profile`
Create a new user profile

**Request Body:**
```json
{
  "careerInterests": ["tech-software", "tech-data"],
  "skills": ["Python", "JavaScript", "React"],
  "classYear": "junior",
  "goals": ["internship", "skills"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile created successfully",
  "profileId": "profile-1234567890-abc123",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET `/api/user/profile?id={profileId}`
Retrieve a user profile

## 🎨 Material Design Components

### Used Throughout
- `Card` & `CardContent` - Surface containers
- `Button` - Material buttons with ripple
- `Stepper` & `Step` - Multi-step navigation
- `LinearProgress` - Progress indicators
- `Checkbox` & `Radio` - Selection controls
- `TextField` - Text inputs
- `Chip` - Compact elements
- `List` & `ListItem` - Review lists
- `Avatar` - Success icon
- `Alert` - Error messages
- Material Icons - Throughout

### Theme Customization

Located in `app/theme.ts`:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
});
```

## 📊 Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    488 B          87.8 kB
├ ○ /onboarding                          52.2 kB         218 kB
└ ○ /success                             3.08 kB         169 kB
├ ƒ /api/user/profile                    0 B                0 B

✅ Build successful - Ready for Vercel!
```

## 🔧 Configuration Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### `package.json` Engines
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

## ✅ What Makes This Vercel-Compatible

1. **Next.js 14** - Vercel's own framework
2. **App Router** - Latest Next.js architecture
3. **API Routes** - Serverless functions (no separate backend)
4. **TypeScript** - Full type safety
5. **Node >=18** - Flexible version requirements
6. **Material-UI** - Works perfectly with Next.js SSR
7. **Zero environment variables** - Works out of the box

## 🐛 Troubleshooting

### Build Fails
- Ensure Node.js >= 18.0.0: `node --version`
- Clear cache: `rm -rf .next node_modules package-lock.json && npm install`

### Material-UI Styles Not Working
- Ensure ThemeRegistry is wrapping app in `app/layout.tsx`
- Check that Emotion is installed: `@emotion/react` and `@emotion/styled`

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Verify `vercel.json` configuration
- Ensure all dependencies are in `package.json`

## 📊 Performance

- **Build Time:** ~30 seconds
- **Bundle Size:** 218 kB (onboarding page)
- **Lighthouse Score:** 90+ expected
- **Static Pages:** 7 (optimized for speed)

## 🔒 Security

- Input validation on API routes
- No sensitive data stored
- HTTPS enforced on Vercel
- TypeScript for type safety

## 🎓 Resources

- [Material Design Guidelines](https://material.io/design)
- [Material-UI Documentation](https://mui.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 📄 License

MIT

## 👥 Author

Yashwanth Ravipati

---

**Ready for Vercel deployment with Material Design! 🎉**

For questions or issues, check `MATERIAL_DESIGN.md` for Material Design implementation details.
