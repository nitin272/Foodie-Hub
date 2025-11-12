import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { cart, restaurant } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = subtotal > 20 ? 0 : 3.99;
  const tax = subtotal * 0.1;
  const discount = subtotal > 20 ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee + tax - discount;

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
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Info */}
        <Animated.View style={[styles.restaurantCard, { opacity: fadeAnim }]}>
          <Image 
            source={{ uri: restaurant.image }}
            style={styles.restaurantImage}
            resizeMode="cover"
          />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
            <View style={styles.restaurantMeta}>
              <Text style={styles.metaText}>★ {restaurant.rating}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{restaurant.deliveryTime} min</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{restaurant.distance}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Cart Items */}
        <Animated.View style={[styles.itemsCard, { opacity: fadeAnim }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Items</Text>
            <Text style={styles.itemCount}>{cart.length} items</Text>
          </View>
          
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Image 
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>1</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addMoreButton}>
            <Text style={styles.addMoreIcon}>+</Text>
            <Text style={styles.addMoreText}>Add more items</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Offers */}
        <Animated.View style={[styles.offersCard, { opacity: fadeAnim }]}>
          <View style={styles.offerContent}>
            <Text style={styles.offerIcon}>🎁</Text>
            <View style={styles.offerText}>
              <Text style={styles.offerTitle}>Apply Coupon</Text>
              <Text style={styles.offerSubtitle}>Get discounts & cashback</Text>
            </View>
          </View>
          <Text style={styles.offerArrow}>→</Text>
        </Animated.View>

        {/* Bill Details */}
        <Animated.View style={[styles.billCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Bill Details</Text>
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.billRow}>
            <View style={styles.billLabelRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              {deliveryFee === 0 && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>FREE</Text>
                </View>
              )}
            </View>
            <Text style={[styles.billValue, deliveryFee === 0 && styles.strikethrough]}>
              ${deliveryFee === 0 ? '3.99' : deliveryFee.toFixed(2)}
            </Text>
          </View>

          {discount > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Discount</Text>
              <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
            </View>
          )}
          
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & Fees</Text>
            <Text style={styles.billValue}>${tax.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </Animated.View>

        {/* Delivery Address */}
        <Animated.View style={[styles.addressCard, { opacity: fadeAnim }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          
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

        {/* Payment Method */}
        <Animated.View style={[styles.paymentCard, { opacity: fadeAnim }]}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIconContainer}>
                <Text style={styles.paymentIcon}>💳</Text>
              </View>
              <Text style={styles.paymentText}>Credit/Debit Card</Text>
            </View>
            <View style={styles.radioButton}>
              <View style={styles.radioButtonInner} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIconContainer}>
                <Text style={styles.paymentIcon}>💵</Text>
              </View>
              <Text style={styles.paymentText}>Cash on Delivery</Text>
            </View>
            <View style={styles.radioButtonEmpty} />
          </TouchableOpacity>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Checkout Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Place Order</Text>
          <Text style={styles.checkoutArrow}>→</Text>
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
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  restaurantCard: {
    backgroundColor: '#FFF',
    margin: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  metaDot: {
    fontSize: 13,
    color: '#CCC',
    marginHorizontal: 8,
  },
  itemsCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 12,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  addMoreIcon: {
    fontSize: 18,
    color: '#FF6B35',
    marginRight: 8,
  },
  addMoreText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6B35',
  },
  offersCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  offerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  offerIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  offerText: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },
  offerSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  offerArrow: {
    fontSize: 20,
    color: '#CCC',
  },
  billCard: {
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
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  billLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: 15,
    color: '#666',
  },
  billValue: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  freeBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 8,
  },
  freeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4CAF50',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  discountValue: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 16,
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
  changeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
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
  paymentCard: {
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
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIcon: {
    fontSize: 20,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B35',
  },
  radioButtonEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
  },
  footer: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLabel: {
    fontSize: 16,
    color: '#666',
  },
  footerTotal: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginRight: 8,
  },
  checkoutArrow: {
    fontSize: 18,
    color: '#FFF',
  },
});
