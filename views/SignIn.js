import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const SignInScreen = ({ navigation }) => {
  // Opretter tilstande til e-mail og adgangskode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Naviger til tilmeldingsskærmen
  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  // Funktion til at håndtere brugerens login
  const handleSignIn = () => {
    if (email && password) { // Kontrollerer om e-mail og adgangskode er udfyldt
      // Log ind med brugerens e-mail og adgangskode
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User signed in:', user);

          // Naviger til hovedskærmen efter vellykket login
          navigation.navigate('MainTabs');
        })
        .catch((error) => {
          console.error('Error signing in:', error);
          alert('Sign-in failed. Please check your email and password.'); // Vis en fejlmeddelelse ved loginfejl
        });
    } else {
      alert('Please enter a valid email and password.'); // Vis en meddelelse vis der indtastes en gyldig e-mail og adgangskode
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
          secureTextEntry // Skjul adgangskoden under indtastning
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Sign In" onPress={handleSignIn} /> // Udfør login ved tryk på knappen
        <Button title="Sign Up" onPress={navigateToSignUp} /> // Naviger til tilmeldingsskærmen ved tryk på knappen
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
