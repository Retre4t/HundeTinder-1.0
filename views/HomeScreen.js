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
    // Åbn en database og opret en tabel ved opstart af skærmen
    openDatabaseAndCreateTable();

    // Hent dyr fra databasen og opdater tilstanden med resultatet
    fetchAnimals().then((result) => setAnimals(result));
  }, []);

  // En funktion der kaldes når et dyr swipes
  const swiped = (direction, category) => {
    // Opdatere indekset for det aktuelle dyr
    setCurrentAnimalIndex(currentAnimalIndex + 1);
  };

  return (
    <View style={styles.container}>
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
