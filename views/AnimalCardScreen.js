// Importering af nødvendige biblioteker og komponenter
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';

// Importering af dyredata og komponenter
import data from '../database/data.js';
import AnimalCard from './AnimalCard.js';
import NoMoreAnimals from './NoMoreAnimals.js';

// Oprettelse af AnimalCardScreen-komponenten
const AnimalCardScreen = ({ navigation }) => {
  // Oprettelse af tilstande til at styre dyrevisning og brugerinteraktion
  const [animals, setAnimals] = useState([]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const [userDisLike, setUserDisLike] = useState([]);

  // Effekt til at indlæse dyredata ved komponentmontering
  useEffect(() => {
    setAnimals(data);
  }, []);

  // Funktion til at håndtere swipeaktioner
  function swiped(direction, category) {
    if (direction === 'right') setUserLike([...userLike, category]);
    else setUserDisLike([...userDisLike, category]);

    // Gå videre til næste dyr i arrayet
    setCurrentAnimalIndex(currentAnimalIndex + 1);
  }

  // Funktion til at håndtere venstreswipe
  function leftSwipe() {
    // Simuler en venstreswipe
    swiped('left', animals[currentAnimalIndex].category);
  }

  // Funktion til at håndtere højresvipe
  function rightSwipe() {
    // Simuler en højreswipe
    swiped('right', animals[currentAnimalIndex].category);
  }

  // Tjek om alle dyrene er blevet vist 
  if (currentAnimalIndex >= animals.length) {
    //Er alle dyrene blevet vist returneres NoMoreAnimals-komponenten
    return <NoMoreAnimals />;
  }

  // Hent det aktuelle dyr fra data
  const currentAnimal = animals[currentAnimalIndex];

  return (
    <Layout>
      {/* Vis AnimalCard-komponenten med det aktuelle dyr og swipehåndteringsfunktioner */}
      <AnimalCard
        currentAnimal={currentAnimal}
        swiped={swiped}
        leftSwipe={leftSwipe}
        rightSwipe={rightSwipe}
      />
    </Layout>
  );
};

// Oprettelse af stilarter (dette er ikke i øjeblikket i brug i koden)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimalCardScreen;
