import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  // State to hold the 6 digits
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<any>([]);
  const navigate: any = useNavigation();
  const handlePinChange = (index:any, value:any) => {
    if (/[^0-9]/.test(value)) return; // Prevent non-numeric input
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // If a digit is entered, focus the next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = () => {
    // Combine the 6 digits into a single PIN string
    const enteredPin = pin.join('');
    
    // Check against the desired PIN (542600)
    if (enteredPin === '542600') {
      Alert.alert('Success', 'You have logged in!');
      navigate.navigate('Dashboard');
    } else {
      Alert.alert('Error', 'Invalid PIN');
    }
  };

  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/img/logo.png")}></Image>
      <Text style={styles.title}>Enter 6-Digit PIN</Text>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.input,
              digit && styles.filledInput, // Style for input with value
            ]}
            value={digit}
            onChangeText={(value) => handlePinChange(index, value)}
            keyboardType="numeric"
            maxLength={1}
            secureTextEntry={true}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 100,
        borderRadius: 50,
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 25,  // Inline style for font size
        color: 'white',
        fontWeight: 'semibold',
      }, 
    
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
    borderColor: '#ccc',
  },
  filledInput: {
    borderColor: '#3b82f6', 
  },
  logo: {
    width: 200,
    height: 200,
},
});

export default Login;
