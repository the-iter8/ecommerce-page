# E-Commerce App

Modern full-stack e-commerce platform with advanced filtering, cart management, checkout flow, and admin capabilities.

## Overview

Production-ready e-commerce application demonstrating modern React patterns, state management with Redux Saga, and clean architecture principles. Features server-side product filtering, real-time cart updates, multi-step checkout, payment processing, and admin order management.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **State Management:** Redux Toolkit + Redux Saga
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Internationalization:** i18next
- **Package Manager:** pnpm

## Quick Start

Install dependencies with `pnpm install`, then run `pnpm dev` for development server at localhost:5173. Build production with `pnpm build`.

## Application Routes

| Route              | Component      | Description                   |
| ------------------ | -------------- | ----------------------------- |
| `/`                | ProductsPage   | Product listing with filters  |
| `/cart`            | CartPage       | Shopping cart view            |
| `/checkout`        | CheckoutPage   | Multi-step checkout form      |
| `/payment`         | PaymentPage    | Payment processing            |
| `/payment/success` | PaymentSuccess | Order confirmation            |
| `/admin`           | AdminDashboard | Order management (admin only) |

All routes use lazy loading for optimal bundle splitting.

## Core Features

### Product Browsing

- Category filtering
- Price range filtering (min/max)
- Search functionality
- Sorting options (price low-high, featured)
- Server-side pagination
- Product detail view with specifications
- Responsive grid layout

### Cart Management

- Add/remove items
- Quantity control with stock validation
- Discount code application
- Cart sidebar accessible from any page
- Cart state synchronized with backend
- Auto-calculated subtotal, discount, and total

### Checkout Flow

- Multi-step form (shipping → payment)
- Client-side validation
- Order creation and backend processing
- Order confirmation page

### Admin Dashboard

- View all orders with status filters
- Expandable order details
- Update order status
- Search orders

### Technical Features

- Full TypeScript coverage
- Error boundaries with user feedback
- Loading states (skeleton screens, spinners)
- Empty states with meaningful placeholders
- Mobile-first responsive design
- Route-based code splitting
- Optimized production builds

## Architecture

### Data Flow Pattern

Unidirectional data flow: User Action → Redux Dispatch → Saga Intercepts → API Call → Redux Update → UI Re-render

**Process:**

1. User clicks "Add to Cart"
2. Component dispatches action
3. Saga intercepts and calls API
4. API response updates Redux store
5. Components re-render with new state

### State Management Philosophy

- **Redux Store:** Server data, shared state, authentication
- **Component State:** Local UI state (forms, toggles)
- **Derived State:** Computed values via useMemo
- **Sagas Only:** All async operations in sagas (no thunks)

### Folder Structure

- **pages/** - Feature modules (products, cart, checkout, payment, admin)
- **store/** - Redux state management with slices and sagas
- **apis/** - HTTP services for backend communication
- **components/** - Shared reusable components
- **routes/** - Router configuration
- **hooks/** - Custom hooks
- **types/** - TypeScript definitions
- **utils/** - Utility functions
- **config/** - App configuration

### Module Pattern

Each feature follows consistent structure:

- Main component (index.tsx)
- Feature-specific components
- Sub-pages (views/)
- Custom hooks
- Constants

### Redux Patterns

**Slice:** Defines state shape and synchronous reducers  
**Saga:** Handles async operations (API calls, side effects)  
**API Layer:** Isolated HTTP calls, separated from business logic

**Flow:** Component dispatches action → Saga watches → Saga calls API → API returns data → Saga updates store → Component receives updated state

### Module Isolation

Each feature is self-contained:

- No cross-feature imports (except shared components)
- Independent deletion (remove folder = remove feature)
- Predictable structure (same pattern everywhere)

## API Integration

### Environment Setup

Set backend URL in `.env` file using `VITE_API_BASE_URL` variable.

### Backend Endpoints

| Method | Endpoint            | Purpose                    |
| ------ | ------------------- | -------------------------- |
| GET    | `/products`         | List products with filters |
| GET    | `/products/:id`     | Product details            |
| GET    | `/cart`             | Get cart items             |
| POST   | `/cart`             | Add to cart                |
| PUT    | `/cart/:id`         | Update quantity            |
| DELETE | `/cart/:id`         | Remove from cart           |
| POST   | `/orders`           | Create order               |
| GET    | `/admin/orders`     | List orders (admin)        |
| PUT    | `/admin/orders/:id` | Update order status        |

### Product Filters

Query parameters for products endpoint:

- **category** - Filter by category
- **minPrice** - Minimum price
- **maxPrice** - Maximum price
- **sortBy** - Sort order (price-low, price-high, featured)
- **page** - Page number (1-indexed)
- **limit** - Items per page

## Type System

### Core Interfaces

**Product:** ID, name, description, price, category, image URL, stock quantity, optional featured flag

**CartItem:** ID, product reference, quantity, price

**Order:** ID, items array, total amount, status (pending/processing/shipped/delivered), shipping address, creation timestamp

## Development Guidelines

### Best Practices ✅

- Feature-based folder structure
- Redux for server/shared state
- Sagas for async operations
- Tailwind for all styling
- Explicit TypeScript types
- Error boundaries on pages
- Loading and empty states
- Typed Redux hooks

### Avoid ❌

- API calls in components
- Redux thunks
- Class components
- Inline styles
- SCSS/CSS modules
- Magic strings
- Ignored TypeScript errors

## Styling Approach

- Tailwind utility classes only
- classnames library for conditional styling
- Mobile-first responsive design
- No custom CSS/SCSS files

## Performance Optimizations

- Route-based lazy loading
- Bundle splitting and tree-shaking
- Image lazy loading
- Redux state caching
- Input debouncing (search/filters)
- Memoized computations

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) and mobile browsers (iOS Safari, Chrome Android)

## Project Philosophy

Feature-based architecture ensures self-contained modules, easy feature addition/removal, clear code organization, reduced coupling, and team scalability.

## Available Scripts

- **pnpm dev** - Development server (localhost:5173)
- **pnpm build** - Production build
- **pnpm preview** - Preview production build
- **pnpm lint** - Run ESLint

## License

MIT
