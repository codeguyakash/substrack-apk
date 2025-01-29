import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Sample data for expired subscriptions
const expiredSubscriptions = [
    {
        id: '1',
        customerName: 'Michael Scott',
        subscriptionName: 'Premium Plan',
        phoneNumber: '111-222-3333',
        email: 'michael.scott@dundermifflin.com',
        expiryDate: '2023-12-01',
    },
    {
        id: '2',
        customerName: 'Dwight Schrute',
        subscriptionName: 'Basic Plan',
        phoneNumber: '444-555-6666',
        email: 'dwight.schrute@dundermifflin.com',
        expiryDate: '2024-01-15',
    },
    {
        id: '3',
        customerName: 'Pam Beesly',
        subscriptionName: 'Standard Plan',
        phoneNumber: '777-888-9999',
        email: 'pam.beesly@dundermifflin.com',
        expiryDate: '2024-02-10',
    },
];

const Expire = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expired Subscriptions</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Plan</Text>
                <Text style={styles.headerText}>Phone</Text>
                <Text style={styles.headerText}>Expiry</Text>
            </View>

            {/* Expired Subscription List */}
            <FlatList
                data={expiredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.cell}>{item.customerName}</Text>
                        <Text style={styles.cell}>{item.subscriptionName}</Text>
                        <Text style={styles.cell}>{item.phoneNumber}</Text>
                        <Text style={styles.expiredCell}>{item.expiryDate}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#d9534f', // Red background for expired subscriptions
        padding: 10,
        borderRadius: 5,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        elevation: 2,
    },
    cell: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    expiredCell: {
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
        color: '#d9534f', // Red text for expired dates
        fontWeight: 'bold',
    },
});

export default Expire;
