import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Image,ScrollView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // For navigation
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons

const Screen1 = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Navigation hook

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = await AsyncStorage.getItem('token'); // Get the token

            if (!token) {
                console.error('No token found, user may not be logged in');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://192.168.8.169:5000/api/auth/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserDetails(response.data); // Set user details
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    // Logout function
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token'); // Remove token from AsyncStorage
            Alert.alert('Logged Out', 'You have been logged out successfully.');
            navigation.replace('Loginselect'); // Navigate to login screen (replace removes current screen)
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            {/* Top left corner - logo and app name */}
            <View style={styles.topLeft}>
                <Image
                    source={require('../assets/logo.jpg')} // Path to your logo
                    style={styles.logo}
                />
                <Text style={styles.appName}>Zero Hunger</Text>
            </View>

            {userDetails ? (
                <>
                    <Text style={styles.header}>User Details</Text>
                    <View style={styles.card}>
                        <View style={styles.detailRow}>
                            <Icon name="home-outline" size={24} color="#333" />
                            <Text style={styles.text}>Hotel Name: <Text style={styles.bold}>{userDetails.hotelname}</Text></Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="person-outline" size={24} color="#333" />
                            <Text style={styles.text}>Hotel Owner: <Text style={styles.bold}>{userDetails.hotelowner}</Text></Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="mail-outline" size={24} color="#333" />
                            <Text style={styles.text}>Email: <Text style={styles.bold}>{userDetails.email}</Text></Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="id-card-outline" size={24} color="#333" />
                            <Text style={styles.text}>NIC: <Text style={styles.bold}>{userDetails.nic}</Text></Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="location-outline" size={24} color="#333" />
                            <Text style={styles.text}>Address: <Text style={styles.bold}>{userDetails.address}</Text></Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Icon name="call-outline" size={24} color="#333" />
                            <Text style={styles.text}>Mobile No: <Text style={styles.bold}>{userDetails.mobileno}</Text></Text>
                        </View>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.text}>No user data found</Text>
            )}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center items horizontally
        padding: 16,
        backgroundColor: '#7dadb9', // Light background color
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Match background color
    },
    topLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'center',
        backgroundColor: '#3b6a9b', // Different blue background for the logo and app name
        paddingVertical: 10,
        borderRadius: 10, // Rounded corners for aesthetic
        paddingHorizontal: 60,
        marginTop:10
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    appName: {
        fontSize: 28,
        fontWeight: '700',
        marginLeft: 10,
        color: '#ffffff', // White text for contrast
        fontFamily: 'Caveat', // Custom font
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3b6a9b', // Darker color for the header
        textAlign: 'center',
    },
    card: {
        width: '90%',
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginLeft: 10, // Space between icon and text
        color: '#555', // Gray color for the text
    },
    bold: {
        fontWeight: 'bold', // Bold for specific text
    },
    logoutButton: {
        backgroundColor: '#ff5757', // Red color for logout button
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Screen1;
