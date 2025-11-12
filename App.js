import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import TrackOrderScreen from './src/screens/TrackOrderScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const navigate = (screen, params = {}) => {
    // Update screen immediately without animation
    if (params.restaurant) setSelectedRestaurant(params.restaurant);
    if (params.cart) setCart(params.cart);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    let targetScreen = 'Home';
    if (currentScreen === 'Restaurant') targetScreen = 'Home';
    else if (currentScreen === 'Cart') targetScreen = 'Restaurant';
    else if (currentScreen === 'Search') targetScreen = 'Home';
    else if (currentScreen === 'Favorites') targetScreen = 'Profile';
    else if (currentScreen === 'TrackOrder') targetScreen = 'Orders';
    
    setCurrentScreen(targetScreen);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{ navigate }} />;
      case 'Restaurant':
        return <RestaurantScreen navigation={{ navigate, goBack }} route={{ params: { restaurant: selectedRestaurant } }} />;
      case 'Cart':
        return <CartScreen navigation={{ navigate, goBack }} route={{ params: { cart, restaurant: selectedRestaurant } }} />;
      case 'Orders':
        return <OrdersScreen navigation={{ navigate }} />;
      case 'Profile':
        return <ProfileScreen navigation={{ navigate }} />;
      case 'Search':
        return <SearchScreen navigation={{ navigate, goBack }} />;
      case 'Favorites':
        return <FavoritesScreen navigation={{ navigate, goBack }} />;
      case 'TrackOrder':
        return <TrackOrderScreen navigation={{ navigate, goBack }} />;
      default:
        return <HomeScreen navigation={{ navigate }} />;
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      {renderScreen()}
    </>
  );
}
