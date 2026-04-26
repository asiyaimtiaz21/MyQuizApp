import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Start from './src/components/Start';
import Question from './src/components/Question';
import Summary from './src/components/Summary';
import { colors, typography } from './src/theme';

/*this creates a stack nav which handles the nav between each of the screens*/
const Stack = createStackNavigator();

export default function App() {
return (
<NavigationContainer>
<Stack.Navigator
  screenOptions={{
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: colors.primary },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontSize: typography.lg,
      fontWeight: typography.weights.semibold,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
      open: {
        animation: 'spring',
        config: { stiffness: 300, damping: 35, mass: 1, overshootClamping: false },
      },
      close: {
        animation: 'spring',
        config: { stiffness: 300, damping: 35, mass: 1, overshootClamping: false },
      },
    },
  }}
>

{/*this navigates the stacks so it can change between the different screens*/}
<Stack.Screen
  name="Start"
  component={Start}
  initialParams={{ allData: questions }}
  options={{ title: 'Quiz App' }}
/>
<Stack.Screen
  name="Question"
  component={Question}
  options={{ title: 'Quiz' }}
/>
<Stack.Screen
  name="Summary"
  component={Summary}
  options={{ title: 'Results' }}
/>

{/*this is the screen which shows the summary of the quiz after we finish answering all the questions*/}
</Stack.Navigator>
</NavigationContainer>
);
}

/*this defines each question for the quiz*/
const questions = [

/*this shows each question, the type of question, the choices, and the correct answer index*/
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
