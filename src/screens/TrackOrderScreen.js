import { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';

export default function TrackOrderScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(3);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const mapZoomAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 0.6,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.spring(mapZoomAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for delivery icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const orderSteps = [
    { id: 1, title: 'Order Placed', subtitle: 'We have received your order', time: '2:30 PM', completed: true },
    { id: 2, title: 'Order Confirmed', subtitle: 'Restaurant is preparing', time: '2:32 PM', completed: true },
    { id: 3, title: 'Preparing Food', subtitle: 'Your food is being cooked', time: '2:35 PM', completed: true },
    { id: 4, title: 'Out for Delivery', subtitle: 'Driver is on the way', time: 'Now', completed: false, active: true },
    { id: 5, title: 'Delivered', subtitle: 'Enjoy your meal!', time: 'Soon', completed: false },
  ];

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
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Track Order</Text>
          <Text style={styles.orderId}>#ORD-1235</Text>
        </View>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Placeholder with Animation */}
        <Animated.View 
          style={[
            styles.mapContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: mapZoomAnim }],
            },
          ]}
        >
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapOverlay}>
              {/* Delivery Route Line */}
              <View style={styles.routeLine} />
              
              {/* Restaurant Pin */}
              <View style={[styles.mapPin, styles.restaurantPin]}>
                <Text style={styles.pinIcon}>🏪</Text>
              </View>
              
              {/* Delivery Person (Animated) */}
              <Animated.View 
                style={[
                  styles.mapPin, 
                  styles.deliveryPin,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Text style={styles.pinIcon}>🚴</Text>
              </Animated.View>
              
              {/* Destination Pin */}
              <View style={[styles.mapPin, styles.destinationPin]}>
                <Text style={styles.pinIcon}>📍</Text>
              </View>
            </View>
            
            {/* Map Controls */}
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton}>
                <Text style={styles.mapButtonText}>−</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* ETA Card with Animation */}
        <Animated.View 
          style={[
            styles.etaCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.etaHeader}>
            <View style={styles.etaLeft}>
              <Text style={styles.etaLabel}>Estimated Arrival</Text>
              <View style={styles.etaTimeContainer}>
                <Text style={styles.etaTime}>15</Text>
                <Text style={styles.etaUnit}>mins</Text>
              </View>
            </View>
            <View style={styles.etaRight}>
              <View style={styles.etaIconContainer}>
                <Animated.Text style={[styles.etaIcon, { transform: [{ scale: pulseAnim }] }]}>
                  ⚡
                </Animated.Text>
              </View>
            </View>
          </View>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Animated.View 
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]} 
            />
          </View>
          <Text style={styles.etaSubtitle}>Your order is on the way</Text>
        </Animated.View>

        {/* Delivery Partner Card */}
        <Animated.View 
          style={[
            styles.driverCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.driverHeader}>
            <Text style={styles.sectionTitle}>Delivery Partner</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingIcon}>★</Text>
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
          
          <View style={styles.driverContent}>
            <View style={styles.driverLeft}>
              <View style={styles.driverAvatarContainer}>
                <View style={styles.driverAvatar}>
                  <Text style={styles.driverAvatarText}>MK</Text>
                </View>
                <View style={styles.onlineIndicator} />
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>Michael Kumar</Text>
                <Text style={styles.driverVehicle}>Honda Activa • DL 8C 1234</Text>
                <View style={styles.driverStats}>
                  <Text style={styles.driverStat}>📦 234 deliveries</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.driverActions}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📞</Text>
              </View>
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>💬</Text>
              </View>
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Order Timeline */}
        <Animated.View 
          style={[
            styles.timelineCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Order Status</Text>
          
          {orderSteps.map((step, index) => (
            <View key={step.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <View style={[
                  styles.timelineDot,
                  step.completed && styles.timelineDotCompleted,
                  step.active && styles.timelineDotActive,
                ]}>
                  {step.completed ? (
                    <Text style={styles.checkIcon}>✓</Text>
                  ) : step.active ? (
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                      <View style={styles.activeDot} />
                    </Animated.View>
                  ) : (
                    <View style={styles.inactiveDot} />
                  )}
                </View>
                {index < orderSteps.length - 1 && (
                  <View style={[
                    styles.timelineLine,
                    step.completed && styles.timelineLineCompleted
                  ]} />
                )}
              </View>
              <View style={styles.timelineRight}>
                <Text style={[
                  styles.timelineTitle,
                  (step.completed || step.active) && styles.timelineTitleActive
                ]}>
                  {step.title}
                </Text>
                <Text style={styles.timelineSubtitle}>{step.subtitle}</Text>
                <Text style={styles.timelineTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Order Details */}
        <Animated.View 
          style={[
            styles.orderCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.restaurantRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' }}
              style={styles.restaurantImage}
              resizeMode="cover"
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>The Burger Co.</Text>
              <Text style={styles.restaurantAddress}>123 Main St, Manhattan</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.orderItem}>
            <Text style={styles.itemQuantity}>1x</Text>
            <Text style={styles.itemName}>Classic Burger</Text>
            <Text style={styles.itemPrice}>$12.99</Text>
          </View>
          <View style={styles.orderItem}>
            <Text style={styles.itemQuantity}>1x</Text>
            <Text style={styles.itemName}>Cheese Fries</Text>
            <Text style={styles.itemPrice}>$5.99</Text>
          </View>
          <View style={styles.orderItem}>
            <Text style={styles.itemQuantity}>1x</Text>
            <Text style={styles.itemName}>Milkshake</Text>
            <Text style={styles.itemPrice}>$6.99</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>$31.56</Text>
          </View>
        </Animated.View>

        {/* Delivery Address */}
        <Animated.View 
          style={[
            styles.addressCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContent}>
            <View style={styles.addressIconContainer}>
              <Text style={styles.addressIcon}>📍</Text>
            </View>
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
              <Text style={styles.addressText}>New York, NY 10001</Text>
            </View>
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Action Button */}
      <Animated.View 
        style={[
          styles.bottomAction,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8}>
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </Animated.View>
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
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  orderId: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 280,
    margin: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    position: 'relative',
  },
  mapOverlay: {
    flex: 1,
    position: 'relative',
  },
  routeLine: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '60%',
    height: 3,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    opacity: 0.6,
  },
  mapPin: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  restaurantPin: {
    top: '25%',
    left: '15%',
  },
  deliveryPin: {
    top: '20%',
    left: '50%',
    backgroundColor: '#FF6B35',
  },
  destinationPin: {
    top: '30%',
    right: '15%',
  },
  pinIcon: {
    fontSize: 24,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  etaCard: {
    backgroundColor: '#FF6B35',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  etaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  etaLeft: {
    flex: 1,
  },
  etaLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 8,
  },
  etaTimeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  etaTime: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 48,
  },
  etaUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 8,
  },
  etaRight: {
    marginLeft: 16,
  },
  etaIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  etaIcon: {
    fontSize: 32,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  etaSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  driverCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingIcon: {
    fontSize: 14,
    color: '#FFB800',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F57C00',
  },
  driverContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  driverLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  driverAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  driverDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  driverVehicle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  driverStats: {
    flexDirection: 'row',
  },
  driverStat: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  driverActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 12,
  },
  actionIconContainer: {
    marginRight: 8,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  timelineCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineItem: {
    flexDirection: 'row',
    marginTop: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: '#E8F5E9',
  },
  timelineDotActive: {
    backgroundColor: '#FFF3E0',
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  checkIcon: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: '700',
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B35',
  },
  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D0D0D0',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  timelineLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineRight: {
    flex: 1,
    paddingTop: 8,
  },
  timelineTitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  timelineTitleActive: {
    color: '#000',
    fontWeight: '700',
  },
  timelineSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  timelineTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  orderCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
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
  restaurantAddress: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666',
    width: 40,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF6B35',
  },
  addressCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  addressContent: {
    flexDirection: 'row',
    marginTop: 16,
  },
  addressIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressIcon: {
    fontSize: 20,
  },
  addressDetails: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bottomAction: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
});
