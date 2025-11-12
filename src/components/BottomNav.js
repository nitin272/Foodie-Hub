import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BottomNav({ navigation, activeScreen }) {
  const navItems = [
    { id: 'Home', label: 'Home', screen: 'Home' },
    { id: 'Search', label: 'Search', screen: 'Search' },
    { id: 'Orders', label: 'Orders', screen: 'Orders' },
    { id: 'Profile', label: 'Account', screen: 'Profile' },
  ];

  return (
    <View style={styles.bottomNav}>
      <View style={styles.navIndicator} />
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.navDot,
                isActive && styles.navDotActive
              ]} />
              <Text style={[
                styles.navLabel,
                isActive && styles.navLabelActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  navIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#FF6B35',
  },
  navContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 28,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
    marginBottom: 6,
  },
  navDotActive: {
    width: 32,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
    letterSpacing: 0.2,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.2,
  },
});
