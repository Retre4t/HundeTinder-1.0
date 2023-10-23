import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Layout } from 'react-native-rapi-ui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Funktion til at kontrollere om en e-mail allerede er i brug
const isEmailInUse = async (email) => {
  const result = await firebase
    .auth()
    .fetchSignInMethodsForEmail(email);
  return result.length > 0;
};

const SignUpScreen = ({ navigation }) => {
  // Opretter tilstande for e-mail, navn og adgangskode
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Tilstande til at håndtere fejl og succes beskeder
  const [fieldsEmpty, setFieldsEmpty] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  // Funktion til at håndtere tryk på "Continue" knappen
  const handleContinuePress = async () => {
    if (!email || !name || !password) {
      setFieldsEmpty(true);
      return;
    }

    try {
      // Kontrollerer om e-mailen allerede er i brug
      const emailInUse = await isEmailInUse(email);

      if (emailInUse) {
        alert('Email is already in use. Please use a different email.');
        return;
      } else {
        // Opretter bruger og brugerprofil
        await createUserAndProfile(email, password, name);

        // Angiver at kontoen er oprettet og navigerer til tilmeldingsskærmen
        setAccountCreated(true);
        alert('Account created!');
        navigation.navigate('SignInScreen');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Error signing up: ' + error.message);
    }
  };

  // Funktion til at oprette bruger og brugerprofil
  const createUserAndProfile = async (email, password, name) => {
    try {
      // Opretter bruger med e-mail og adgangskode
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Opdaterer brugerens profiloplysninger med navn
      const user = userCredential.user;
      if (user) {
        await user.updateProfile({ displayName: name });
      }

      // Opretter en brugerprofil i Firestore-databasen
      const profilesCollection = firebase.firestore().collection('profiles');
      const newProfileDoc = profilesCollection.doc(user.uid);

      const profileData = {
        name: name,
        email: email,
      };

      await newProfileDoc.set(profileData);
    } catch (error) {
      console.error('Error creating user and profile:', error.message);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {/*...*/}
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
        {/*...*/}
        <Button title="Sign Up" onPress={handleContinuePress} /> // Udfør tilmelding ved tryk på knappen
        {/*...*/}
        {fieldsEmpty && <Text style={styles.errorText}>Please input details.</Text>} // Vis fejlmeddelelse, hvis felter er tomme
        {/*...*/}
        {accountCreated && <Text style={styles.successText}>Account created!</Text>} // Vis besked om, at kontoen er oprettet
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
