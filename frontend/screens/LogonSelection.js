import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginSelection = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Zero Hunger</Text>
            <Text style={styles.subtitle}>Select your login type</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Adminlog')}
            >
                <Text style={styles.buttonText}>Admin Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('vlogin')}
            >
                <Text style={styles.buttonText}>Volunteer Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OrgLog')}
            >
                <Text style={styles.buttonText}>Organization Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Restaurant/Hotel Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7dadb9', // Keep the violet background color
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
    subtitle: {
        fontSize: 18,
        color: '#e0e0e0',
        marginBottom: 30,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#1f5184',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginVertical: 10,
        width: '85%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#fff', // Adding a border for a polished look
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default LoginSelection;
