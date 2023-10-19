import React from "react";
import AppNavigator from "./NavigationBar";
import { ThemeProvider } from "react-native-rapi-ui";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './views/SignIn'; // Import your sign-in screen component
import AnimalCard from './views/AnimalCardScreen'; // Import your sign-in screen component
import HomeScreen from './views/HomeScreen'; // Import your sign-in screen component


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

// Dette er din hovedapp-komponent.
export default function App() {
  return (
    // Jeg indpakker hele appen i ThemeProvider fra "react-native-rapi-ui".
    <ThemeProvider>
      {/* AppNavigator er ansvarlig for navigationen i appen. */}
      <AppNavigator />
    </ThemeProvider>
  );
}

