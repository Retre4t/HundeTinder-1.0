import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button } from 'react-native-rapi-ui';

// Kategoriudvælgelses komponent giver brugeren mulighed for at vælge en kategori
const CategorySelect = ({ route, navigation }) => {
  const { selectedCategory, setCategory } = route.params;

  // Mulige kategorier, som brugeren kan vælge imellem
  const categories = ['All', 'Tiger', 'kategori1', 'kategori2'];

  // Funktion til at vælge en kategori og navigere tilbage til foregående visning
  const selectCategory = (category) => {
    setCategory(category);
    navigation.goBack();
  };

  return (
    <Layout>
      <Text>Select a category:</Text>
      <View style={styles.categoryButtons}>
        {/* Opret knapper for hver kategori og tilknyt funktionen som vælger kategorien */}
        {categories.map((category, index) => (
          <Button
            key={index}
            text={category}
            onPress={() => selectCategory(category)}
          />
        ))}
      </View>
    </Layout>
  );
};

// Stilarter for categoryselect komponenten.
const styles = StyleSheet.create({
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CategorySelect;
