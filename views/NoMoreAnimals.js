import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoMoreAnimals = () => {
  return (
    <View style={styles.container}>
      <Text>No more animals to show.</Text>
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

export default NoMoreAnimals;
