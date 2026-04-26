import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from './ui/ScreenWrapper';
import Card from './ui/Card';
import FadeInView from './ui/FadeInView';
import { colors, spacing, typography, radii } from '../theme';

/*this gets the questions and the answers the user inputs from the route.params*/
export default function Summary({ route }) {
  const { allData, chosenAnswers } = route.params;

/*this calculates the score by checking if each question is correct*/
  const calculateTheScore = () => {
return allData.reduce((score, q, i) => {
    const correct = q.correct;
    const user = chosenAnswers[i];

/*this checks if the answer the user input matches the correct answer by comparing both sets of answers for the questions that have more than one answer*/
    if (Array.isArray(correct)) {
    const userSelection = Array.isArray(user) ? user : [user];

/*this makes sure that both the users input and that the correct answer matches*/
    const isCorrect =
    correct.length === userSelection.length &&
    correct.every((answer) => userSelection.includes(answer)) &&
    userSelection.every((answer) => correct.includes(answer));

return isCorrect ? score + 1 : score;
    } else {
/*thid is for the questions that only have one choice or is true or false*/
return correct === user ? score + 1 : score;
}
}, 0);
};

  const score = calculateTheScore();
  const percentage = Math.round((score / allData.length) * 100);
  const message =
    score === allData.length
      ? 'Perfect score!'
      : score === 0
      ? 'Keep practicing!'
      : percentage >= 70
      ? 'Great job!'
      : 'Good effort!';

  // Score card springs in from a slightly smaller scale on mount.
  const scoreScale = useSharedValue(0.85);
  const scoreOpacity = useSharedValue(0);

  useEffect(() => {
    scoreOpacity.value = withTiming(1, { duration: 500 });
    scoreScale.value = withSpring(1, { damping: 12, stiffness: 180 });
  }, []);

  const scoreCardStyle = useAnimatedStyle(() => ({
    opacity: scoreOpacity.value,
    transform: [{ scale: scoreScale.value }],
  }));

return (
    <ScreenWrapper scroll>
      <Animated.View style={[styles.scoreCard, scoreCardStyle]}>
        <Text style={styles.scoreLabel}>Total Score</Text>
        <Text style={styles.scoreNumber} testID="total">
          {score} / {allData.length}
        </Text>
        <Text style={styles.scorePct}>{percentage}%</Text>
        <Text style={styles.scoreMessage}>{message}</Text>
      </Animated.View>

      <Text style={styles.sectionLabel}>Review</Text>

      {allData.map((q, i) => {
    const user = chosenAnswers[i] ?? [];
    const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
    const userSelection = Array.isArray(user) ? user : [user];

return (
    <FadeInView key={i} delay={i * 80}>
      <Card style={styles.questionCard}>
        <Text style={styles.questionText}>{q.prompt}</Text>
        {q.choices.map((choice, idx) => {
          const isCorrect = correctAnswers.includes(idx);
          const isWrongPick =
            userSelection.includes(idx) && !correctAnswers.includes(idx);

          return (
            <View key={idx} style={styles.choiceRow}>
              <View style={styles.choiceIcon}>
                {/*this makes the correct answers green with a checkmark*/}
                {isCorrect && (
                  <Icon name="checkmark-circle" size={16} color={colors.correct} />
                )}
                {/*this marks the wrong selections with a red X*/}
                {isWrongPick && (
                  <Icon name="close-circle" size={16} color={colors.incorrect} />
                )}
              </View>
              <Text
                style={
                  isCorrect
                    ? styles.correct
                    : isWrongPick
                    ? styles.incorrect
                    : styles.normal
                }
              >
                {choice}
              </Text>
            </View>
          );
        })}
      </Card>
    </FadeInView>
);
})}
</ScreenWrapper>
);
}

/*this makes the answer that the user selects incorrectly red strikethrough and makes the correct answers green*/
const styles = StyleSheet.create({
  scoreCard: {
    backgroundColor: colors.primary,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: typography.sm,
    fontWeight: typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  scoreNumber: {
    color: colors.white,
    fontSize: typography.display,
    fontWeight: typography.weights.bold,
    lineHeight: 40,
  },
  scorePct: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: typography.xxl,
    fontWeight: typography.weights.medium,
    marginTop: spacing.xs,
  },
  scoreMessage: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: typography.md,
    fontWeight: typography.weights.medium,
    marginTop: spacing.sm,
  },
  sectionLabel: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  questionCard: {
    marginBottom: spacing.md,
  },
  questionText: {
    fontSize: typography.md,
    color: colors.textPrimary,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  choiceIcon: {
    width: 22,
    marginRight: spacing.xs,
    alignItems: 'center',
  },
  correct: {
    fontWeight: typography.weights.semibold,
    fontSize: typography.md,
    color: colors.correct,
    flex: 1,
  },
  incorrect: {
    textDecorationLine: 'line-through',
    color: colors.incorrect,
    fontSize: typography.md,
    flex: 1,
  },
  normal: {
    fontSize: typography.md,
    color: colors.textSecondary,
    flex: 1,
  },
});
