# Perfume E-commerce Website Architecture

## Overview

This is a comprehensive, modern e-commerce website built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. The architecture emphasizes reusability, consistency, and maintainability through a well-structured component system, comprehensive theming, and proper state management.

## 🏗️ Architecture Overview

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Input, etc.)
│   ├── search/         # Search and filtering components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── home/           # Home page specific components
│   ├── products/       # Product related components
│   ├── cart/           # Cart related components
│   ├── auth/           # Authentication components
│   └── account/        # User account components
├── redux/              # State management
│   ├── features/       # Redux slices
│   ├── store.ts        # Redux store configuration
│   └── hooks.ts        # Redux hooks
├── services/           # API services
├── theme/              # Design system and theming
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## 🎨 Design System & Theming

### Theme Configuration (`src/theme/index.ts`)

The theme system provides a comprehensive design token system including:

- **Colors**: Primary, secondary, success, warning, error, and neutral color palettes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
- **Border Radius**: Standardized border radius values
- **Shadows**: Elevation and depth through shadow system
- **Transitions**: Consistent animation durations
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering system for components

### Usage

```typescript
import { theme } from '@/theme';

// Access theme values
const primaryColor = theme.colors.primary[500];
const spacing = theme.spacing.lg;
const borderRadius = theme.borderRadius.lg;
```

## 🧩 Reusable UI Components

### Core Components

#### Button (`src/components/ui/Button.tsx`)
- Multiple variants: primary, secondary, outline, ghost, danger, success
- Multiple sizes: xs, sm, md, lg, xl
- Loading states with spinners
- Icon support (left/right)
- Full-width option
- Rounded variants

```typescript
import { Button } from '@/components/ui';

<Button 
  variant="primary" 
  size="lg" 
  isLoading={loading}
  leftIcon={<Icon />}
>
  Click Me
</Button>
```

#### Card (`src/components/ui/Card.tsx`)
- Multiple variants: default, elevated, outlined, filled
- Configurable padding: none, sm, md, lg, xl
- Hoverable option with animations
- Header, body, and footer sections

```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card variant="elevated" padding="lg" hoverable>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

#### Input (`src/components/ui/Input.tsx`)
- Multiple variants: default, outlined, filled
- Multiple sizes: sm, md, lg
- Label, helper text, and error states
- Icon support (left/right)
- Full-width option

```typescript
import { Input } from '@/components/ui';

<Input
  label="Email"
  variant="outlined"
  size="lg"
  leftIcon={<EmailIcon />}
  error="Invalid email"
  helperText="Enter your email address"
/>
```

#### Badge (`src/components/ui/Badge.tsx`)
- Multiple variants: primary, secondary, success, warning, error, info
- Multiple sizes: sm, md, lg
- Rounded option

```typescript
import { Badge } from '@/components/ui';

<Badge variant="success" size="md" rounded>
  Active
</Badge>
```

#### Modal (`src/components/ui/Modal.tsx`)
- Multiple sizes: sm, md, lg, xl, full
- Backdrop click to close
- Escape key to close
- Customizable header and close button
- Portal rendering for proper z-index handling

```typescript
import { Modal } from '@/components/ui';

<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  title="Confirmation"
  size="md"
>
  Modal content here
</Modal>
```

#### Skeleton (`src/components/ui/Skeleton.tsx`)
- Multiple variants: text, circular, rectangular, rounded
- Configurable dimensions and animations
- Specialized components: SkeletonCard, SkeletonTable, SkeletonForm
- Loading state placeholders for better UX

```typescript
import { Skeleton, SkeletonCard, SkeletonProductGrid } from '@/components/ui';

// Basic skeleton
<Skeleton variant="text" height={20} width="100%" />

// Product grid skeleton
<SkeletonProductGrid items={8} />

// Card skeleton
<SkeletonCard />
```

#### Notification (`src/components/ui/Notification.tsx`)
- Multiple types: success, error, warning, info
- Auto-dismiss with configurable duration
- Action buttons and persistent notifications
- Multiple positioning options
- Toast component for simple messages

```typescript
import { NotificationContainer, Toast } from '@/components/ui';

// Show notification
window.showNotification({
  type: 'success',
  title: 'Success!',
  message: 'Your order has been placed.',
  duration: 5000,
});

// Show toast
<Toast type="success" message="Item added to cart" />
```

### Search & Filtering Components

#### SearchBar (`src/components/search/SearchBar.tsx`)
- Real-time search suggestions
- Keyboard navigation support
- Search history tracking
- Auto-complete functionality
- Clear search option

```typescript
import { SearchBar } from '@/components/search';

<SearchBar
  placeholder="Search for perfumes..."
  showSuggestions={true}
  onSearch={(query) => console.log('Searching:', query)}
/>
```

#### AdvancedFilters (`src/components/search/AdvancedFilters.tsx`)
- Category, brand, and price filtering
- Rating and availability filters
- Collapsible filter sections
- Active filter display
- Clear all filters option

```typescript
import { AdvancedFilters } from '@/components/search';

<AdvancedFilters
  showFilters={true}
  onToggleFilters={() => setShowFilters(!showFilters)}
/>
```

## 🔄 State Management (Redux Toolkit)

### Store Structure

The Redux store is organized into feature-based slices:

- **auth**: User authentication and profile management
- **products**: Product catalog, search, and filtering
- **cart**: Shopping cart management
- **orders**: Order management and tracking
- **wishlist**: User wishlist management
- **home**: Home page content and banners

### Key Features

- **Async Thunks**: Proper async operation handling
- **Error Handling**: Comprehensive error state management
- **Loading States**: Loading indicators for all async operations
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Persistence**: Cart and wishlist data persistence

### Usage Example

```typescript
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart } from '@/redux/features';
import { RootState } from '@/redux/store';

const Component = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) return <SkeletonProductGrid />;

  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
```

## 🌐 API Services

### Service Architecture

- **Base API Client**: Axios-based with interceptors
- **Service Modules**: Domain-specific services (products, auth, orders, payments, recommendations)
- **Error Handling**: Centralized error handling and user feedback
- **Request/Response Interceptors**: Authentication, logging, and error handling
- **Type Safety**: Full TypeScript support for API responses

### Core Services

#### Product Service (`src/services/productService.ts`)
- Product CRUD operations
- Search and filtering
- Category and brand management
- Product reviews and ratings

#### Auth Service (`src/services/authService.ts`)
- User authentication and registration
- Profile management
- Password operations
- Token management

#### Payment Service (`src/services/paymentService.ts`)
- Payment processing with Stripe
- Payment method management
- Refund handling
- Webhook processing
- Card validation utilities

#### Recommendation Service (`src/services/recommendationService.ts`)
- Personalized product recommendations
- Related products
- Trending items
- User behavior tracking
- Collaborative filtering

### Service Example

```typescript
import { productService, paymentService, recommendationService } from '@/services';

// Fetch products with filters
const products = await productService.getProducts({
  category: 'mens-fragrances',
  minPrice: 50,
  maxPrice: 200,
  sort: { field: 'price', order: 'asc' },
  page: 1,
  limit: 12
});

// Process payment
const payment = await paymentService.processPayment(
  paymentMethodId,
  amount,
  'usd'
);

// Get recommendations
const recommendations = await recommendationService.getPersonalizedRecommendations(
  userId,
  10
);
```

## 🔍 Search & Discovery Features

### Advanced Search System

- **Real-time Search**: Instant search suggestions as you type
- **Smart Filtering**: Category, brand, price, rating, and availability filters
- **Search History**: Track and display recent searches
- **Auto-complete**: Intelligent search suggestions
- **Filter Persistence**: Maintain filter state across sessions

### Product Recommendations

- **Personalized**: Based on user behavior and preferences
- **Related Products**: Similar items and complementary products
- **Trending**: Popular and rising products
- **Seasonal**: Time-based recommendations
- **Collaborative**: Based on similar user preferences

## 💳 Payment Integration

### Stripe Integration

- **Payment Processing**: Secure credit card processing
- **Multiple Payment Methods**: Cards, digital wallets
- **Webhook Handling**: Real-time payment status updates
- **Refund Management**: Automated and manual refunds
- **Security**: PCI compliance and fraud protection

### Payment Features

- **Payment Intents**: Secure payment authorization
- **Saved Payment Methods**: User payment method storage
- **Subscription Support**: Recurring payments
- **Multi-currency**: International payment support
- **Payment Analytics**: Transaction tracking and reporting

## 📱 User Experience Enhancements

### Loading States

- **Skeleton Components**: Placeholder content during loading
- **Progressive Loading**: Load content in stages
- **Loading Indicators**: Clear feedback for user actions
- **Optimistic Updates**: Immediate UI feedback

### Error Handling

- **User-Friendly Messages**: Clear error explanations
- **Retry Mechanisms**: Easy recovery from failures
- **Fallback UI**: Graceful degradation
- **Error Boundaries**: Prevent app crashes

### Notifications

- **Toast Messages**: Quick feedback for actions
- **Persistent Notifications**: Important information display
- **Action Notifications**: Interactive notifications with buttons
- **Positioning Options**: Multiple notification locations

## 🎯 Component Patterns

### Consistent Styling

All components use the theme system for consistent styling:

```typescript
// Consistent color usage
className="bg-primary-500 text-white hover:bg-primary-600"

// Consistent spacing
className="p-4 m-2 space-y-4"

// Consistent transitions
className="transition-all duration-200 ease-in-out"
```

### Responsive Design

Components are built with responsive design in mind:

```typescript
// Responsive classes
className="
  text-sm md:text-base lg:text-lg
  p-2 md:p-4 lg:p-6
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
"
```

### Accessibility

Components include proper accessibility features:

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader support
- High contrast support

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Building

```bash
npm run build
npm start
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **xs**: 340px (very small devices)
- **sm**: 450px (small mobile)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)
- **2xl**: 1536px (extra large screens)

## 🎨 Customization

### Adding New Components

1. Create component in appropriate directory
2. Use theme tokens for styling
3. Export from `src/components/ui/index.ts`
4. Add TypeScript interfaces
5. Include proper accessibility features

### Adding New Redux Features

1. Create slice in `src/redux/features/`
2. Add to store configuration
3. Export actions and types
4. Update `src/redux/features/index.ts`

### Adding New API Services

1. Create service in `src/services/`
2. Use base API client
3. Add proper TypeScript interfaces
4. Include error handling

## 🔧 Best Practices

### Component Development

- Use theme tokens for all styling
- Implement proper TypeScript interfaces
- Include loading and error states
- Add proper accessibility features
- Use consistent naming conventions

### State Management

- Use async thunks for API calls
- Implement proper loading states
- Handle errors gracefully
- Use optimistic updates where appropriate
- Maintain clean state structure

### API Integration

- Use service layer abstraction
- Implement proper error handling
- Add request/response interceptors
- Use TypeScript for type safety
- Handle loading states properly

### Search & Discovery

- Implement debounced search
- Provide clear search feedback
- Use progressive enhancement
- Optimize for performance
- Track search analytics

### Payment Processing

- Implement proper error handling
- Use secure payment methods
- Provide clear payment feedback
- Handle edge cases gracefully
- Follow PCI compliance guidelines

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Stripe Documentation](https://stripe.com/docs)

## 🤝 Contributing

1. Follow the established architecture patterns
2. Use theme tokens for styling
3. Implement proper TypeScript interfaces
4. Add comprehensive error handling
5. Include loading states
6. Follow accessibility guidelines
7. Add proper documentation
8. Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License.
