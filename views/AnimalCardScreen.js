// AnimalCardScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import data from '../database/data.js';
import AnimalCard from './AnimalCard.js';
import NoMoreAnimals from './NoMoreAnimals.js';


const AnimalCardScreen = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const [userDisLike, setUserDisLike] = useState([]);

  useEffect(() => {
    setAnimals(data);
  }, []);

  function swiped(direction, category) {
    if (direction === 'right') setUserLike([...userLike, category]);
    else setUserDisLike([...userDisLike, category]);

    // Move to the next animal in the array
    setCurrentAnimalIndex(currentAnimalIndex + 1);
  }

  function leftSwipe() {
    // Simulate a left swipe
    swiped('left', animals[currentAnimalIndex].category);
  }

  function rightSwipe() {
    // Simulate a right swipe
    swiped('right', animals[currentAnimalIndex].category);
  }

  if (currentAnimalIndex >= animals.length) {
    return <NoMoreAnimals/>;
  }

  const currentAnimal = animals[currentAnimalIndex];

  return (
    <AnimalCard
      currentAnimal={currentAnimal}
      swiped={swiped}
      leftSwipe={leftSwipe}
      rightSwipe={rightSwipe}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimalCardScreen;
