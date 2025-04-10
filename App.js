import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './src/components/Question';
import Summary from './src/components/Summary';

/*this creates a stack nav which handles the nav between each of rhe screen*/
const Stack = createStackNavigator();

/*this defines each question for the quiz*/
const questions = [

/*this shows each question, the type of question, the choices, and the correct answr index*/
{
prompt: 'What does 2+2 equal?',
type: 'multiple-choice',
choices: ['4', '5', '6', '7'],
correct: 0,
},

{
prompt: 'Which colors are in a rainbow?',
type: 'multiple-answer',
choices: ['green', 'grey', 'red', 'black'],
correct: [0, 2],
},

{
prompt: 'True or False? Grass is Pink.',
type: 'true-false',
choices: ['True', 'False'],
correct: 1,
},
];

export default function App() {
return (
  <NavigationContainer>
  <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>

{/*this navigates the stacks so it can change between the differnt screens*/}
<Stack.Screen
name="Question"
component={Question}
initialParams={{ allData: questions, index: 0, chosenAnswers: [] }}
/>
<Stack.Screen name="Summary" component={Summary}/>

{/*this is the screen which shows the summary of the quiz after we finish answering all the questions*/}
  </Stack.Navigator>
</NavigationContainer>
);
}