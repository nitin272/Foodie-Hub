import { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

export default function SkeletonLoader({ width = '100%', height = 20, borderRadius = 8, style }) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function RestaurantCardSkeleton() {
  return (
    <View style={styles.cardSkeleton}>
      <SkeletonLoader width="100%" height={200} borderRadius={16} style={styles.imageSkeleton} />
      <View style={styles.cardContent}>
        <SkeletonLoader width="70%" height={20} style={styles.titleSkeleton} />
        <SkeletonLoader width="50%" height={16} style={styles.subtitleSkeleton} />
        <View style={styles.metaRow}>
          <SkeletonLoader width={60} height={24} borderRadius={12} />
          <SkeletonLoader width={80} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
  },
  cardSkeleton: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  imageSkeleton: {
    marginBottom: 0,
  },
  cardContent: {
    padding: 16,
  },
  titleSkeleton: {
    marginBottom: 8,
  },
  subtitleSkeleton: {
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
