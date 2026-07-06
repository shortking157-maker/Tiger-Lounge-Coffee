# Tiger Lounge Coffee - Customer Application

A modern, responsive coffee shop ordering application built with React, Vite, and Supabase.

## Features

✨ **Customer-Facing Features**
- 🏠 Home page with hero section and features showcase
- ☕ Interactive menu with categories and search
- 🛒 Shopping cart with quantity management
- 💳 Checkout with customer information
- 📍 Real-time order tracking
- 📱 Fully responsive design
- 🎨 Modern UI with glassmorphism effects
- ✨ Smooth animations with Framer Motion

## Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 10.16
- **Routing**: React Router DOM 6.20
- **Icons**: Lucide React 0.292
- **Backend**: Supabase 2.38
- **Package Manager**: npm

## Project Structure

```
tiger-lounge-coffee/
├── src/
│   ├── components/
│   │   └── customer/
│   │       └── Navbar.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   └── customer/
│   │       ├── Home.jsx
│   │       ├── Menu.jsx
│   │       ├── Cart.jsx
│   │       ├── Checkout.jsx
│   │       └── OrderTracking.jsx
│   ├── config/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/shortking157-maker/tiger-lounge-coffee.git
cd tiger-lounge-coffee
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
Create a `.env.local` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Database Schema

The application uses the following Supabase tables:

### Categories
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text)
- `created_at` (Timestamp)

### Products
- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text)
- `price` (Numeric)
- `category_id` (UUID, Foreign Key)
- `is_active` (Boolean)
- `created_at` (Timestamp)

### Orders
- `id` (UUID, Primary Key)
- `order_number` (Text)
- `table_number` (Integer)
- `table_id` (Integer)
- `customer_name` (Text)
- `customer_phone` (Text)
- `total_price` (Numeric)
- `order_time` (Text)
- `status` (Text)
- `date` (Date)
- `created_at` (Timestamp)

### Order Items
- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key)
- `product_id` (UUID, Foreign Key)
- `quantity` (Integer)
- `price` (Numeric)
- `created_at` (Timestamp)

## Available Routes

- `/` - Home page
- `/menu` - Menu with products
- `/cart` - Shopping cart
- `/checkout` - Order checkout
- `/tracking` - Order tracking

## Key Components

### Navbar
Navigation component with:
- Logo and branding
- Navigation links
- Cart badge with item count
- Responsive mobile menu

### Cart Context
Global state management for:
- Cart items
- Add/remove items
- Update quantities
- Persist cart to localStorage

### Pages

**Home**
- Hero section
- Features showcase
- Call-to-action buttons

**Menu**
- Category filtering
- Product search
- Add to cart functionality

**Cart**
- View cart items
- Adjust quantities
- Remove items
- View total

**Checkout**
- Customer information form
- Order summary
- Order confirmation

**Order Tracking**
- Real-time order status
- Order details
- Estimated time

## Styling

The application uses:
- **Tailwind CSS** for utility-first CSS
- **Custom CSS variables** for consistent theming
- **Glassmorphism** effects for modern UI
- **Responsive design** for all screen sizes

### Color Scheme
- **Dark**: #0f0f0f
- **Dark Secondary**: #1a1a1a
- **Gold**: #d4af37
- **Gold Light**: #e5c158
- **White Primary**: #ffffff
- **White Secondary**: #b0b0b0

## Animations

- Fade-in effects
- Slide-in transitions
- Scale animations
- Smooth hover states
- Loading spinners

## Development

### Linting
```bash
npm run lint
```

### Code Standards
- ES6+ JavaScript
- React Hooks for state management
- Functional components
- CSS-in-JS with Tailwind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Vite for fast development and optimized builds
- Code splitting with React Router
- Lazy loading of components
- Optimized images and assets
- CSS minification and optimization

## Security

- Environment variables for sensitive data
- Supabase authentication and authorization
- Input validation and sanitization
- HTTPS-only communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please contact shortking157@gmail.com

## Roadmap

- [ ] Admin dashboard
- [ ] User authentication
- [ ] Payment integration
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics

---

**Tiger Lounge Coffee** - Bringing premium coffee experience to your table ☕