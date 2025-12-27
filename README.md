# E-Commerce Store

Modern, responsive e-commerce platform built with Next.js 14, React, and Tailwind CSS.

## Features

- 🛒 **Shopping Cart** - Add, remove, and update product quantities
- 💾 **Persistent Storage** - Cart data saved to localStorage
- 🔍 **Search & Filter** - Real-time product search and category filtering
- 📊 **Sort Options** - Sort by price, rating, or featured products
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ⚡ **Fast Performance** - Optimized with Next.js and React hooks
- 🎨 **Modern UI** - Clean interface with smooth animations

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Storage:** localStorage

## Project Structure

\`\`\`
src/
├── components/ # Reusable UI components
├── context/ # Global state management
├── data/ # Product data and constants
├── hooks/ # Custom React hooks
└── app/ # Next.js app router pages
\`\`\`

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run development server: \`npm run dev\`
4. Open http://localhost:3000

## Key Components

- **CartContext** - Global cart state management
- **ProductCard** - Reusable product display component
- **ShoppingCartSidebar** - Sliding cart panel
- **FilterBar** - Product filtering and sorting
- **Header** - Navigation with search and cart

## Performance Features

- Loading skeletons for better UX
- Optimized re-renders with React hooks
- localStorage caching
- Responsive images

## Future Enhancements

- Backend API integration
- User authentication
- Payment processing
- Product reviews
- Wishlist functionality

  <!-- **************************** -->
  <!-- **************************** -->
  <!-- **************************** -->

  This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
