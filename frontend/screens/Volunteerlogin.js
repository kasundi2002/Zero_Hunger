import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const VolunteerLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');

    const handleLogin = async () => {
        if (!email || !nic) {
            Alert.alert('Error', 'Please enter both email and NIC');
            return;
        }

        try {
            const response = await fetch('http://192.168.8.169:5000/api/auth/volunteer-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    nic,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                Alert.alert('Success', 'Login successful');
                navigation.navigate('vdash');
            } else {
                Alert.alert('Error', data.message || 'Invalid credentials');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Volunteer Login</Text>

            <View style={styles.formContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />

                <TextInput
                    placeholder="NIC"
                    value={nic}
                    onChangeText={setNic}
                    style={styles.input}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
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
        padding: 16,
        backgroundColor:'#7dadb9'
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'#1f5184'
    },
    formContainer: {
        width: '85%',
        padding: 20,
        borderWidth: 2,
        borderColor: '#1f5184',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30, // Rounding the input borders
    },
    button: {
        backgroundColor: '#1f5184',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 10,
        fontSize: 14,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default VolunteerLogin;
