import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function FavoritesScreen({ navigation }) {
  const favorites = [
    { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5, deliveryTime: '30-40 min', image: '🍕', price: '$$' },
    { id: 2, name: 'Sushi Station', cuisine: 'Japanese', rating: 4.8, deliveryTime: '40-50 min', image: '🍣', price: '$$$' },
    { id: 3, name: 'Curry House', cuisine: 'Indian', rating: 4.7, deliveryTime: '30-40 min', image: '🍛', price: '$$' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Your favorite restaurants</Text>
        
        {favorites.map((restaurant) => (
          <TouchableOpacity 
            key={restaurant.id} 
            style={styles.restaurantCard}
            onPress={() => navigation.navigate('Restaurant', { restaurant })}
          >
            <Text style={styles.restaurantImage}>{restaurant.image}</Text>
            <View style={styles.restaurantInfo}>
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.heartIcon}>❤️</Text>
              </View>
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine} • {restaurant.price}</Text>
              <View style={styles.restaurantMeta}>
                <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                <Text style={styles.deliveryTime}>🕐 {restaurant.deliveryTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {favorites.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>💔</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>Start adding your favorite restaurants</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    width: 40,
  },
  backIcon: {
    fontSize: 28,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    fontSize: 50,
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  heartIcon: {
    fontSize: 20,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
  },
  rating: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginRight: 15,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
