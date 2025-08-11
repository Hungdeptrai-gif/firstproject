# The Luvin Gifts Clone

A React-based e-commerce application for personalized Lego art gifts, inspired by [The Luvin Gifts](https://theluvingifts.vercel.app/).

## Features

### 🎨 Product Customization
- **Step-by-step customization process** with 8 different steps
- **Version selection** (Version 1, 2, 3 with different pricing)
- **Background customization** (White, Blue, Pink, Custom backgrounds)
- **Clothing options** (Different shirt colors and styles)
- **Face customization** (Multiple face options)
- **Hairstyle selection** (Short, Long, Curly, Ponytail)
- **Hat options** (Baseball cap, Beanie, Bucket hat, Fedora)
- **Accessories** (Sunglasses, Bag, Watch, Bracelet, Necklace)
- **Pet companions** (Dog, Cat, Rabbit, Bird)

### 🛒 Shopping Cart
- **Real-time cart management** with quantity controls
- **Price calculation** including customization costs
- **Cart persistence** using React Context
- **Remove items** functionality

### 📝 Order Management
- **Customer information form** with validation
- **Delivery date selection**
- **Order summary** with total pricing
- **Success confirmation** page

### 🎯 User Experience
- **Responsive design** for mobile and desktop
- **Modern UI** with glassmorphism effects
- **Smooth animations** and transitions
- **Vietnamese language** support
- **Intuitive navigation**

## Technology Stack

- **React 19.1.1** - Frontend framework
- **React Router DOM 6.22.0** - Client-side routing
- **Styled Components 6.1.8** - CSS-in-JS styling
- **React Icons 5.0.1** - Icon library
- **Firebase 12.1.0** - Backend services (configured but not implemented)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd theluvingifts-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Home.js         # Landing page
│   ├── ProductCustomizer.js  # Product customization interface
│   ├── Cart.js         # Shopping cart
│   ├── OrderForm.js    # Order form
│   └── Success.js      # Order success page
├── context/            # React Context
│   └── CartContext.js  # Shopping cart state management
├── data/               # Static data
│   └── products.js     # Product and customization options
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # App entry point
```

## Features in Detail

### Product Customization Flow
1. **Version Selection** - Choose from 3 different versions (230k₫ - 245k₫)
2. **Background Selection** - Customize the background (0₫ - 15k₫)
3. **Clothing Selection** - Choose shirt style and color (0₫ - 5k₫)
4. **Face Selection** - Select character face (Free)
5. **Hairstyle Selection** - Choose hair style (+25k₫)
6. **Hat Selection** - Add hat accessories (+15k₫)
7. **Accessories** - Add multiple accessories (+10k₫ - 20k₫ each)
8. **Pet Companions** - Add pet companions (+15k₫ - 20k₫ each)

### Pricing Structure
- **Base price**: 230,000₫ - 245,000₫ (depending on version)
- **Customization costs**: 0₫ - 100,000₫+ (depending on selections)
- **Shipping**: 25,000₫ (standard) or 37,000₫+ (express)

### Order Process
1. **Customize product** through 8-step process
2. **Add to cart** with real-time price calculation
3. **Review cart** and adjust quantities
4. **Fill order form** with customer information
5. **Submit order** and receive confirmation
6. **Contact shop** via social media for order confirmation

## Design Features

### Visual Design
- **Glassmorphism effects** with backdrop blur
- **Gradient backgrounds** with purple/blue theme
- **Smooth animations** and hover effects
- **Responsive grid layouts**
- **Modern typography** and spacing

### User Interface
- **Step-by-step wizard** for product customization
- **Real-time preview** of product selections
- **Interactive cart** with quantity controls
- **Form validation** with error messages
- **Success feedback** with order details

## Future Enhancements

- [ ] **Backend integration** with Firebase
- [ ] **User authentication** and account management
- [ ] **Order history** and tracking
- [ ] **Payment integration** (VNPay, Momo, etc.)
- [ ] **Admin dashboard** for order management
- [ ] **Image upload** for custom backgrounds
- [ ] **Product reviews** and ratings
- [ ] **Email notifications** for order updates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [The Luvin Gifts](https://theluvingifts.vercel.app/)
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/)
- Styling with [Styled Components](https://styled-components.com/)

## Contact

For questions or support, please contact:
- **Zalo**: 0964.393.115
- **Facebook**: theluvingifts
- **Instagram**: the_luvin