import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '../../theme';

// Full-width primary action button used on every screen.
// Spring scale on press/release. testID passed to the inner Pressable.
export default function PrimaryButton({ title, onPress, disabled = false, testID }) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (!disabled) scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        testID={testID}
      >
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  label: {
    color: colors.white,
    fontSize: typography.md,
    fontWeight: typography.weights.semibold,
    letterSpacing: 0.3,
  },
  labelDisabled: {
    color: colors.disabledText,
  },
});
