import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenWrapper from './ui/ScreenWrapper';
import Card from './ui/Card';
import PrimaryButton from './ui/PrimaryButton';
import ChoiceButton from './ui/ChoiceButton';
import ProgressBar from './ui/ProgressBar';
import { colors, spacing, typography, radii } from '../theme';

export default function Question({ navigation, route }) {
/*this gets the allData, index, and answers from the user from the route param*/
  const { allData, index, chosenAnswers } = route.params;

/*this shows the current question you are on*/
const question = allData[index];

/*this keeps the selected answers and makes it null by default for any single choice and empty array for multiple answer questions*/
const [selectedIndex, setSelectedIndex] = useState(
question.type === 'multiple-answer' ? [] : null
);

/*this resets the index that has been selected when the index of the question is changed*/
useEffect(() => {
setSelectedIndex(question.type === 'multiple-answer' ? [] : null);
}, [index]);

useEffect(() => {
/*this puts a back arrow in the header so that we can navigate back to the previous questions*/
navigation.setOptions({
headerLeft: () => (
index > 0 && (
<Icon
    name="arrow-back"
    size={25}
    color={colors.white}
    onPress={() => navigation.goBack()} /*this makes it go back to the last screen*/
    style={{ paddingLeft: spacing.sm + 2 }}
/>
)
),
});
},
[navigation, index]);

/*this helps update the answers inputed and goes to the next question or summary page*/
    const goToTheNextQuestion = () => {
    const updatedAnswers = [...chosenAnswers];
    updatedAnswers[index] = selectedIndex;

if (index + 1 < allData.length) {
    navigation.push('Question', {
    allData,
    index: index + 1,
    chosenAnswers: updatedAnswers,
});
} else {
    navigation.navigate('Summary', {
    allData,
    chosenAnswers: updatedAnswers,
});
}
};

/*this allows you to select multiple answers if needed for a specific question*/
  const pressAnswer = (i) => {
if (question.type === 'multiple-answer') {
    setSelectedIndex((prev) =>
    prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
} else {
    setSelectedIndex(i);
}
};

  const isDisabled =
    selectedIndex === null ||
    (question.type === 'multiple-answer' && selectedIndex.length === 0);

  // Entrance animation: each new question screen fades + slides up on mount.
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(18);

  useEffect(() => {
    contentOpacity.value = withTiming(1, {
      duration: 350,
      easing: Easing.out(Easing.quad),
    });
    contentTranslateY.value = withSpring(0, { damping: 20, stiffness: 280 });
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
    flex: 1,
  }));

  return (
    <ScreenWrapper>
      <ProgressBar progress={(index + 1) / allData.length} />
      <Animated.View style={contentStyle}>
        <Card style={styles.questionCard}>
          <Text style={styles.questionCounter}>
            Question {index + 1} of {allData.length}
          </Text>
          <Text style={styles.questionText}>{question.prompt}</Text>
        </Card>
        <View testID="choices" style={styles.choicesContainer}>
          {question.choices.map((choice, i) => (
            <ChoiceButton
              key={i}
              label={choice}
              index={i}
              isSelected={
                question.type === 'multiple-answer'
                  ? selectedIndex.includes(i)
                  : selectedIndex === i
              }
              onPress={pressAnswer}
            />
          ))}
        </View>
        <PrimaryButton
          title={index + 1 === allData.length ? 'Finish Quiz' : 'Next Question'}
          onPress={goToTheNextQuestion}
          testID="next-question"
          disabled={isDisabled}
        />
      </Animated.View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  questionCard: {
    marginBottom: spacing.md,
  },
  questionCounter: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: typography.lg,
    color: colors.textPrimary,
    fontWeight: typography.weights.semibold,
    lineHeight: 26,
  },
  choicesContainer: {
    flex: 1,
    marginBottom: spacing.md,
  },
});
