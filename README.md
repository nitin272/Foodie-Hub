# FoodieHub 🍔

A modern food delivery app built with React Native and Expo.

## Features

- 🏠 Browse restaurants by category
- 🍕 View restaurant menus with detailed items
- 🛒 Add items to cart
- 📦 Track your orders
- 👤 User profile management
- 💳 Order checkout with bill details

## Project Structure

```
FoodieHub/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js       # Main screen with restaurant list
│   │   ├── RestaurantScreen.js # Restaurant menu and items
│   │   ├── CartScreen.js       # Shopping cart and checkout
│   │   ├── OrdersScreen.js     # Order history
│   │   └── ProfileScreen.js    # User profile
│   └── navigation/
│       └── AppNavigator.js     # Navigation setup
├── App.js                      # Main app entry
└── package.json
```

## Getting Started

### Prerequisites
- Node.js installed
- Expo CLI (will be installed automatically)

### Installation

1. Navigate to the project directory:
```bash
cd FoodieHub
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

Then choose your platform:
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Press `w` for web browser
- Scan QR code with Expo Go app on your phone

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
  - Bottom Tabs Navigator
  - Native Stack Navigator

## Color Scheme

- Primary: `#FF6B6B` (Coral Red)
- Background: `#f8f8f8` (Light Gray)
- Text: `#333` (Dark Gray)
- Secondary Text: `#666` (Medium Gray)

## Next Steps

To enhance the app, consider adding:
- Backend API integration
- User authentication
- Real-time order tracking
- Payment gateway integration
- Push notifications
- Restaurant search and filters
- User reviews and ratings
- Favorites functionality
