import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons
import { useFonts } from 'expo-font';

const AddFoodWastage = () => {
    const [hotelData, setHotelData] = useState({
        hotelname: '',
        hotelowner: '',
        address: ''
    });
    const [formData, setFormData] = useState({
        people: '',
        foodDescription: ''
    });
    const [errorMessages, setErrorMessages] = useState({});
    
    const [fontsLoaded] = useFonts({
        Caveat: require('../assets/fonts/Caveat-Regular.ttf'),
        Merriweather: require('../assets/fonts/Merriweather-Regular.ttf'),
        OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
    });

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert('Error', 'No token found, unable to fetch hotel details');
                    return;
                }

                const response = await axios.get('http://192.168.8.169:5000/api/auth/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    const { hotelname, hotelowner, address } = response.data;
                    setHotelData({ hotelname, hotelowner, address });
                }
            } catch (error) {
                console.error('Error fetching hotel details:', error);
                Alert.alert('Error', 'Error fetching hotel details');
            }
        };

        fetchHotelData();
    }, []);

    const schema = Yup.object().shape({
        people: Yup.number().typeError('Must be a number').required('Number of people is required'),
        foodDescription: Yup.string().required('Food description is required')
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        setErrorMessages({});
        try {
            await schema.validate(formData, { abortEarly: false });

            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No token found, unable to submit details');
                return;
            }

            const response = await axios.post('http://192.168.8.169:5000/api/auth/foodwastage', {
                ...hotelData,
                ...formData,
                status: 'No volunteer assigned'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                Alert.alert('Success', 'Food wastage details submitted successfully!');
                setFormData({ people: '', foodDescription: '' });
            } else {
                Alert.alert('Error', 'Failed to submit food wastage details.');
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                let validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrorMessages(validationErrors);
            } else {
                console.error('Error submitting food wastage details:', error);
                Alert.alert('Error', 'Error submitting the details');
            }
        }
    };

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Top left corner - logo and app name */}
                <View style={styles.topLeft}>
                    <Image
                        source={require('../assets/logo.jpg')}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>Zero Hunger</Text>
                </View>

                {/* Heading for the form */}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Add Food Wastage</Text>
                </View>

                {/* Read-only hotel details */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={hotelData.hotelname}
                        placeholder="Hotel Name"
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={hotelData.hotelowner}
                        placeholder="Owner Name"
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={hotelData.address}
                        placeholder="Address"
                        editable={false}
                    />
                </View>

                {/* Input field for the number of people */}
                <View style={styles.inputContainer}>
                    <Icon name="people-outline" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={[styles.input, errorMessages.people ? styles.errorInput : null]}
                        placeholder="Number of People Food Can Serve"
                        value={formData.people}
                        onChangeText={(value) => handleChange('people', value)}
                        keyboardType="numeric"
                    />
                </View>
                {errorMessages.people && <Text style={styles.errorText}>{errorMessages.people}</Text>}

                {/* Input field for the food description */}
                <View style={styles.inputContainer}>
                    <Icon name="fast-food-outline" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={[styles.input, errorMessages.foodDescription ? styles.errorInput : null]}
                        placeholder="Food Description"
                        value={formData.foodDescription}
                        onChangeText={(value) => handleChange('foodDescription', value)}
                        multiline
                    />
                </View>
                {errorMessages.foodDescription && <Text style={styles.errorText}>{errorMessages.foodDescription}</Text>}

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#7dadb9',
    },
    container: {
        paddingTop: 20,
        backgroundColor: '#7dadb9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        paddingBottom: 40,
    },
    topLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        justifyContent: 'center',
        backgroundColor: '#3b6a9b', // Different blue background for the logo and app name
        paddingVertical: 10,
        borderRadius: 10, // Rounded corners for aesthetic
        paddingHorizontal: 15,
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
    headingContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#34495e',
        fontFamily: 'Caveat', // Custom font
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#e9ecef',
        marginBottom: 10,
        padding: 5,
        elevation: 2, // Adding shadow
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        paddingLeft: 5,
        borderRadius: 5,
        backgroundColor: '#e9ecef',
    },
    errorInput: {
        borderColor: 'red'
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    icon: {
        marginLeft: 10, // Space before the icon
    },
    button: {
        backgroundColor: '#1f5184',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Adding shadow for button
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddFoodWastage;
