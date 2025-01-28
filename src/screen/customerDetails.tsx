import { View, Text, StyleSheet } from 'react-native';

const CustomerDetails = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Details</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
    },
});

export default CustomerDetails;