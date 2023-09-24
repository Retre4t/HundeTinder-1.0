// index.js
import React from 'react';
import { AppRegistry } from 'react-native';
import NavigationBar from './NavigationBar'; // Import your Navigation component
//import Navigation from './NavigationBar'; // Import your Navigation component

const App = () => {
  return <NavigationBar />;
};

AppRegistry.registerComponent('HundeTinder', () => App); // Replace 'YourAppName' with your app's name


