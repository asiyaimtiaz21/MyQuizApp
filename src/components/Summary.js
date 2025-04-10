import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


/*this gets the questions and the answers the user inputs from the route.params*/
export default function Summary({ route }) {
  const { allData, chosenAnswers } = route.params;


/*this calculates the score by checking if each question is correct*/
const calculateTheScore = () => {
return allData.reduce((score, q, i) => {
const correct = q.correct;
const user = chosenAnswers[i];

/*this checks if the answer the user input matches the correct answer by comparing both sets of ansers for the questions that have more than one answer*/
if (Array.isArray(correct)) {
const userSelection = Array.isArray(user) ? user : [user];

/*thid makes sure that both the users input and that the correct answer matches*/
const isCorrect =
correct.length === userSelection.length &&
correct.every((answer) => userSelection.includes(answer)) &&
userSelection.every((answer) => correct.includes(answer));

return isCorrect ? score + 1 : score;
} else {

/*this is for the questions that only have one choice or is true or false*/
return correct === user ? score + 1 : score;
}
}, 0);
};

return (
    <ScrollView style={{ padding: 20 }}>
    <Text style={styles.total} testID="total">
Total Score: {calculateTheScore()} / {allData.length}
    </Text>
    {allData.map((q, i) => {
    const user = chosenAnswers[i] ?? [];
    const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];
    const userSelection = Array.isArray(user) ? user : [user];
    
return (
    <View key={i} style={{ marginVertical: 15 }}>
    <Text style={styles.questionText}>{q.prompt}</Text>
    {q.choices.map((choice, index) => {
    let textStyle = styles.normal;

/*this makes the correct answers bold*/
    if (correctAnswers.includes(index)) {
    textStyle = styles.correct;
    }

/*this strikes throught the answers the user incorrectly selects*/
    if (userSelection.includes(index) && !correctAnswers.includes(index)) {
    textStyle = styles.incorrect;
}

    return (
<Text key={index} style={textStyle}>
{choice}
</Text>
);
})}
</View>
);
})}
</ScrollView>
);
}

/*this makes the answer that the user selects inccorrectly red strikethrough and makes the correct answers green*/
    const styles = StyleSheet.create({
correct: {
fontWeight: 'bold',
fontSize: 18,
marginVertical: 3,
color: 'green',
},

incorrect: {
textDecorationLine: 'line-through',
color: 'red',
fontSize: 18,
marginVertical: 3,
},

normal: {
fontSize: 18,
marginVertical: 3,
},

total: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 25,
},

questionText: {
fontSize: 20,
marginBottom: 6,
},

}
);