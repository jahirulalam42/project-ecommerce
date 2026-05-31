# Project E-Commerce

A modern and scalable e-commerce application built with **Next.js 15**, **React 19**, **TypeScript**, **MongoDB**, and **NextAuth**.

The project focuses on delivering a fast, responsive, and user-friendly shopping experience while following modern development practices and clean architecture.

---

## Tech Stack

### Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ShadCN UI
- Radix UI
- Lucide React

### State Management

- Redux Toolkit
- React Redux

### Backend & Database

- Next.js API Routes
- MongoDB
- NextAuth.js v5

### Validation & Forms

- Zod
- TanStack React Form

### Additional Tools

- Axios
- Sonner
- Embla Carousel
- Vaul

---

## Features

### Authentication

- User Registration
- User Login
- Protected Routes
- Session Management with NextAuth

### Shopping Experience

- Product Listing
- Product Details Page
- Category Browsing
- Responsive Design
- Dark / Light Theme Support

### Development Features

- Type-Safe Development
- Reusable Components
- Clean Project Structure
- Form Validation
- API Integration
- MongoDB Integration

---

## Project Structure

```text
src/
├── app/
├── components/
├── hooks/
├── lib/
├── features/
├── store/
└── utils/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/jahirulalam42/project-ecommerce.git
```

### Navigate to Project

```bash
cd project-ecommerce
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_secret_key
AUTH_URL=http://localhost:3000
```

---

## Running the Application

### Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

---

## Responsive Design

The application is optimized for:

- Desktop
- Tablet
- Mobile Devices

---

## Security

- Secure Authentication
- Protected Routes
- Session-Based Access Control
- Input Validation using Zod

---

## Deployment

Deploy easily on Vercel:

```bash
npm run build
```

Configure your environment variables in the deployment platform before publishing.

---

## Future Enhancements

- Wishlist Functionality
- Product Reviews & Ratings
- Payment Gateway Integration with Stripe
<!-- * Order Tracking -->
- Admin Dashboard
- Inventory Management
- Email Notifications

---

## Author

**Jahirul Alam**

GitHub: https://github.com/jahirulalam42
