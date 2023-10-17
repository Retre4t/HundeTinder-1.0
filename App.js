import React from "react";
import AppNavigator from "./NavigationBar";
import { ThemeProvider } from "react-native-rapi-ui";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './views/Front'; // Import your sign-in screen component


const firebaseConfig = {
  apiKey: "AIzaSyDqK3I6CeAIQydAhCjjWqbxD26pY5usAO8",
  authDomain: "hundetinder.firebaseapp.com",
  projectId: "hundetinder",
  storageBucket: "hundetinder.appspot.com",
  messagingSenderId: "503193003653",
  appId: "1:503193003653:web:7cf982e2bc482949996bec"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Dette er din hovedapp-komponent.

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="MainApp" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}