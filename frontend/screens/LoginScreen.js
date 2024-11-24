import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.8.169:5000/api/auth/login', {
                email,
                password,
            });

            // Save token to AsyncStorage
            await AsyncStorage.setItem('token', response.data.token);

            // Navigate to MainTabs after login
            navigation.navigate('MainTabs', { hotelowner: response.data.user.hotelowner });

        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            Alert.alert('Login Failed', message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Restaurant/Hotel Login</Text>

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Please enter your login credentials</Text>
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

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.link}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7dadb9', // Violet background
        padding: 20,
    },
    title: {
        fontSize: 30,
        color: '#1f5184',
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    formContainer: {
        padding: 20,
        width: '85%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1f5184', // Border color to match the button style
        borderRadius: 10,
        backgroundColor: '#fff', // Add background color to make it stand out
    },
    subtitle: {
        fontSize: 18,
        color: '#1f5184',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 30,
    },
    button: {
        backgroundColor: '#1f5184',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    link: {
        marginTop: 16,
        color: 'blue',
        textAlign: 'center',
    },
});

export default LoginScreen;
