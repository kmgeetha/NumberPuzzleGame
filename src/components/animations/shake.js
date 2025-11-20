import { Animated } from "react-native";

export const shake = (animValue) => {
  Animated.sequence([
    Animated.timing(animValue, { toValue: -8, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: 8, duration: 60, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: -6, duration: 50, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: 6, duration: 50, useNativeDriver: true }),
    Animated.timing(animValue, { toValue: 0, duration: 40, useNativeDriver: true }),
  ]).start();
};
