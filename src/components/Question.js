import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    color="black"
    onPress={() => navigation.goBack()} /*this makes it go back to the last screen*/
    style={{ paddingLeft: 10 }}
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

  return (
<View style={{ flex: 1, padding: 20 }}>
<Text style={{ marginBottom: 20, fontSize: 18 }}>{question.prompt}</Text>
<ButtonGroup
    buttons={question.choices}
    onPress={pressAnswer}
    selectedIndexes={question.type === 'multiple-answer' ? selectedIndex : undefined}
    selectedIndex={question.type !== 'multiple-answer' ? selectedIndex : undefined}
    vertical
    testID="choices"
    containerStyle={{ flex: 1 }}  /* Add flex to ensure proper rendering */
/>
<View style={{ marginTop: 20 }}>
<Button
title={index + 1 === allData.length ? 'Finish Quiz' : 'Next Question'}
onPress={goToTheNextQuestion}
testID="next-question"
disabled={
    selectedIndex === null ||
    (question.type === 'multiple-answer' && selectedIndex.length === 0)
}
/>
    </View>
    </View>
);
}
