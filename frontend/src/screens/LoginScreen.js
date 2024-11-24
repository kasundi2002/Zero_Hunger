import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.8.169:5000/api/users/login', {
                email,
                password,
            });

            // Save token to AsyncStorage
            await AsyncStorage.setItem('token', response.data.token);

            if (email === 'admin@gmail.com') {
                navigation.navigate('AdminScreen', { email: response.data.user.email });
            } else {
                navigation.navigate('home', { email: response.data.user.email });
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            Alert.alert('Login Failed', message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Login</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
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
        alignItems: 'center', // Ensures the content is centered
        paddingHorizontal: 16,
        backgroundColor:'#7dadb9'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
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
    link: {
        marginTop: 16,
        color: 'blue',
        textAlign: 'center',
    },
});

export default LoginScreen;
