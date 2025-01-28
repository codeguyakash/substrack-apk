import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation:any = useNavigation();

    const handleNavigation = (page:any) => {
        // Navigate to the page based on the button clicked
        navigation.navigate(page);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            
            <View style={styles.grid}>
                {/* Create 6 buttons */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('Form')}
                >
                    <Text style={styles.buttonText}>Enter Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('CustomerDetails')}
                >
                    <Text style={styles.buttonText}>Customer Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('Active')}
                >
                    <Text style={styles.buttonText}>Active</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('Expire')}
                >
                    <Text style={styles.buttonText}>Expire</Text>
                </TouchableOpacity>

       
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        width: '40%',  // Adjust the width of each button
        margin: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Dashboard;
