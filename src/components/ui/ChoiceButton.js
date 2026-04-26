import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '../../theme';

// Animated choice row. isSelected drives a smooth color transition;
// press/release drives a spring scale.
export default function ChoiceButton({ label, index, isSelected, onPress }) {
  const scale = useSharedValue(1);
  const selected = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    selected.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
  }, [isSelected]);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      selected.value,
      [0, 1],
      [colors.surface, colors.primary]
    ),
    borderColor: interpolateColor(
      selected.value,
      [0, 1],
      [colors.border, colors.primary]
    ),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      selected.value,
      [0, 1],
      [colors.textPrimary, colors.white]
    ),
  }));

  return (
    <Animated.View style={[styles.wrapper, wrapperStyle]}>
      <Pressable
        onPress={() => onPress(index)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.container, containerStyle]}>
          <Animated.Text style={[styles.label, labelStyle]}>
            {label}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.sm,
  },
  container: {
    borderWidth: 1.5,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.md,
    fontWeight: typography.weights.medium,
    textAlign: 'center',
  },
});
