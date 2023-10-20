import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app'; // Import Firebase
import NoMoreAnimals from '../views/NoMoreAnimals';
import AnimalCard from '../views/AnimalCard';

const AnimalCardScreen = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const [userDisLike, setUserDisLike] = useState([]);

  useEffect(() => {
    // Initialize Firebase (if not already done)
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyDqK3I6CeAIQydAhCjjWqbxD26pY5usAO8",
        authDomain: "hundetinder.firebaseapp.com",
        projectId: "hundetinder",
        storageBucket: "hundetinder.appspot.com",
        messagingSenderId: "503193003653",
        appId: "1:503193003653:web:7cf982e2bc482949996bec"
      };
      firebase.initializeApp(firebaseConfig);
    }

    // Fetch animals from Firebase Firestore
    const db = firebase.firestore();
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        const animalData = [];
        querySnapshot.forEach((doc) => {
          animalData.push({ id: doc.id, ...doc.data() });
        });
        setAnimals(animalData);
      });
  }, []);

  function swiped(direction, category) {
    if (direction === 'right') setUserLike([...userLike, category]);
    else setUserDisLike([...userDisLike, category]);

    setCurrentAnimalIndex(currentAnimalIndex + 1);
  }

  function leftSwipe() {
    swiped('left', animals[currentAnimalIndex].category);
  }

  function rightSwipe() {
    swiped('right', animals[currentAnimalIndex].category);
  }

  if (currentAnimalIndex >= animals.length) {
    return <NoMoreAnimals />;
  }

  const currentAnimal = animals[currentAnimalIndex];

  return (
    <Layout>
      <AnimalCard
        currentAnimal={currentAnimal}
        swiped={swiped}
        leftSwipe={leftSwipe}
        rightSwipe={rightSwipe}
      />
    </Layout>
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
