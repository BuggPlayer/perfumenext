# PerfumeLux - Premium Fragrance E-commerce Website

A modern, responsive e-commerce website built with Next.js, TypeScript, Redux Toolkit, and TailwindCSS for selling premium perfumes and fragrances.

## 🚀 Features

### Core E-commerce Features
- **Product Catalog**: Browse and search through premium fragrances
- **Advanced Filtering**: Filter by category, brand, price range, and rating
- **Shopping Cart**: Add/remove items, update quantities, persistent storage
- **Wishlist**: Save favorite products for later
- **User Authentication**: User registration, login, and profile management
- **Order Management**: Track order status and history
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Technical Features
- **Next.js 14**: App Router with TypeScript
- **Redux Toolkit**: State management with persistence
- **TailwindCSS**: Utility-first CSS framework
- **ESLint**: Code quality and consistency
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Performance**: Optimized images, lazy loading, and efficient rendering

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Redux Toolkit, Redux Persist
- **Styling**: TailwindCSS, CSS Modules
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

## 📁 Project Structure

```
perfume/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── products/          # Products page
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── home/             # Homepage components
│   │   ├── products/         # Product-related components
│   │   ├── cart/             # Shopping cart components
│   │   └── providers/        # Context providers
│   ├── store/                # Redux store configuration
│   │   ├── store.ts          # Store setup
│   │   ├── hooks.ts          # Redux hooks
│   │   └── slices/           # Redux slices
│   ├── data/                 # Demo data and constants
│   └── lib/                  # Utility functions
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd perfume
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

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🏗️ Architecture Overview

### State Management
The application uses Redux Toolkit for centralized state management with the following slices:

- **Auth Slice**: User authentication and profile data
- **Product Slice**: Product catalog, filtering, and search
- **Cart Slice**: Shopping cart functionality
- **Wishlist Slice**: User's favorite products
- **Order Slice**: Order management and history

### Component Architecture
- **Layout Components**: Header, Footer, Navigation
- **UI Components**: Button, Card, Input (reusable base components)
- **Feature Components**: ProductCard, CartSidebar, HeroSection
- **Page Components**: Homepage, Products page

### Data Flow
1. **Demo Data**: Currently uses static demo data for development
2. **State Updates**: User interactions trigger Redux actions
3. **UI Updates**: Components re-render based on state changes
4. **Persistence**: Cart and wishlist data persists across sessions

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Pink (#EC4899) gradient
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Blue and yellow for highlights
- **Success**: Green for positive actions
- **Error**: Red for errors and destructive actions

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability
- **Responsive**: Scalable font sizes across devices

### Components
- **Cards**: Consistent spacing and shadows
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Forms**: Accessible input fields with focus states
- **Navigation**: Sticky header with smooth transitions

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Touch-friendly interactions
- Optimized navigation for small screens
- Collapsible filters and menus
- Swipe gestures for mobile users

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

### TailwindCSS Configuration
Custom configuration in `tailwind.config.js`:
- Custom color palette
- Extended spacing and typography
- Component-specific utilities

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deployment Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative with good Next.js support
- **AWS/GCP**: For enterprise deployments

## 🔮 Future Enhancements

### Planned Features
- **Backend Integration**: Connect to your Express.js backend
- **Payment Processing**: Stripe integration for checkout
- **User Reviews**: Product rating and review system
- **Inventory Management**: Real-time stock updates
- **Analytics**: User behavior tracking and insights
- **Multi-language**: Internationalization support
- **Dark Mode**: Theme switching capability

### Performance Optimizations
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for better performance
- **Caching**: Service worker for offline functionality
- **SEO**: Meta tags and structured data

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint configuration
2. **TypeScript**: Use strict typing for all components
3. **Component Structure**: Follow established patterns
4. **Testing**: Add tests for new features
5. **Documentation**: Update README for significant changes

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Build Errors**: Check Node.js version and dependencies
- **Styling Issues**: Verify TailwindCSS configuration
- **State Management**: Check Redux DevTools for debugging

### Getting Help
- Check existing issues in the repository
- Create a new issue with detailed description
- Include error messages and reproduction steps

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Redux Team**: For state management solutions
- **TailwindCSS**: For the utility-first CSS framework
- **Lucide**: For beautiful icon set

---

**Built with ❤️ using modern web technologies**
