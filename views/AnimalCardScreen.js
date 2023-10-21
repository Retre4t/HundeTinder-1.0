

import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app';
import NoMoreAnimals from '../views/NoMoreAnimals';
import AnimalCard from '../views/AnimalCard';
import { useNavigation } from '@react-navigation/native'; 

const AnimalCardScreen = () => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const [userDisLike, setUserDisLike] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); 

  const navigation = useNavigation(); 

  useEffect(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyDqK3I6CeAIQydAhCjjWqbxD26pY5usAO8",
        authDomain: "hundetinder.firebaseapp.com",
        projectId: "hundetinder",
        storageBucket: "hundetinder.appspot.com",
        messagingSenderId: "503193003653",
        appId: "1:503193003653:web:7cf982e2bc482949996bec"
      };
      
    }

    const db = firebase.firestore();
    let query = db.collection('users');

    if (selectedCategory !== 'All') {
      query = query.where('category', '==', selectedCategory);
    }

    query.get().then((querySnapshot) => {
      const animalData = [];
      querySnapshot.forEach((doc) => {
        animalData.push({ id: doc.id, ...doc.data() });
      });
      setAnimals(animalData);
    });
  }, [selectedCategory]);

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

  const openCategorySelect = () => {
    navigation.navigate('CategorySelect', {
      selectedCategory,
      setCategory: setSelectedCategory,
    });
  };

  return (
    <Layout>
      <AnimalCard
        currentAnimal={currentAnimal}
        swiped={swiped}
        leftSwipe={leftSwipe}
        rightSwipe={rightSwipe}
      />
      <View style={styles.settingsButton}>
        <Button text="Settings" onPress={openCategorySelect} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default AnimalCardScreen;
