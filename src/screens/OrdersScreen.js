import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';

export default function OrdersScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const orders = [
    { 
      id: 1, 
      restaurant: 'Bella Italia', 
      items: ['2x Margherita Pizza', '1x Garlic Bread'],
      itemCount: 3,
      total: 27.98, 
      status: 'Delivered', 
      date: 'Nov 10, 2025',
      time: '2:30 PM',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
      orderId: '#ORD-1234'
    },
    { 
      id: 2, 
      restaurant: 'The Burger Co.', 
      items: ['1x Classic Burger', '1x Cheese Fries', '1x Milkshake'],
      itemCount: 3,
      total: 32.50, 
      status: 'On the way', 
      date: 'Nov 12, 2025',
      time: '3:15 PM',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
      orderId: '#ORD-1235',
      eta: '15 mins'
    },
    { 
      id: 3, 
      restaurant: 'Sakura Sushi', 
      items: ['2x Salmon Roll', '1x Tuna Sashimi', '1x Miso Soup'],
      itemCount: 4,
      total: 45.99, 
      status: 'Preparing', 
      date: 'Nov 12, 2025',
      time: '3:45 PM',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
      orderId: '#ORD-1236'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#4CAF50';
      case 'On the way': return '#FF9800';
      case 'Preparing': return '#2196F3';
      default: return '#666';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>{orders.filter(o => o.status !== 'Delivered').length} active orders</Text>
      </View>

      <Animated.ScrollView 
        style={[styles.ordersList, { opacity: fadeAnim }]}
        contentContainerStyle={styles.ordersContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.map((order, index) => (
          <Animated.View 
            key={order.id} 
            style={styles.orderCard}
          >
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>{order.orderId}</Text>
                <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>

            {/* Restaurant Info */}
            <View style={styles.restaurantRow}>
              <Image 
                source={{ uri: order.image }}
                style={styles.restaurantImage}
                resizeMode="cover"
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{order.restaurant}</Text>
                <Text style={styles.itemCount}>{order.itemCount} items</Text>
              </View>
            </View>

            {/* Items List */}
            <View style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <Text key={idx} style={styles.itemText}>• {item}</Text>
              ))}
            </View>

            {/* Order Footer */}
            <View style={styles.orderFooter}>
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
              </View>
              
              {order.status === 'On the way' && (
                <View style={styles.etaBanner}>
                  <Text style={styles.etaText}>⏱ Arriving in {order.eta}</Text>
                </View>
              )}

              <View style={styles.actionButtons}>
                {order.status !== 'Delivered' && (
                  <TouchableOpacity 
                    style={styles.trackButton}
                    onPress={() => navigation.navigate('TrackOrder')}
                  >
                    <Text style={styles.trackButtonText}>Track Order</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ))}
      </Animated.ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.navIcon}>⌕</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navIconActive}>
            <Text style={styles.navIconTextActive}>◫</Text>
          </View>
          <Text style={styles.navLabelActive}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>⚙</Text>
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
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  ordersList: {
    flex: 1,
  },
  ordersContent: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  itemsList: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  orderFooter: {
    marginTop: 4,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF6B35',
  },
  etaBanner: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  etaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F57C00',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  reorderButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
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
  navIcon: {
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
});
