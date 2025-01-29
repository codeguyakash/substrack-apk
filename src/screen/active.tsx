import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Pressable, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Sample data for active subscriptions
const activeSubscriptions = [
    { id: '1', customerName: 'John Doe', subscriptionName: 'Netflix', duration: '1 Month', phoneNumber: '123-456-7890', email: 'john.doe@example.com', expiryDate: '2025-12-31' },
    { id: '2', customerName: 'Jane Smith', subscriptionName: 'Prime Video', duration: '3 Month', phoneNumber: '987-654-3210', email: 'jane.smith@example.com', expiryDate: '2025-06-15' },
    { id: '3', customerName: 'Alice Johnson', subscriptionName: 'Sonyliv', duration: '6 Month', phoneNumber: '456-789-1234', email: 'alice.johnson@example.com', expiryDate: '2025-09-20' },
    { id: '4', customerName: 'Bob Williams', subscriptionName: 'Hotstar', duration: '1 Year', phoneNumber: '789-456-1230', email: 'bob.williams@example.com', expiryDate: '2025-04-10' },
];

const Active = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSubscriptions, setFilteredSubscriptions] = useState(activeSubscriptions);
    const [selectedSubscription, setSelectedSubscription] = useState('None');
    const [selectedDuration, setSelectedDuration] = useState('None');
    const [modalVisible, setModalVisible] = useState(false);
    const [filterType, setFilterType] = useState('');
    const navigation = useNavigation();

    // Function to filter customers based on search query
    const handleSearch = (text: string) => {
        setSearchQuery(text);

        // If there is search input, ignore filters and show results based on search query
        if (text === '') {
            filterSubscriptions(selectedSubscription, selectedDuration, text); // Reset filters if search is cleared
        } else {
            // Reset filters and show search results
            setSelectedSubscription('None');
            setSelectedDuration('None');
            filterSubscriptions('None', 'None', text);
        }
    };

    // Function to filter customers based on selected filters
    const filterSubscriptions = (subscription: string, duration: string, search: string) => {
        let filtered = activeSubscriptions;

        // Apply Subscription filter if not 'None'
        if (subscription !== 'None') {
            filtered = filtered.filter(item => item.subscriptionName === subscription);
        }

        // Apply Duration filter if not 'None'
        if (duration !== 'None') {
            filtered = filtered.filter(item => item.duration === duration);
        }

        // Apply Search filter
        if (search !== '') {
            filtered = filtered.filter(item => item.customerName.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredSubscriptions(filtered);
    };

    // Function to sort customers by expiry date (soonest first)
    const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) =>
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
    );

    // Function to handle WhatsApp redirect
    const handleWhatsAppRedirect = (phoneNumber: string) => {
        const phone = phoneNumber.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const url = `whatsapp://send?phone=${phone}`;
        Linking.openURL(url)
            .catch((err) => alert('Could not open WhatsApp, please check if it is installed.'));
    };

    // Navigate to customer details screen on click
    const handleCustomerClick = (customerId: string) => {
        navigation.navigate('CustomerDetails', { customerId });
    };

    // Filter Modals
    const renderFilterModal = () => {
        const options = filterType === 'Subscription'
            ? ['None', 'Netflix', 'Prime Video', 'Sonyliv', 'Hotstar']
            : ['None', '1 Month', '3 Month', '6 Month', '1 Year'];

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select {filterType}</Text>
                        {options.map((option, index) => (
                            <Pressable
                                key={index}
                                style={styles.modalOption}
                                onPress={() => {
                                    if (filterType === 'Subscription') {
                                        setSelectedSubscription(option);
                                    } else if (filterType === 'Duration') {
                                        setSelectedDuration(option);
                                    }
                                    filterSubscriptions(
                                        filterType === 'Subscription' ? option : selectedSubscription,
                                        filterType === 'Duration' ? option : selectedDuration,
                                        searchQuery
                                    );
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{option}</Text>
                            </Pressable>
                        ))}
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Subscriptions</Text>

            {/* Search Input */}
            <TextInput
                style={styles.input}
                placeholder="Search by customer name"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                        setFilterType('Subscription');
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.filterText}>Subscription</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                        setFilterType('Duration');
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.filterText}>Duration</Text>
                </TouchableOpacity>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Plan</Text>
                <Text style={styles.headerText}>Expiry</Text>
                <Text style={styles.headerText}>Contact</Text>
            </View>

            {/* Subscription List */}
            <FlatList
                data={sortedSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <TouchableOpacity
                            onPress={() => handleCustomerClick(item.id)}
                            style={styles.cell}
                        >
                            <Text style={styles.customerName}>{item.customerName}</Text>
                        </TouchableOpacity>
                        <Text style={styles.cell}>{item.subscriptionName}</Text>
                        <Text style={styles.cell}>{item.expiryDate}</Text>
                        <TouchableOpacity
                            style={styles.contactButton}
                            onPress={() => handleWhatsAppRedirect(item.phoneNumber)}
                        >
                            <Text style={styles.contactText}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Render the filter modal */}
            {renderFilterModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    filterButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    filterText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4CAF50',
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
    customerName: {
        color: '#007BFF', // Makes the customer name a clickable link
    },
    contactButton: {
        backgroundColor: '#25D366', // WhatsApp green color
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    contactText: {
        color: 'white',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalOptionText: {
        fontSize: 16,
    },
    closeButton: {
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Active;
