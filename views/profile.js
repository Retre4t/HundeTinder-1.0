import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    age: '',
    bio: '',
    picture: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDoc = firebase.firestore().collection('users').doc(user.uid);
      userDoc.get().then((userData) => {
        if (userData.exists) {
          setUserProfile(userData.data());
        }
      });
    }
  }, []);

  const saveProfileChanges = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDoc = firebase.firestore().collection('users').doc(user.uid);
      await userDoc.set(userProfile, { merge: true });
      setIsEditing(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: userProfile.picture }} style={styles.profileImage} />

          {isEditing ? (
            <>
              <TextInput
                placeholder="Name"
                value={userProfile.name}
                onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={userProfile.email}
                onChangeText={(text) => setUserProfile({ ...userProfile, email: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Age"
                value={userProfile.age}
                onChangeText={(text) => setUserProfile({ ...userProfile, age: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Bio"
                value={userProfile.bio}
                onChangeText={(text) => setUserProfile({ ...userProfile, bio: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="Picture URL"
                value={userProfile.imgURL}
                onChangeText={(text) => setUserProfile({ ...userProfile, imgURl: text })}
                style={styles.input}
              />
               <TextInput
                placeholder="Race"
                value={userProfile.Race}
                onChangeText={(text) => setUserProfile({ ...userProfile, Race: text })}
                style={styles.input}
              />
            </>
          ) : (
            <>
              <Text style={styles.name}>{userProfile.name}</Text>
              <Text style={styles.email}>{userProfile.email}</Text>
              <Text style={styles.age}>Age: {userProfile.age}</Text>
              <Text style={styles.bio}>{userProfile.bio}</Text>
              <Text style={styles.imgURl}>{userProfile.imgURL}</Text>
              <Text style={styles.Race}>{userProfile.Race}</Text>
            </>
          )}

          {isEditing && (
            <Button title="Save" onPress={saveProfileChanges} style={styles.saveButton} />
          )}

          <Button
            title={isEditing ? 'Cancel' : 'Edit'}
            onPress={() => setIsEditing(!isEditing)}
          />
        </View>
      </View>
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', 
  },
  profileInfo: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white', 
    borderRadius: 10,
    elevation: 4, 
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, 
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'orange', 
    padding: 10,
    borderRadius: 5, 
  },
});

export default ProfileScreen;
