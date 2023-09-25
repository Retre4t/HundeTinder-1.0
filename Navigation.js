import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimalCardScreen from './views/AnimalCardScreen.js';
import NoMoreAnimalsScreen from './views/NoMoreAnimals.js';
import SignupScreen from './views/signUp.js'; // Import the SignupScreen component
import HomeScreen from './views/HomeScreen.js'; // Import the SignupScreen component
import ProfileScreen from './views/profile'; // Import the ProfileScreen component

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AnimalCard">
        <Stack.Screen name="AnimalCardScreen" component={AnimalCardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} /> 
        <Stack.Screen name="NoMoreAnimals" component={NoMoreAnimalsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} /> {/* Move this line inside the Stack.Navigator */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;