# Globe Life American Income Division - Agent Website

A modern, responsive website template for Globe Life American Income Division agents to showcase their services, connect with potential clients, and recruit new team members.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Customization](#customization)
- [API Routes](#api-routes)
- [Deployment](#deployment)

## Overview

This project is a professional website template designed for Globe Life American Income Division agents. It provides a complete solution for agents to establish their online presence, featuring sections for agent profiles, career opportunities, customer care information, and contact forms.

## Features

- **Hero Section** - Eye-catching introduction with agent profile and contact information
- **About Section** - Detailed agent biography and professional background
- **Career Section** - Information about career opportunities with Globe Life
- **Ratings Display** - Showcase company ratings and achievements
- **Start Career Section** - Call-to-action for potential recruits
- **Image/Video Slider** - Dynamic content presentation
- **Customer Care** - Support information and resources
- **Contact Form** - Email integration for client inquiries
- **Career Application Form** - Recruitment form with country selection
- **Responsive Design** - Mobile-first approach with full responsiveness
- **Animated UI** - Smooth animations powered by Framer Motion

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Preline UI](https://preline.co/) | UI component library |
| [Nodemailer](https://nodemailer.com/) | Email sending functionality |
| [Axios](https://axios-http.com/) | HTTP client |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Font Awesome](https://fontawesome.com/) | Icon library |

## Project Structure

```
globe-life-v3/
├── app/
│   ├── api/                          # API routes
│   │   ├── career/route.ts           # Career form submission
│   │   ├── contact/route.ts          # Contact form submission
│   │   └── countries/route.ts        # Country list endpoint
│   │
│   ├── components/                   # Reusable components
│   │   ├── ModalPortal.tsx           # Modal portal utility
│   │   ├── PrelineScript.tsx         # Preline UI script loader
│   │   └── PrelineScriptWrapper.tsx  # Preline wrapper component
│   │
│   ├── pages/
│   │   └── home/
│   │       ├── agent-info/           # Agent configuration (JSON)
│   │       │   └── Majidi.json       # Agent profile data
│   │       ├── sections/             # Page sections
│   │       │   ├── About/            # About section
│   │       │   ├── Career/           # Career section
│   │       │   ├── ContactUs/        # Contact form section
│   │       │   ├── CustomerCare/     # Customer care section
│   │       │   ├── Hero/             # Hero section
│   │       │   ├── Ratings/          # Ratings display
│   │       │   ├── Slider/           # Image/video slider
│   │       │   └── StartCareer/      # Start career CTA
│   │       └── page.tsx              # Home page component
│   │
│   ├── shared/                       # Shared components
│   │   ├── CareerModal/              # Career application modal
│   │   ├── Footer/                   # Footer component
│   │   ├── Header/                   # Header/navigation
│   │   └── exporter.js               # Shared component exports
│   │
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main entry page
│
├── public/
│   └── assets/
│       ├── image/                    # Image assets
│       │   ├── agent-assets/         # Agent profile images
│       │   ├── background/           # Background images
│       │   └── logo/                 # Logo variations
│       └── video/                    # Video assets
│
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
└── eslint.config.mjs                 # ESLint configuration
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stan-asian/globe-life-v3.git
   cd globe-life-v3
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Configuration

### Agent Profile Configuration

The agent's information is stored in a JSON file located at:
```
app/pages/home/agent-info/Majidi.json
```

This file contains two main sections:

#### Hero Client Configuration
```json
{
  "heroClient": {
    "agent": {
      "name": "Agent Name",
      "title": "Business Owner",
      "organization": "Organization Name",
      "profileImage": "/assets/image/agent-assets/sampleImage.jpg",
      "backgroundImage": "/assets/image/background/Background.jpg",
      "description": {
        "headline": "...",
        "body": "..."
      },
      "officeInfo": {
        "phone": ["..."],
        "address": "...",
        "languages": ["English"],
        "hours": "...",
        "mapEmbedUrl": "..."
      },
      "specialization": [
        { "title": "Individual Insurance", "icon": "fa-user" }
      ],
      "quote": "..."
    }
  }
}
```

#### Agent Profile Configuration
```json
{
  "agentProfile": {
    "about": {
      "intro": "...",
      "achievements": "...",
      "details": ["..."],
      "closing": "..."
    },
    "location": {
      "type": "Virtual Office",
      "city": "...",
      "phone": "...",
      "fax": "...",
      "website": "..."
    }
  }
}
```

### Environment Variables

For email functionality, you may need to configure the following environment variables:

```env
# Email Configuration (for contact/career forms)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

## Customization

### Changing Agent Information

1. Navigate to `app/pages/home/agent-info/`
2. Edit the `Majidi.json` file or create a new JSON file
3. Update the import in `app/pages/home/page.tsx` if using a different file

### Adding New Sections

1. Create a new folder in `app/pages/home/sections/`
2. Create the main component file (e.g., `NewSection.tsx`)
3. Create a client component folder if needed (e.g., `NewSectionClient/`)
4. Import and add the component in `app/pages/home/page.tsx`

### Styling

- Global styles are in `app/globals.css`
- Component-specific styles can be added using CSS modules (e.g., `style.module.css`)
- Tailwind CSS classes are used throughout the project

### Fonts

The project uses three Google Fonts configured in `app/layout.tsx`:
- **Poppins** - Primary font (`--font-poppins`)
- **Cedarville Cursive** - Decorative font (`--font-cedarville`)
- **Roboto Slab** - Secondary font (`--font-roboto-slab`)

## API Routes

### POST /api/contact
Handles contact form submissions.

### POST /api/career
Handles career application form submissions.

### GET /api/countries
Returns a list of countries for the career form dropdown.

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import the project to Vercel
3. Configure environment variables if needed
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/stan-asian/globe-life-v3)

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- [Netlify](https://netlify.com)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app)
- Self-hosted with Node.js

## License

This project is private and intended for Globe Life American Income Division agents.

---

For questions or support, please contact the development team.
