import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [fieldsEmpty, setFieldsEmpty] = useState(false);
  
    const handleContinuePress = () => {
      if (!email || !name || !password) {
        setFieldsEmpty(true);
        return;
      }
  
      // Continue with signup logic
      // You can send the data to your backend or perform any required actions here
  
      // For example, navigate to the HomeScreen
      navigation.navigate('Home');
    };
  
    const handleSkipPress = () => {
      // Navigate to the HomeScreen without performing signup
      navigation.navigate('Home');
    };
  
    return (
      <View style={styles.container}>
        {/* Skip button in the top right corner */}
        <TouchableOpacity onPress={handleSkipPress} style={styles.skipButton}>
          <Text>Skip</Text>
        </TouchableOpacity>
  
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
  
        {/* Error message for empty fields */}
        {fieldsEmpty && <Text style={styles.errorText}>Please input details.</Text>}
  
        {/* Continue button */}
        <Button title="Sign Up" onPress={handleContinuePress} />
  
        {/* Additional content can be placed here */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'orange', // Background color
      justifyContent: 'center', // Vertically center content
    },
    skipButton: {
      position: 'absolute',
      top: 16, // Adjust the top value as needed
      right: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
      backgroundColor: 'white', // Input background color
      borderRadius: 5, // Rounded corners
    },
    errorText: {
      color: 'red',
      marginBottom: 16,
    },
    continueButton: {
      backgroundColor: 'orange', // Button background color
      padding: 10,
      borderRadius: 5, // Rounded corners
    },
    continueButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
  
  export default SignupScreen;
  