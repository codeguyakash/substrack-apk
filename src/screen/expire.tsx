import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Expire = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expire</Text>
            <Text style={styles.text}>This is the expire page</Text>
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

export default Expire;