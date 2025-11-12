import { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 9,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const restaurants = [
    { 
      id: 1, 
      name: 'Bella Italia', 
      cuisine: 'Italian Cuisine', 
      rating: 4.5, 
      reviews: 234,
      deliveryTime: '30-40', 
      deliveryFee: 2.99,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
      tags: ['Pasta', 'Pizza', 'Wine'],
      distance: '1.2 km'
    },
    { 
      id: 2, 
      name: 'The Burger Co.', 
      cuisine: 'American Grill', 
      rating: 4.2, 
      reviews: 189,
      deliveryTime: '25-35', 
      deliveryFee: 0,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      tags: ['Burgers', 'Fries', 'Shakes'],
      distance: '0.8 km'
    },
    { 
      id: 3, 
      name: 'Sakura Sushi', 
      cuisine: 'Japanese Restaurant', 
      rating: 4.8, 
      reviews: 456,
      deliveryTime: '40-50', 
      deliveryFee: 3.99,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
      tags: ['Sushi', 'Ramen', 'Sake'],
      distance: '2.1 km'
    },
    { 
      id: 4, 
      name: 'Spice Route', 
      cuisine: 'Indian Kitchen', 
      rating: 4.6, 
      reviews: 312,
      deliveryTime: '35-45', 
      deliveryFee: 2.49,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      tags: ['Curry', 'Tandoori', 'Naan'],
      distance: '1.5 km'
    },
  ];

  const categories = ['All', 'Italian', 'American', 'Japanese', 'Indian', 'Mexican', 'Thai'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerLabel}>DELIVER TO</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationText}>Manhattan, NY 10001</Text>
              <Text style={styles.locationArrow}>▼</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.avatarButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <Animated.View style={[styles.searchSection, { transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity 
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.7}
          >
            <View style={styles.searchIconBox}>
              <Text style={styles.searchIconText}>⌕</Text>
            </View>
            <Text style={styles.searchText}>Search restaurants or dishes</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Categories */}
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity 
                key={category}
                style={[
                  styles.categoryChip,
                  activeCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Promo Banner */}
        <Animated.View style={[styles.promoSection, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <View style={styles.promoTag}>
                <Text style={styles.promoTagText}>NEW USER OFFER</Text>
              </View>
              <Text style={styles.promoTitle}>Get 50% off your first order</Text>
              <Text style={styles.promoSubtitle}>Valid for orders above $20</Text>
              <View style={styles.promoCodeBox}>
                <Text style={styles.promoCode}>WELCOME50</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Deals Section */}
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <View style={styles.dealsHeader}>
            <Text style={styles.sectionTitle}>Today's Deals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.dealsScroll}
            contentContainerStyle={styles.dealsContent}
          >
            <TouchableOpacity style={styles.dealCard} activeOpacity={0.9}>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>40% OFF</Text>
              </View>
              <Text style={styles.dealTitle}>Free Delivery</Text>
              <Text style={styles.dealSubtitle}>On orders above $15</Text>
              <Text style={styles.dealCode}>Use: FREEDEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dealCard, styles.dealCardGreen]} activeOpacity={0.9}>
              <View style={[styles.dealBadge, styles.dealBadgeGreen]}>
                <Text style={styles.dealBadgeText}>BUY 1 GET 1</Text>
              </View>
              <Text style={styles.dealTitle}>Pizza Special</Text>
              <Text style={styles.dealSubtitle}>On all large pizzas</Text>
              <Text style={styles.dealCode}>Use: PIZZA2X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dealCard, styles.dealCardBlue]} activeOpacity={0.9}>
              <View style={[styles.dealBadge, styles.dealBadgeBlue]}>
                <Text style={styles.dealBadgeText}>30% OFF</Text>
              </View>
              <Text style={styles.dealTitle}>Weekend Deal</Text>
              <Text style={styles.dealSubtitle}>Valid till Sunday</Text>
              <Text style={styles.dealCode}>Use: WEEKEND30</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Restaurants Near You</Text>
            <Text style={styles.sectionSubtitle}>{restaurants.length} restaurants available</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllLink}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Restaurant Cards */}
        {restaurants.map((restaurant, index) => (
          <Animated.View
            key={restaurant.id}
            style={{
              opacity: fadeAnim,
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 30 + (index * 15)],
                }),
              }],
            }}
          >
            <TouchableOpacity 
              style={styles.restaurantCard}
              onPress={() => navigation.navigate('Restaurant', { restaurant })}
              activeOpacity={0.95}
            >
              {/* Restaurant Image */}
              <View style={styles.cardImage}>
                <Image 
                  source={{ uri: restaurant.image }}
                  style={styles.restaurantImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay} />
                {restaurant.deliveryFee === 0 && (
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeBadgeText}>FREE DELIVERY</Text>
                  </View>
                )}
              </View>

              {/* Card Content */}
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{restaurant.name}</Text>
                  <TouchableOpacity style={styles.favoriteBtn}>
                    <Text style={styles.favoriteBtnText}>♡</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
                
                <View style={styles.cardTags}>
                  {restaurant.tags.slice(0, 3).map((tag, idx) => (
                    <View key={idx} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.ratingBox}>
                    <Text style={styles.ratingIcon}>★</Text>
                    <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    <Text style={styles.reviewsText}>({restaurant.reviews})</Text>
                  </View>
                  <View style={styles.divider} />
                  <Text style={styles.deliveryInfo}>{restaurant.deliveryTime} min</Text>
                  <View style={styles.divider} />
                  <Text style={styles.deliveryInfo}>{restaurant.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Text style={styles.navIconTextActive}>⌂</Text>
          </View>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.navIconText}>⌕</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Orders')}
        >
          <Text style={styles.navIconText}>◫</Text>
          <Text style={styles.navLabel}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIconText}>⚙</Text>
          <Text style={styles.navLabel}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 6,
  },
  locationArrow: {
    fontSize: 10,
    color: '#666',
  },
  avatarButton: {
    padding: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 16,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  searchIconBox: {
    marginRight: 12,
  },
  searchIconText: {
    fontSize: 20,
    color: '#666',
  },
  searchText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '400',
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  promoSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  promoBanner: {
    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  promoContent: {
    padding: 24,
  },
  promoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 12,
  },
  promoTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 6,
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  promoCodeBox: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  promoCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  seeAllLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardImage: {
    height: 200,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  freeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  freeBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  favoriteBtn: {
    padding: 4,
  },
  favoriteBtnText: {
    fontSize: 20,
    color: '#CCC',
  },
  cardCuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  cardTags: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  tag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 14,
    color: '#FFB800',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 13,
    color: '#999',
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  deliveryInfo: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIconActive: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  navIconTextActive: {
    fontSize: 20,
    color: '#FFF',
  },
  navIconText: {
    fontSize: 24,
    color: '#CCC',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  navLabelActive: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '600',
  },
  dealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
  dealsScroll: {
    marginBottom: 24,
  },
  dealsContent: {
    paddingHorizontal: 20,
  },
  dealCard: {
    width: 200,
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 20,
    marginRight: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  dealCardGreen: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
  dealCardBlue: {
    backgroundColor: '#2196F3',
    shadowColor: '#2196F3',
  },
  dealBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  dealBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 6,
  },
  dealSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12,
  },
  dealCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
});
