import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, radii } from '../../theme';

// White surface card with consistent shadow and radius.
// Pass style to override or extend (e.g. marginBottom, custom padding).
export default function Card({ children, style }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
});
