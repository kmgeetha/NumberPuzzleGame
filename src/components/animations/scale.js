import { Animated } from "react-native";

export const popIn = (animValue, duration = 180) => {
  animValue.setValue(0.8);
  Animated.spring(animValue, { toValue: 1, friction: 6, useNativeDriver: true }).start();
};

export const popOut = (animValue, duration = 180) => {
  Animated.timing(animValue, { toValue: 0.8, duration, useNativeDriver: true }).start();
};
