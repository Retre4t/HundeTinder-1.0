import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AnimalCard from './AnimalCard';
import signUp from './SignUp';

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
    
    setCurrentAnimalIndex(currentAnimalIndex + 1);
  };

  return (
    <View style={styles.container}>
      {}
      {currentAnimalIndex < animals.length && (
        <AnimalCard
          animal={animals[currentAnimalIndex]}
          onSwipe={swiped}
        />
        
      )}
      {/* ... */}
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
});

export default HomeScreen;