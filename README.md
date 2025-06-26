# Maritime Nexus Intelligence Platform

A modern, AI-powered maritime intelligence platform built with Next.js, Firebase, and Stripe integration.

## Features

- 🚢 Real-time vessel tracking
- 📊 Advanced analytics dashboard
- 💳 Stripe payment integration
- 🔥 Firebase backend
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Secure authentication
- 📈 Performance monitoring

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Firestore, Authentication)
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Firebase project
- Stripe account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd maritime-nexus
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   Copy `.env.local` and fill in your credentials:
   
   \`\`\`bash
   cp .env.local .env.local
   \`\`\`
   
   Update the following variables:
   - Firebase configuration (from Firebase Console)
   - Stripe keys (from Stripe Dashboard)
   - Base URL for your deployment

### Firebase Setup

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (optional)

2. **Get Firebase configuration**
   - Go to Project Settings > General
   - Add a web app and copy the config
   - Update your `.env.local` file

3. **Set up Firebase Admin SDK**
   - Go to Project Settings > Service Accounts
   - Generate a new private key
   - Add the credentials to your `.env.local` file

### Stripe Setup

1. **Create a Stripe account**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Get your publishable and secret keys
   - Update your `.env.local` file

2. **Create products and prices**
   - Create products for your pricing plans
   - Note the price IDs and update them in the pricing section

3. **Set up webhooks**
   - Add webhook endpoint: `your-domain.com/api/webhook/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret to `.env.local`

### Running the Application

1. **Development mode**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Build for production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Project Structure

\`\`\`
maritime-nexus/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── success/           # Payment success page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
│   ├── firebase.ts       # Firebase client config
│   ├── firebase-admin.ts # Firebase admin config
│   ├── stripe.ts         # Stripe utilities
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   └── images/           # Image assets
├── .env.local            # Environment variables
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
└── README.md             # This file
\`\`\`

## Key Components

### Layout Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Company information and links

### Page Sections
- **HeroSection**: Landing page hero with CTA
- **ServicesSection**: Feature showcase
- **PricingSection**: Subscription plans with Stripe integration
- **TestimonialsSection**: Customer testimonials
- **FaqSection**: Frequently asked questions

### API Routes
- **`/api/create-checkout-session`**: Creates Stripe checkout sessions
- **`/api/webhook/stripe`**: Handles Stripe webhooks
- **`/api/contact`**: Contact form submissions

## Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Import your project to Vercel
   - Connect your GitHub/GitLab repository

2. **Set environment variables**
   - Add all environment variables from `.env.local`
   - Make sure to update `NEXT_PUBLIC_BASE_URL` to your domain

3. **Deploy**
   - Vercel will automatically build and deploy your application

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and themes
- Update component styles in individual component files
- Global styles are in `app/globals.css`

### Content
- Update text content in component files
- Replace placeholder images with your own
- Modify pricing plans in `components/sections/pricing-section.tsx`

### Features
- Add new sections by creating components in `components/sections/`
- Extend API functionality in `app/api/`
- Add new pages in the `app/` directory

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase admin private key | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `NEXT_PUBLIC_BASE_URL` | Your application URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions:
- Create an issue in the repository
- Contact: support@maritimenexus.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.
