import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const navigateToSignUp = () => {
  navigation.navigate('SignUpScreen');
};

  const handleSignIn = () => {
    if (email && password) {
      // Sign in the user using Firebase Authentication
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Successfully signed in, userCredential.user contains user information
          const user = userCredential.user;
          console.log('User signed in:', user);

          // Navigate to the main app screen on successful sign-in
          navigation.navigate('MainTabs');
        })
        .catch((error) => {
          // Handle authentication errors
          console.error('Error signing in:', error);
          alert('Sign-in failed. Please check your email and password.');
        });
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Up" onPress={navigateToSignUp} />

      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default SignInScreen;
