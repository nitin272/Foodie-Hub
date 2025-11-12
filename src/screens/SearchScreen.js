import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Animated, Image } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const allItems = [
    { id: 1, name: 'Margherita Pizza', restaurant: 'Bella Italia', price: 12.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', category: 'Pizza', rating: 4.5 },
    { id: 2, name: 'Classic Burger', restaurant: 'The Burger Co.', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', category: 'Burgers', rating: 4.2 },
    { id: 3, name: 'Salmon Sushi', restaurant: 'Sakura Sushi', price: 15.99, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80', category: 'Sushi', rating: 4.8 },
    { id: 4, name: 'Chicken Tacos', restaurant: 'Taco Town', price: 8.99, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', category: 'Tacos', rating: 4.3 },
    { id: 5, name: 'Pepperoni Pizza', restaurant: 'Bella Italia', price: 14.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', category: 'Pizza', rating: 4.6 },
    { id: 6, name: 'Cheese Burger', restaurant: 'The Burger Co.', price: 10.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80', category: 'Burgers', rating: 4.4 },
  ];

  const filters = ['All', 'Pizza', 'Burgers', 'Sushi', 'Tacos', 'Desserts'];
  const recentSearches = ['Pizza', 'Burger', 'Sushi'];
  const trendingSearches = ['Margherita Pizza', 'Classic Burger', 'Salmon Sushi', 'Chicken Tacos'];

  const filteredItems = searchQuery
    ? allItems.filter(item => 
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (activeFilter === 'All' || item.category === activeFilter)
      )
    : activeFilter === 'All' ? allItems : allItems.filter(item => item.category === activeFilter);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food or restaurants"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            autoFocus={true}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Animated.ScrollView 
        style={[styles.content, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {searchQuery === '' ? (
          <View>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  <TouchableOpacity>
                    <Text style={styles.clearAllText}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.recentItem}
                    onPress={() => setSearchQuery(search)}
                  >
                    <View style={styles.recentIconContainer}>
                      <Text style={styles.recentIcon}>🕐</Text>
                    </View>
                    <Text style={styles.recentText}>{search}</Text>
                    <Text style={styles.recentArrow}>↗</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              <View style={styles.trendingGrid}>
                {trendingSearches.map((search, index) => (
                  <TouchableOpacity 
                    key={index}
                    style={styles.trendingChip}
                    onPress={() => setSearchQuery(search)}
                  >
                    <Text style={styles.trendingIcon}>🔥</Text>
                    <Text style={styles.trendingText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>
              {filteredItems.length} results found
            </Text>
            {filteredItems.map((item) => {
              // Create a restaurant object from the item
              const restaurant = {
                id: item.id,
                name: item.restaurant,
                cuisine: item.category,
                rating: item.rating,
                reviews: 234,
                deliveryTime: '30-40',
                deliveryFee: 2.99,
                image: item.image,
                tags: [item.category, 'Popular', 'Fast Delivery'],
                distance: '1.2 km'
              };
              
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.resultCard}
                  onPress={() => navigation.navigate('Restaurant', { restaurant })}
                  activeOpacity={0.9}
                >
                  <Image 
                    source={{ uri: item.image }}
                    style={styles.resultImage}
                    resizeMode="cover"
                  />
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{item.name}</Text>
                    <Text style={styles.resultRestaurant}>{item.restaurant}</Text>
                    <View style={styles.resultFooter}>
                      <View style={styles.resultRating}>
                        <Text style={styles.resultRatingIcon}>★</Text>
                        <Text style={styles.resultRatingText}>{item.rating}</Text>
                      </View>
                      <Text style={styles.resultPrice}>${item.price.toFixed(2)}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {filteredItems.length === 0 && (
              <View style={styles.noResults}>
                <Text style={styles.noResultsEmoji}>🔍</Text>
                <Text style={styles.noResultsTitle}>No results found</Text>
                <Text style={styles.noResultsText}>Try searching for something else</Text>
              </View>
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginRight: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 20,
    color: '#666',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearIcon: {
    fontSize: 16,
    color: '#999',
    padding: 4,
  },
  content: {
    flex: 1,
  },
  filtersScroll: {
    marginVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  recentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentIcon: {
    fontSize: 18,
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  recentArrow: {
    fontSize: 18,
    color: '#CCC',
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  trendingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  trendingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  resultsTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  resultImage: {
    width: 100,
    height: 100,
  },
  resultInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  resultName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  resultRestaurant: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  resultRatingIcon: {
    fontSize: 12,
    color: '#FFB800',
    marginRight: 4,
  },
  resultRatingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F57C00',
  },
  resultPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  noResults: {
    alignItems: 'center',
    marginTop: 80,
  },
  noResultsEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 15,
    color: '#999',
  },
});
