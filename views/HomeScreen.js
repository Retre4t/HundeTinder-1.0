// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AnimalCard from './AnimalCard';
import signUp from './signUp';

import { openDatabaseAndCreateTable, fetchAnimals } from '../database/data';

const Tab = createBottomTabNavigator();


const HomeScreen = () => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);

  useEffect(() => {
    openDatabaseAndCreateTable();
    fetchAnimals().then((result) => setAnimals(result));
  }, []);

  const swiped = (direction, category) => {
    // Handle swipe logic and update state here
    // ...

    // Move to the next animal
    setCurrentAnimalIndex(currentAnimalIndex + 1);
  };

  // ...

  return (
    <View style={styles.container}>
      {/* Render AnimalCard component */}
      {currentAnimalIndex < animals.length && (
        <AnimalCard
          animal={animals[currentAnimalIndex]}
          onSwipe={swiped}
        />
        
      )}
      {/* Render buttons and other UI elements */}
      <Tab.Navigator>
      <Tab.Screen name="Find a match" component={AnimalCard} />
    </Tab.Navigator>
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ... other styles
});

export default HomeScreen;