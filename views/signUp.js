import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Function to check if the email is already in use
const isEmailInUse = async (email) => {
  const result = await firebase
    .auth()
    .fetchSignInMethodsForEmail(email);
  return result.length > 0;
};

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const handleContinuePress = async () => {
    if (!email || !name || !password) {
      setFieldsEmpty(true);
      return;
    }

    try {
      // Check if the email is already in use
      const emailInUse = await isEmailInUse(email);

      if (emailInUse) {
        alert('Email is already in use. Please use a different email.');
        return;
      } else {
        // Create a new user and profile with Firebase
        await createUserAndProfile(email, password, name);

        // Set the account created state
        setAccountCreated(true);

        alert('Account created!');
        navigation.navigate('SignInScreen');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up: ' + error.message);
      // Handle the error, display an alert, or show an error message
    }
  };

  // Function to create a new user and profile
  const createUserAndProfile = async (email, password, name) => {
    try {
      // Create a new user with Firebase Authentication
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Get the user object from the userCredential
      const user = userCredential.user;

      // Update the user's display name (name) in Firebase
      if (user) {
        await user.updateProfile({ displayName: name });
      }

      // Create a new document in the "profiles" collection with a unique ID
      const profilesCollection = firebase.firestore().collection('profiles');
      const newProfileDoc = profilesCollection.doc(user.uid);

      // Set the data for the profile document
      const profileData = {
        name: name,
        email: email,
        // Add more profile data fields as needed
      };

      await newProfileDoc.set(profileData);
    } catch (error) {
      console.error('Error creating user and profile:', error.message);
      // Handle the error, display an alert, or show an error message
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {/* Input fields for email, name, and password */}
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          style={styles.input}
        />
        {/* Continue button */}
        <Button title="Sign Up" onPress={handleContinuePress} />

        {/* Error message for empty fields */}
        {fieldsEmpty && <Text style={styles.errorText}>Please input details.</Text>}

        {/* Account created message (optional) */}
        {accountCreated && <Text style={styles.successText}>Account created!</Text>}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'orange',
    justifyContent: 'center',
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
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  successText: {
    color: 'green',
    marginBottom: 16,
  },
});

export default SignUpScreen;
