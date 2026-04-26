import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import ScreenWrapper from './ui/ScreenWrapper';
import PrimaryButton from './ui/PrimaryButton';
import { colors, spacing, typography, radii } from '../theme';

export default function Start({ navigation, route }) {
  const { allData } = route.params;

  const handleStart = () => {
    navigation.navigate('Question', {
      allData,
      index: 0,
      chosenAnswers: [],
    });
  };

  // Hero card slides up; button fades in slightly after.
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(24);
  const btnOpacity = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 500 });
    heroTranslateY.value = withSpring(0, { damping: 16, stiffness: 200 });
    btnOpacity.value = withDelay(250, withTiming(1, { duration: 400 }));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
  }));

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Animated.View style={[styles.hero, heroStyle]}>
          <Text style={styles.appTitle}>Quiz App</Text>
          <Text style={styles.subtitle}>{allData.length} questions</Text>
        </Animated.View>
        <Animated.View style={btnStyle}>
          <PrimaryButton title="Start Quiz" onPress={handleStart} />
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  appTitle: {
    color: colors.white,
    fontSize: typography.display,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: typography.md,
    fontWeight: typography.weights.medium,
  },
});
