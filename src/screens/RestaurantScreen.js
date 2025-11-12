import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';

export default function RestaurantScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('Popular');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Popular', description: 'Fresh mozzarella, tomato sauce, basil', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', calories: 850 },
    { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'Popular', description: 'Pepperoni, mozzarella, tomato sauce', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', calories: 920 },
    { id: 3, name: 'Caesar Salad', price: 8.99, category: 'Salads', description: 'Romaine lettuce, parmesan, croutons', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80', calories: 320 },
    { id: 4, name: 'Garlic Bread', price: 5.99, category: 'Sides', description: 'Toasted bread with garlic butter', image: 'https://images.unsplash.com/photo-1573140401552-388e3c0b1f6e?w=400&q=80', calories: 280 },
    { id: 5, name: 'Tiramisu', price: 6.99, category: 'Desserts', description: 'Classic Italian coffee dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', calories: 450 },
    { id: 6, name: 'Coca Cola', price: 2.99, category: 'Drinks', description: 'Chilled soft drink', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80', calories: 140 },
  ];

  const categories = ['Popular', 'Salads', 'Sides', 'Desserts', 'Drinks'];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImage}>
        <Image 
          source={{ uri: restaurant.image }}
          style={styles.restaurantImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
        
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant Info */}
      <Animated.View style={[styles.infoCard, { opacity: fadeAnim }]}>
        <View style={styles.infoHeader}>
          <View style={styles.infoLeft}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
            <View style={styles.tagsRow}>
              {restaurant.tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>★</Text>
            <Text style={styles.statValue}>{restaurant.rating}</Text>
            <Text style={styles.statLabel}>({restaurant.reviews})</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⏱</Text>
            <Text style={styles.statValue}>{restaurant.deliveryTime}</Text>
            <Text style={styles.statLabel}>mins</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📍</Text>
            <Text style={styles.statValue}>{restaurant.distance}</Text>
          </View>
        </View>
      </Animated.View>

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category}
              style={[
                styles.tab,
                activeTab === category && styles.tabActive,
              ]}
              onPress={() => setActiveTab(category)}
            >
              <Text style={[
                styles.tabText,
                activeTab === category && styles.tabTextActive,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <ScrollView 
        style={styles.menuScroll}
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.filter(item => activeTab === 'Popular' || item.category === activeTab).map((item) => (
          <Animated.View key={item.id} style={[styles.menuItem, { opacity: fadeAnim }]}>
            <Image 
              source={{ uri: item.image }}
              style={styles.menuItemImage}
              resizeMode="cover"
            />
            <View style={styles.menuItemInfo}>
              <Text style={styles.menuItemName}>{item.name}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
              <View style={styles.menuItemFooter}>
                <View>
                  <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.menuItemCalories}>{item.calories} cal</Text>
                </View>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <TouchableOpacity 
          style={styles.cartFooter}
          onPress={() => navigation.navigate('Cart', { cart, restaurant })}
        >
          <View style={styles.cartInfo}>
            <Text style={styles.cartItems}>{cart.length} items</Text>
            <Text style={styles.cartTotal}>${cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.cartButton}>
            <Text style={styles.cartButtonText}>View Cart</Text>
            <Text style={styles.cartArrow}>→</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerImage: {
    height: 280,
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#FF6B35',
  },
  infoCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  infoHeader: {
    marginBottom: 16,
  },
  infoLeft: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  restaurantCuisine: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginRight: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
  tabsContainer: {
    backgroundColor: '#FFF',
    marginTop: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabsContent: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  tabActive: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#FFF',
  },
  menuScroll: {
    flex: 1,
  },
  menuContent: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemImage: {
    width: 120,
    height: 120,
  },
  menuItemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 2,
  },
  menuItemCalories: {
    fontSize: 11,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cartFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30,
  },
  cartInfo: {
    flex: 1,
  },
  cartItems: {
    color: '#FFF',
    fontSize: 13,
    marginBottom: 4,
    opacity: 0.8,
  },
  cartTotal: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  cartButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  cartButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    marginRight: 8,
  },
  cartArrow: {
    color: '#FFF',
    fontSize: 16,
  },
});
