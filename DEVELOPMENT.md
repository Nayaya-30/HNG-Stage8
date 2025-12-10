# Tour Management Platform - Development Guide

## Project Overview

This is a comprehensive tour management platform built with Next.js 16, React 19, TypeScript, and Convex for real-time data management. The project includes:

1. **Dashboard Application** (Next.js) - Tour creation, management, and analytics
2. **Embeddable Widget** (Vite) - The actual tour widget with Three.js 3D avatar

## Tech Stack

### Dashboard (Next.js)

-   **Framework**: Next.js 16 with App Router
-   **UI**: React 19, Tailwind CSS 4
-   **Database**: Convex (real-time backend)
-   **State Management**: Convex React hooks
-   **UI Components**: Radix UI primitives
-   **Charts**: Recharts
-   **Animations**: Framer Motion, GSAP
-   **Forms**: React Hook Form
-   **Notifications**: Sonner

### Widget (Vite)

-   **Build Tool**: Vite
-   **3D Graphics**: Three.js with React Three Fiber
-   **Animations**: Framer Motion
-   **Styling**: Tailwind CSS 3

## Project Structure

```
HNG-Stage8/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── auth/
│   │   │   ├── signin/               # Sign-in page
│   │   │   └── signup/               # Sign-up page
│   │   ├── dashboard/
│   │   │   ├── analytics/            # Analytics dashboard
│   │   │   ├── settings/             # Settings page
│   │   │   ├── tours/
│   │   │   │   ├── new/              # Create new tour
│   │   │   │   ├── [id]/             # Edit existing tour
│   │   │   │   └── page.tsx          # Tours list
│   │   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   │   └── page.tsx              # Dashboard overview
│   │   ├── installation/             # Installation guide
│   │   ├── tour-demo/                # Interactive demo
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── activity/
│   │   │   │   └── recent.tsx        # Recent activity component
│   │   │   ├── stats/
│   │   │   │   └── cards.tsx         # Stats cards
│   │   │   ├── tours/
│   │   │   │   ├── create-button.tsx
│   │   │   │   └── list.tsx          # Tour list component
│   │   │   ├── analytics-charts.tsx  # Analytics visualizations
│   │   │   ├── embed-code-generator.tsx
│   │   │   ├── header.tsx            # Dashboard header
│   │   │   ├── sidebar.tsx           # Dashboard sidebar
│   │   │   ├── tour-editor.tsx       # Tour creation/editing form
│   │   │   ├── tour-list.tsx
│   │   │   ├── tour-preview.tsx
│   │   │   └── tour-statistics.tsx
│   │   ├── tour-widget/              # Widget components
│   │   └── ui/                       # Reusable UI components
│   ├── lib/
│   │   ├── convex/
│   │   │   ├── functions/
│   │   │   │   ├── analytics.ts      # Analytics Convex functions
│   │   │   │   └── tours.ts          # Tours CRUD operations
│   │   │   ├── client.tsx            # Convex client provider
│   │   │   └── schema.ts             # Convex schema definitions
│   │   └── utils.ts                  # Utility functions
│   └── hooks/                        # Custom React hooks
├── convex/
│   ├── _generated/                   # Auto-generated Convex files
│   ├── schema.ts                     # Main Convex schema
│   └── tsconfig.json
├── vite/                             # Separate Vite widget project
│   ├── src/
│   │   ├── Widget.tsx                # Main widget component with 3D avatar
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Widget styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── public/                           # Static assets

```

## Features Implemented

### ✅ Authentication

-   Sign-in page with email/password and OAuth options
-   Sign-up page with validation
-   Mock authentication (ready for Convex Auth integration)

### ✅ Dashboard

-   **Overview**: Stats cards, recent activity, tour list
-   **Tours Management**:
    -   Create new tours (e-commerce, SaaS, custom)
    -   Edit existing tours
    -   Delete tours
    -   Minimum 5 steps per tour
    -   Drag-and-drop step reordering
    -   Step positioning (top/bottom/left/right)
    -   Target element selectors
-   **Analytics**:
    -   Overall statistics
    -   Tour completion rates
    -   Step-by-step analytics
    -   Interactive charts (Recharts)
    -   Per-tour performance metrics
-   **Settings**:
    -   Account settings
    -   Notification preferences
    -   Widget customization
    -   Danger zone (account deletion)

### ✅ Tour Widget (Vite)

-   3D animated avatar using Three.js
-   Smooth animations with Framer Motion
-   Progress tracking
-   Resume capability (localStorage)
-   Skip functionality
-   Navigation controls (Next/Back)
-   Responsive design
-   Embeddable via script tag

### ✅ Additional Pages

-   **Installation Guide**:
    -   Quick start with script tag
    -   Framework integration (React, Vue, Angular)
    -   Configuration options
    -   Code examples with copy functionality
-   **Tour Demo**:
    -   Interactive tour previews
    -   E-commerce, SaaS, and custom examples
    -   Live widget preview
    -   Feature showcase

### ✅ Real-time Data (Convex)

-   Tours CRUD operations
-   Analytics tracking
-   Recent activity feed
-   Type-safe queries and mutations

## Installation & Setup

### Prerequisites

-   Node.js 18+ and npm/pnpm
-   Convex account (https://convex.dev)

### 1. Install Dashboard Dependencies

```bash
cd c:\Users\Usouff\Desktop\soma\stage8\HNG-Stage8
npm install @radix-ui/react-tabs @radix-ui/react-dialog
```

### 2. Install Widget Dependencies

```bash
cd vite
npm install
```

### 3. Setup Convex

```bash
# In the main project directory
npx convex dev
```

Follow the prompts to set up your Convex project. Update `.env.local` with your Convex URL:

```
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

### 4. Run Development Servers

**Dashboard:**

```bash
npm run dev
```

**Widget (separate terminal):**

```bash
cd vite
npm run dev
```

**Convex (separate terminal):**

```bash
npx convex dev
```

## Building for Production

### Dashboard

```bash
npm run build
npm start
```

### Widget

```bash
cd vite
npm run build
```

The widget will be built to `vite/dist/` and can be embedded via:

```html
<script src="path/to/tour-widget.js"></script>
```

## Key Components

### Tour Editor (`src/components/dashboard/tour-editor.tsx`)

-   Full-featured tour creation/editing form
-   Minimum 5 steps enforcement
-   Step reordering with up/down arrows
-   Position and target element configuration
-   Real-time validation

### Widget (`vite/src/Widget.tsx`)

-   Three.js 3D avatar with OrbitControls
-   Framer Motion animations
-   Progress persistence
-   Step navigation
-   Customizable appearance

### Convex Functions

**Tours (`src/lib/convex/functions/tours.ts`):**

-   `listTours` - Get all tours for a user
-   `getTour` - Get single tour by ID
-   `createTour` - Create new tour
-   `updateTour` - Update existing tour
-   `deleteTour` - Delete tour

**Analytics (`src/lib/convex/functions/analytics.ts`):**

-   `startTour` - Record tour start
-   `completeStep` - Track step completion
-   `completeTour` - Mark tour as completed
-   `abandonTour` - Track abandoned tours
-   `getTourAnalytics` - Get analytics for a tour
-   `getRecentActivity` - Get recent user activity

## Convex Schema

```typescript
tours: {
  name: string
  type: 'ecommerce' | 'saas' | 'custom'
  status: 'draft' | 'active'
  steps: Array<{
    id: string
    title: string
    content: string
    position: 'top' | 'bottom' | 'left' | 'right'
    targetElement?: string
  }>
  ownerId: string
  createdAt: number
  updatedAt: number
}

tourAnalytics: {
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

## Next Steps

1. **Authentication Integration**: Replace mock auth with actual Convex Auth when partner implements it
2. **API Keys**: Implement API key generation for widget embedding
3. **Advanced Analytics**: Add more detailed metrics and visualizations
4. **Tour Templates**: Pre-built tour templates for common use cases
5. **A/B Testing**: Compare different tour variations
6. **Localization**: Multi-language support
7. **Custom Themes**: More widget customization options
8. **Webhooks**: Real-time notifications for tour events

## Testing

### Sign In

1. Navigate to `/auth/signin`
2. Enter any email and password
3. Click "Sign In"
4. You'll be redirected to `/dashboard`

### Create a Tour

1. Go to `/dashboard/tours`
2. Click "Create Tour"
3. Fill in tour details
4. Add/edit steps (minimum 5)
5. Save tour

### View Analytics

1. Navigate to `/dashboard/analytics`
2. View overall stats and charts
3. Check per-tour performance

### Test Widget

1. Go to `/tour-demo`
2. Select tour type
3. Click "Launch Demo Tour"
4. Interact with the widget

## Deployment

### Vercel (Recommended for Next.js)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the .next folder
```

### Widget CDN

Build the widget and upload to your CDN:

```bash
cd vite
npm run build
# Upload dist/ folder to CDN
```

## Support

For issues or questions:

-   Check the installation guide at `/installation`
-   View the demo at `/tour-demo`
-   Review Convex docs: https://docs.convex.dev

## License

This project is part of the HNG Stage 8 assessment.
