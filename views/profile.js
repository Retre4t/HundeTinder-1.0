import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  // Dummy user profile data
  const userProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 24,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida magna non ex blandit, in euismod erat convallis.',
    picture: 'https://www.akc.org/wp-content/uploads/2017/11/Whippet-puppy.jpg'
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: userProfile.picture }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
        <Text style={styles.age}>Age: {userProfile.age}</Text>
        <Text style={styles.bio}>{userProfile.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Background color
  },
  profileInfo: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white', // Profile info background color
    borderRadius: 10,
    elevation: 4, // Shadow
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it a circle
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  age: {
    fontSize: 16,
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProfileScreen;
