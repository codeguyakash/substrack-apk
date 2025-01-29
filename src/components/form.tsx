import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Form: React.FC = ({ navigation }: any) => {
    const [customerName, setCustomerName] = useState<string>('');
    const [subscriptionName, setSubscriptionName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subscriptionDuration, setSubscriptionDuration] = useState<string>('1 month');
    const [purchaseDate, setPurchaseDate] = useState<string>('');

    // Function to validate date format (YYYY-MM-DD)
    const validateDate = (date: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    // Form Submission Handler
    const handleSubmit = async () => {

        const expiryDate = new Date(purchaseDate);
        
        if (!customerName || !subscriptionName || !phoneNumber || !email || !purchaseDate) {
            Alert.alert("Please fill all fields.");
            return;
        }

        if (!validateDate(purchaseDate)) {
            Alert.alert("Please enter a valid date in YYYY-MM-DD format");
            return;
        }
        try {
            let response = await firestore().collection('subscriptions').add({
                customerName,
                subscriptionName,
                phoneNumber,
                email,
                subscriptionDuration,
                purchaseDate,
                expiryDate,
                status: 'active', // You can set 'active' status, and later determine expiration
            });
            console.log(response);
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        const formattedDate = new Date(purchaseDate);

        // Navigate to CustomerDetails Page with Data
        navigation.navigate('CustomerDetails', {
            customerName,
            subscriptionName,
            phoneNumber,
            email,
            subscriptionDuration,
            purchaseDate: formattedDate,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subscription Form</Text>

            <TextInput style={styles.input} placeholder="Customer Name" value={customerName} onChangeText={setCustomerName} />
            <TextInput style={styles.input} placeholder="Subscription Name" value={subscriptionName} onChangeText={setSubscriptionName} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
            <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Subscription Duration" value={subscriptionDuration} onChangeText={setSubscriptionDuration} />
            <TextInput style={styles.input} placeholder="Enter Date (YYYY-MM-DD)" value={purchaseDate} onChangeText={setPurchaseDate} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingLeft: 10, borderRadius: 5 },
    button: { backgroundColor: '#4CAF50', paddingVertical: 15, borderRadius: 5, marginTop: 20, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18 },
});

export default Form;
