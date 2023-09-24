// Navigation.js
import React from 'react';
import  NavigationContainer  from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimalCardScreen from './views/AnimalCardScreen'; // Import your AnimalCardScreen component
import ProfileScreen from './views/profile'; // Import your ProfileScreen component
import IconButton from 'react-native-paper'; // Import IconButton from React Native Paper

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="AnimalCardScreen"
        tabBarOptions={{
          activeTintColor: '#007AFF', // Change the active tab color
          inactiveTintColor: 'gray', // Change the inactive tab color
        }}
      >
        <Tab.Screen
          name="AnimalCardScreen"
          component={AnimalCardScreen}
          options={{
            tabBarLabel: 'Animal Cards',
            tabBarIcon: ({ color }) => (
              <IconButton icon="cards" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <IconButton icon="account" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
