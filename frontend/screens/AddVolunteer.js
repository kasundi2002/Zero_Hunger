import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, ScrollView } from 'react-native';

const AddVolunteerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.8.169:5000/api/auth/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    nic,
                    phoneNumber,
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                Alert.alert('Success', 'Volunteer added successfully');
                // Clear the form
                setName('');
                setEmail('');
                setNic('');
                setPhoneNumber('');
            } else {
                Alert.alert('Error', data.message || 'Something went wrong');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add volunteer');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Add Volunteer</Text>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholderTextColor="#7A7A7A"
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholderTextColor="#7A7A7A"
                />
                <TextInput
                    placeholder="NIC"
                    value={nic}
                    onChangeText={setNic}
                    style={styles.input}
                    placeholderTextColor="#7A7A7A"
                />
                <TextInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={styles.input}
                    placeholderTextColor="#7A7A7A"
                    keyboardType="phone-pad"
                />
                <Button title="Add Volunteer" onPress={handleSubmit} color="#2D9CDB" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#7dadb9', // Slightly lighter background
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f5184',
        textAlign: 'center',
        marginVertical: 30,
        fontFamily: 'Arial',
        marginTop:80
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
        marginBottom: 30,
        marginTop:15
    },
    input: {
        height: 50,
        borderColor: '#D1D1D1',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
        fontSize: 16,
        color: '#333',
        fontFamily: 'Arial',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#1f5184',
        borderRadius: 10,
        padding: 12,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default AddVolunteerForm;
