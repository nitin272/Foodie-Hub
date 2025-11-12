# FoodieHub - Project Structure

## 📁 Directory Layout

```
FoodieHub/
│
├── src/
│   ├── screens/              # All app screens
│   │   ├── HomeScreen.js     # Main landing page with restaurants
│   │   ├── RestaurantScreen.js  # Individual restaurant menu
│   │   ├── CartScreen.js     # Shopping cart & checkout
│   │   ├── OrdersScreen.js   # Order history
│   │   └── ProfileScreen.js  # User profile & settings
│   │
│   ├── navigation/           # Navigation configuration
│   │   └── AppNavigator.js   # Main navigation setup
│   │
│   └── constants/            # Reusable constants
│       ├── colors.js         # Color palette
│       └── data.js           # Mock data
│
├── assets/                   # Images, fonts, icons
├── App.js                    # Root component
├── app.json                  # Expo configuration
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## 🎯 Screen Flow

```
HomeTabs (Bottom Navigation)
├── Home → RestaurantScreen → CartScreen
├── Orders
└── Profile
```

## 🎨 Design System

### Colors
- Primary: `#FF6B6B` (Coral Red)
- Background: `#f8f8f8`
- Text: `#333`, `#666`, `#999`

### Typography
- Headers: 28px, bold
- Titles: 20-24px, bold
- Body: 14-16px, regular
- Small: 13-14px, light

## 🔧 Key Features by Screen

### HomeScreen
- Restaurant browsing
- Category filters
- Search functionality
- Promotional banners

### RestaurantScreen
- Menu display by category
- Add to cart functionality
- Restaurant info header
- Cart preview footer

### CartScreen
- Item list with prices
- Bill breakdown (subtotal, delivery, tax)
- Delivery address
- Checkout button

### OrdersScreen
- Order history
- Status tracking
- Order details

### ProfileScreen
- User information
- Order statistics
- Settings menu
- Logout option

## 📦 Dependencies

- `@react-navigation/native` - Navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/native-stack` - Stack navigation
- `react-native-screens` - Native screen support
- `react-native-safe-area-context` - Safe area handling

## 🚀 Running the App

```bash
# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```
