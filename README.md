# 🛍️ Deco Store - Modern E-commerce Platform

A full-featured e-commerce platform built with Next.js 14, React, TypeScript, and Tailwind CSS, designed for selling decoration items with a focus on user experience and performance.

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog**
  - Grid and list views
  - Advanced filtering and sorting
  - Real-time search with suggestions
  - Detailed product pages with image galleries
  - Related products recommendations

- **Shopping Cart**
  - Persistent cart state using Zustand
  - Slide-out cart drawer
  - Real-time quantity updates
  - Price calculations
  - Save for later functionality

- **Wishlist**
  - Add/remove products
  - Move to cart functionality
  - Persistent storage

### 👤 User Features
- **Authentication**
  - Email/Password login
  - Social login (Google, GitHub)
  - Password reset
  - Email verification

- **User Profiles**
  - Order history
  - Saved addresses
  - Payment methods
  - Preferences management

### 🎨 UI/UX
- **Modern Design**
  - Responsive layout
  - Dark/Light mode
  - Smooth animations with Framer Motion
  - Loading states and skeletons
  - Toast notifications

- **Components**
  - Reusable UI components
  - Modal dialogs
  - Tooltips
  - Accordions
  - Tabs
  - Drawers

### 👑 Admin Dashboard
- **Analytics**
  - Sales overview
  - Customer metrics
  - Product performance
  - Real-time statistics

- **Management**
  - Product management
  - Order processing
  - User management
  - Role-based access control

### 🌐 Internationalization
- Multi-language support
- RTL layout support
- Currency conversion
- Localized content

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Forms**: React Hook Form

### Authentication & Authorization
- **Auth**: NextAuth.js
- **JWT**: JSON Web Tokens
- **Roles**: RBAC (Role-Based Access Control)

### Data Management
- **Database**: Firebase
- **Storage**: Firebase Storage
- **API**: RESTful + tRPC

### Development Tools
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **Testing**: Jest + React Testing Library

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Mzs00007/deco-store.git
   cd deco-store
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Optional: Social Login
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🏗️ Project Structure

\`\`\`
deco-store/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── [locale]/          # Internationalized routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── admin/            # Admin dashboard components
│   │   ├── cart/             # Shopping cart components
│   │   ├── products/         # Product-related components
│   │   └── ui/              # Reusable UI components
│   ├── lib/                  # Utility functions and configs
│   │   ├── auth.ts          # Authentication utilities
│   │   └── firebase.ts      # Firebase configuration
│   ├── models/              # TypeScript interfaces
│   ├── store/               # Zustand store definitions
│   └── styles/              # Global styles and Tailwind
├── public/                  # Static assets
├── messages/               # Translation files
├── middleware.ts          # Next.js middleware
├── next.config.mjs        # Next.js configuration
└── tailwind.config.js     # Tailwind CSS configuration
\`\`\`

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Create a new project on Vercel
3. Import your repository
4. Configure environment variables
5. Deploy

### Manual Deployment
1. Build the application:
   \`\`\`bash
   npm run build
   # or
   yarn build
   \`\`\`

2. Start the production server:
   \`\`\`bash
   npm run start
   # or
   yarn start
   \`\`\`

## 🧪 Testing

- **Run unit tests**
  \`\`\`bash
  npm run test
  # or
  yarn test
  \`\`\`

- **Run E2E tests**
  \`\`\`bash
  npm run test:e2e
  # or
  yarn test:e2e
  \`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Zaid Siddiqui** - *Initial work* - [Mzs00007](https://github.com/Mzs00007)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- Firebase for backend services
- All contributors and supporters

## 📞 Support

For support, email support@decostore.com or join our Slack channel. 