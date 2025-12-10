# Tour Management Platform

A comprehensive tour management system for creating, managing, and deploying interactive product tours and onboarding experiences.

## 🚀 Features

-   **Dashboard Application** - Full-featured Next.js dashboard for tour management
-   **Embeddable Widget** - Lightweight Vite-based widget with 3D avatar
-   **Real-time Analytics** - Track user engagement and completion rates
-   **Multiple Tour Types** - E-commerce, SaaS, and custom tour templates
-   **3D Avatar** - Engaging Three.js animated guide
-   **Responsive Design** - Works seamlessly on all devices

## 📋 Prerequisites

-   Node.js 18+ and npm/pnpm
-   Convex account ([sign up here](https://convex.dev))

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
# Install main dashboard dependencies
pnpm install

# Install widget dependencies
cd vite
npm install
cd ..
```

### 2. Required Dependencies

If you encounter missing dependencies, install them:

```bash
# Main dashboard
pnpm install @radix-ui/react-tabs @radix-ui/react-dialog

# These should already be in package.json:
# - @radix-ui/react-avatar
# - @radix-ui/react-label
# - @radix-ui/react-select
# - @radix-ui/react-slot
# - @radix-ui/react-switch
# - sonner (for toast notifications)
```

### 3. Setup Convex

```bash
# Initialize Convex (first time only)
npx convex dev
```

Follow the prompts to create your Convex project. This will:

-   Create a `.env.local` file with your `NEXT_PUBLIC_CONVEX_URL`
-   Set up the Convex backend
-   Start the development server

### 4. Run Development Servers

You'll need **three terminal windows**:

**Terminal 1 - Next.js Dashboard:**

```bash
pnpm dev
# Runs on http://localhost:3000
```

**Terminal 2 - Convex Backend:**

```bash
npx convex dev
# Syncs your schema and functions
```

**Terminal 3 - Widget (Optional):**

```bash
cd vite
npm run dev
# Runs on http://localhost:5173
```

## 📁 Project Structure

```
HNG-Stage8/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── auth/              # Sign-in/Sign-up
│   │   ├── dashboard/         # Main dashboard
│   │   ├── installation/      # Installation guide
│   │   └── tour-demo/         # Interactive demo
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       ├── convex/            # Convex client & functions
│       └── tour-templates.ts  # Pre-built templates
├── convex/
│   ├── schema.ts              # Database schema
│   ├── tours.ts               # Tour CRUD operations
│   └── analytics.ts           # Analytics functions
└── vite/                      # Embeddable widget
    └── src/
        └── Widget.tsx         # Main widget component
```

## 🎯 Quick Start Guide

### 1. Sign In

Navigate to `http://localhost:3000/auth/signin` and sign in with any credentials (mock auth).

### 2. Create Your First Tour

1. Go to Dashboard → Tours
2. Click "Create Tour"
3. Choose tour type (E-commerce, SaaS, or Custom)
4. Add at least 5 steps
5. Configure each step's position and target element
6. Save as draft or publish

### 3. View Analytics

Navigate to Dashboard → Analytics to see:

-   Overall statistics
-   Completion rates
-   Step-by-step analytics
-   Interactive charts

### 4. Test the Widget

1. Go to `/tour-demo`
2. Select a tour type
3. Click "Launch Demo Tour"
4. Interact with the 3D avatar widget

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (auto-created by Convex):

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

### Widget Configuration

When embedding the widget, you can customize:

```javascript
TourWidget.init({
	tourId: 'your_tour_id',
	apiKey: 'your_api_key',
	autoStart: false,
	showAvatar: true,
	position: 'bottom-right',
	primaryColor: '#4f46e5',
	onComplete: () => console.log('Tour completed!'),
	onSkip: () => console.log('Tour skipped'),
});
```

## 📊 Database Schema

### Tours Table

```typescript
{
	name: string;
	type: 'ecommerce' | 'saas' | 'custom';
	status: 'draft' | 'active';
	steps: Array<{
		id: string;
		title: string;
		content: string;
		position: 'top' | 'bottom' | 'left' | 'right';
		targetElement?: string;
	}>;
	ownerId: string;
	createdAt: number;
	updatedAt: number;
}
```

### Tour Analytics Table

```typescript
{
  tourId: string
  userId: string
  startedAt: number
  completedAt?: number
  abandonedAt?: number
  stepProgress: Array<{
    stepId: string
    startedAt: number
    completedAt?: number
  }>
}
```

## 🚢 Deployment

### Deploy Dashboard to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy Widget

Build the widget and upload to your CDN:

```bash
cd vite
npm run build
# Upload dist/ folder to your CDN
```

### Deploy Convex

Convex automatically deploys when you push to production:

```bash
npx convex deploy
```

## 📖 Documentation

-   **Installation Guide**: `/installation` - Complete setup instructions
-   **Demo Page**: `/tour-demo` - Interactive tour examples
-   **Development Guide**: `DEVELOPMENT.md` - Detailed technical documentation

## 🎨 Key Features

### Dashboard

-   ✅ Tour creation and management
-   ✅ Real-time analytics
-   ✅ User activity tracking
-   ✅ Settings and customization
-   ✅ Pre-built templates

### Widget

-   ✅ 3D animated avatar (Three.js)
-   ✅ Smooth animations (Framer Motion)
-   ✅ Progress tracking
-   ✅ Resume capability
-   ✅ Mobile responsive
-   ✅ Customizable styling

## 🤝 Team Collaboration

This is a group project. Responsibilities:

-   **Your Part**: Dashboard, Analytics, Widget
-   **Partner's Part**: External pages, Authentication

## 🐛 Troubleshooting

### Convex Connection Issues

```bash
# Restart Convex dev server
npx convex dev
```

### Missing Dependencies

```bash
# Reinstall all dependencies
pnpm install
cd vite && npm install
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
pnpm dev -- -p 3001
```

## 📝 License

This project is part of the HNG Stage 8 assessment.

## 🔗 Links

-   [Convex Documentation](https://docs.convex.dev)
-   [Next.js Documentation](https://nextjs.org/docs)
-   [Three.js Documentation](https://threejs.org/docs)

---

**Built with ❤️ using Next.js, React, Convex, and Three.js**
# Meget
