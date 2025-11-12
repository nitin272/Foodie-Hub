import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function FloatingActionButton({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.stagger(50, [
        Animated.spring(scaleAnim1, {
          toValue,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim2, {
          toValue,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim3, {
          toValue,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    setIsOpen(!isOpen);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const menuItems = [
    { id: 1, icon: '🔍', label: 'Search', screen: 'Search', scale: scaleAnim1 },
    { id: 2, icon: '⭐', label: 'Favorites', screen: 'Favorites', scale: scaleAnim2 },
    { id: 3, icon: '🎁', label: 'Offers', screen: 'Home', scale: scaleAnim3 },
  ];

  return (
    <View style={styles.container}>
      {/* Backdrop */}
      {isOpen && (
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1}
          onPress={toggleMenu}
        />
      )}

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <Animated.View
          key={item.id}
          style={[
            styles.menuItem,
            {
              transform: [
                { scale: item.scale },
                {
                  translateY: item.scale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -(60 * (index + 1))],
                  }),
                },
              ],
              opacity: item.scale,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              toggleMenu();
              navigation.navigate(item.screen);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
          </TouchableOpacity>
          <Text style={styles.menuLabel}>{item.label}</Text>
        </Animated.View>
      ))}

      {/* Main FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.9}
      >
        <Animated.Text
          style={[
            styles.fabIcon,
            { transform: [{ rotate: rotation }] },
          ]}
        >
          +
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
  },
  menuItem: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
  },
  menuButton: {
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
  menuIcon: {
    fontSize: 24,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
});
