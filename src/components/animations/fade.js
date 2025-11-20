import { Animated } from "react-native";

/**
 * small helpers that perform fade in/out on an Animated.Value
 * Usage:
 *  const val = useRef(new Animated.Value(0)).current;
 *  fadeIn(val)
 */
export const fadeIn = (animValue, duration = 300) => {
  Animated.timing(animValue, { toValue: 1, duration, useNativeDriver: true }).start();
};

export const fadeOut = (animValue, duration = 250) => {
  Animated.timing(animValue, { toValue: 0, duration, useNativeDriver: true }).start();
};
