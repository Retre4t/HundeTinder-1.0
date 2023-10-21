import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Button } from 'react-native-rapi-ui';

const CategorySelect = ({ route, navigation }) => {
  const { selectedCategory, setCategory } = route.params; 

  const categories = ['All', 'Tiger', 'kategori1', 'kategori2']; 

  const selectCategory = (category) => {
    setCategory(category); 
    navigation.goBack(); 
  };

  return (
    <Layout>
      <Text>Select a category:</Text>
      <View style={styles.categoryButtons}>
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

const styles = StyleSheet.create({
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CategorySelect;