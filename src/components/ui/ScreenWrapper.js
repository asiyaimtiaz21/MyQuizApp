import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';

// Consistent layout shell for every screen.
// scroll=false (default): flex column, good for screens with a fixed bottom action.
// scroll=true: ScrollView with consistent padding and bottom clearance.
// Both variants apply the same max-width constraint for tablet support.
export default function ScreenWrapper({ children, scroll = false }) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <ScrollView style={styles.scrollFill} contentContainerStyle={styles.scrollContent}>
          <View style={styles.scrollInner}>
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.flexInner}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const MAX_WIDTH = 600;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollFill: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  scrollInner: {
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    padding: spacing.md,
  },
  flexInner: {
    flex: 1,
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    padding: spacing.md,
  },
});
