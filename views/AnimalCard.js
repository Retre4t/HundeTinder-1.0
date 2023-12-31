import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; 
import TinderCard from 'react-tinder-card';

// Komponenten animalcard modtager data og funktioner som props.
const AnimalCard = ({ currentAnimal, swiped, leftSwipe, rightSwipe }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text>Tinder Cards</Text>

        {/* Tindercard komponentet bruges til at lave swipe-funktionen. */}
        <TinderCard
          key={currentAnimal.name}
          onSwipe={(direction) => swiped(direction, currentAnimal.category)}
          onCardLeftScreen={() => leftSwipe()}
        >
          <View
            style={{
              width: 300,
              height: 400,
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Viser et billede fra et URL og dyrets navn. */}
            <Image
              source={{ uri: currentAnimal.imgURL }}
              style={{ width: 200, height: 200 }}
            />
            <Text>{currentAnimal.name}</Text>
          </View>
        </TinderCard>
      </View>

      <View style={styles.buttonContainer}>
        {/* To knapper til at markere "No" og "Yes" for dyret. */}
        <TouchableOpacity style={styles.noButton} onPress={leftSwipe}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.yesButton} onPress={rightSwipe}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Laver et stylesheet, der beskriver layout og stil for animalcard komponentet.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Stilarter for kortet og billede af dyret.
  card: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
    backgroundColor: 'lightgray',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  // Stilarter for "No" og "Yes" knapper.
  noButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 30,
    width: 80,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 30,
    width: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AnimalCard;
