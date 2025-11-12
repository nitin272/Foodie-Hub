import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FoodieHub</Text>
        <Text style={styles.headerSubtitle}>📍 Deliver to: Home</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Popular Restaurants</Text>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.emoji}>🍕</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Pizza Palace</Text>
            <Text style={styles.cardSubtitle}>Italian • 30-40 min</Text>
            <Text style={styles.rating}>⭐ 4.5</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.emoji}>🍔</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Burger Barn</Text>
            <Text style={styles.cardSubtitle}>American • 25-35 min</Text>
            <Text style={styles.rating}>⭐ 4.2</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.emoji}>🍣</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Sushi Station</Text>
            <Text style={styles.cardSubtitle}>Japanese • 40-50 min</Text>
            <Text style={styles.rating}>⭐ 4.8</Text>
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#FF6B6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  card: {
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
  emoji: {
    fontSize: 50,
    marginRight: 15,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
