import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Linking,
    StyleSheet,
    ActivityIndicator,
    Image, // Import Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importing icon library for delete icon
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import the Picker
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused

const Adminfdlist = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [foodWastageList, setFoodWastageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused(); // Track whether the screen is focused

    const loadFonts = async () => {
        await Font.loadAsync({
            ProtestStrike: require('../assets/fonts/ProtestStrike.ttf'),
            'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        });
        setFontsLoaded(true);
    };

    const fetchFoodWastageDetails = async () => {
        try {
            const response = await axios.get('http://192.168.8.169:5000/api/auth/foodwastage');
            setFoodWastageList(response.data.data);
        } catch (error) {
            console.error('Error fetching food wastage details:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteFoodWastage = async (id) => {
        try {
            await axios.delete(`http://192.168.8.169:5000/api/auth/foodwastage/${id}`);
            // Remove the deleted item from the list
            const updatedList = foodWastageList.filter((item) => item._id !== id);
            setFoodWastageList(updatedList);
        } catch (error) {
            console.error('Error deleting food wastage:', error);
        }
    };

    const openGoogleMaps = (address) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`http://192.168.8.169:5000/api/auth/foodwastage/${id}`, {
                status: newStatus,
            });
            // Optionally refresh the list or update the state
            const updatedList = foodWastageList.map((item) =>
                item._id === id ? { ...item, status: newStatus } : item
            );
            setFoodWastageList(updatedList);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        loadFonts();
        if (isFocused) {
            fetchFoodWastageDetails(); // Fetch data when the screen is focused
        }
    }, [isFocused]); // Depend on isFocused to refetch data when navigating back

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Top Section with Logo and App Name */}
            <View style={styles.topSection}>
                <Image
                    source={require('../assets/logo.jpg')} // Replace with actual logo path
                    style={styles.logo}
                />
                <Text style={styles.appName}>Zero Hunger</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#2087f5" />
            ) : foodWastageList.length > 0 ? (
                foodWastageList.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.hotelName}>{item.hotelname}</Text>
                            {/* Delete Icon */}
                            <TouchableOpacity onPress={() => deleteFoodWastage(item._id)}>
                                <FontAwesome name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.ownerName}>Owner: {item.hotelowner}</Text>
                        <TouchableOpacity onPress={() => openGoogleMaps(item.address)}>
                            <Text style={styles.addressLabel}>Address:</Text>
                            <Text style={styles.link}>{item.address}</Text>
                        </TouchableOpacity>
                        <Text style={styles.peopleServed}>People Served: {item.people}</Text>
                        <Text style={styles.foodDescription}>Food Description: {item.foodDescription}</Text>
                        <Text style={styles.date}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
                        <Text style={styles.status}>Status: {item.status}</Text>

                        {/* Add the Picker for status change */}
                        <Picker
                            selectedValue={item.status}
                            style={styles.picker}
                            onValueChange={(itemValue) => updateStatus(item._id, itemValue)}
                        >
                            <Picker.Item label="No volunteer assigned" value="No volunteer assigned" />
                            <Picker.Item label="Volunteer assigned" value="Volunteer assigned" />
                            <Picker.Item label="Food collected" value="Food collected" />
                            <Picker.Item label="Food distributed" value="Food distributed" />
                        </Picker>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No food wastage details available.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#7dadb9',
    },
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'center',
        backgroundColor: '#3b6a9b',  // Background color for logo and name
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,  
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    appName: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'ProtestStrike',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginVertical: 15,
        borderRadius: 15,
        borderColor: '#00acc1',
        borderWidth: 1,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hotelName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00838f',
        marginBottom: 10,
        fontFamily: 'ProtestStrike',
    },
    ownerName: {
        fontSize: 18,
        color: '#4f4f4f',
        marginBottom: 5,
        fontFamily: 'OpenSans-Regular',
    },
    addressLabel: {
        fontSize: 16,
        color: '#00838f',
        fontFamily: 'OpenSans-Regular',
    },
    link: {
        fontSize: 16,
        color: '#0277bd',
        textDecorationLine: 'underline',
        fontFamily: 'OpenSans-Regular',
    },
    peopleServed: {
        fontSize: 16,
        color: '#444',
        marginVertical: 5,
        fontFamily: 'OpenSans-Regular',
    },
    foodDescription: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#6a1b9a',
        marginBottom: 5,
        fontFamily: 'OpenSans-Regular',
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
        fontFamily: 'OpenSans-Regular',
    },
    noDataText: {
        fontSize: 18,
        color: '#00796b',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'OpenSans-Regular',
    },
    status: {
        fontSize: 16,
        color: '#ff9800',
        marginVertical: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        marginVertical: 10,
    },
});

export default Adminfdlist;
