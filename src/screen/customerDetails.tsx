import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomerDetails: React.FC = ({ route }: any) => {
    // Ensure `route.params` exists to avoid crashes
    const {
        customerName = 'N/A',
        subscriptionName = 'N/A',
        phoneNumber = 'N/A',
        email = 'N/A',
        subscriptionDuration = 'N/A',
        purchaseDate = new Date().toDateString(),
    } = route.params || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Details</Text>

            <View style={styles.detailsContainer}>
                <Text style={styles.text}>Customer Name: {customerName}</Text>
                <Text style={styles.text}>Subscription Name: {subscriptionName}</Text>
                <Text style={styles.text}>Phone Number: {phoneNumber}</Text>
                <Text style={styles.text}>Email Address: {email}</Text>
                <Text style={styles.text}>Subscription Duration: {subscriptionDuration}</Text>
                <Text style={styles.text}>Date of Purchase: {purchaseDate.toString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'flex-start', alignItems: 'flex-start' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', width: '100%' },
    detailsContainer: { width: '100%', paddingHorizontal: 10 },
    text: { fontSize: 18, marginVertical: 5 },
});

export default CustomerDetails;
