import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  // Validation schema using Yup with Google Maps URL validation for the address field
  const validationSchema = Yup.object().shape({
    hotelname: Yup.string().required('Hotel name is required'),
    hotelregistration: Yup.string().required('Hotel registration number is required'),
    hotelowner: Yup.string().required('Owner name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    nic: Yup.string().required('NIC is required'),
    address: Yup.string()
      .required('Address must be a valid Google Maps link')
      .required('Address (Google Maps link) is required'),
    mobileno: Yup.string()
      .required('Mobile number is required')
      .matches(/^\+?\d{10,14}$/, 'Mobile number is invalid'),
  });

  const handleSignUp = async (values) => {
    try {
      // Post the form data to your backend (URL is omitted based on your previous request)
      const response = await axios.post('http://192.168.8.169:5000/api/auth/register', values);
      Alert.alert('Sign Up Success', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.response?.data?.message || 'Server error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>Please enter your hotel details</Text>

        <Formik
          initialValues={{
            hotelname: '',
            hotelregistration: '',
            hotelowner: '',
            email: '',
            password: '',
            confirmPassword: '',
            nic: '',
            address: '',
            mobileno: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              {/* Hotel Name */}
              <TextInput
                style={styles.input}
                placeholder="Hotel Name"
                value={values.hotelname}
                onChangeText={handleChange('hotelname')}
                onBlur={handleBlur('hotelname')}
              />
              {errors.hotelname && <Text style={styles.error}>{errors.hotelname}</Text>}

              {/* Hotel Registration Number */}
              <TextInput
                style={styles.input}
                placeholder="Hotel Registration No"
                value={values.hotelregistration}
                onChangeText={handleChange('hotelregistration')}
                onBlur={handleBlur('hotelregistration')}
              />
              {errors.hotelregistration && <Text style={styles.error}>{errors.hotelregistration}</Text>}

              {/* Hotel Owner */}
              <TextInput
                style={styles.input}
                placeholder="Hotel Owner"
                value={values.hotelowner}
                onChangeText={handleChange('hotelowner')}
                onBlur={handleBlur('hotelowner')}
              />
              {errors.hotelowner && <Text style={styles.error}>{errors.hotelowner}</Text>}

              {/* Email */}
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}

              {/* Password */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}

              {/* Confirm Password */}
              <TextInput
                style={styles.input}
                placeholder="Re-enter Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

              {/* NIC */}
              <TextInput
                style={styles.input}
                placeholder="NIC"
                value={values.nic}
                onChangeText={handleChange('nic')}
                onBlur={handleBlur('nic')}
              />
              {errors.nic && <Text style={styles.error}>{errors.nic}</Text>}

              {/* Address (Google Maps link) */}
              <TextInput
                style={styles.input}
                placeholder="Address (Google Maps link)"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                autoCapitalize="none"
              />
              {errors.address && <Text style={styles.error}>{errors.address}</Text>}

              {/* Mobile No */}
              <TextInput
                style={styles.input}
                placeholder="Mobile No"
                value={values.mobileno}
                onChangeText={handleChange('mobileno')}
                onBlur={handleBlur('mobileno')}
                keyboardType="phone-pad"
              />
              {errors.mobileno && <Text style={styles.error}>{errors.mobileno}</Text>}

              {/* Submit Button */}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',  // Center the content horizontally
    paddingHorizontal: 16,
    paddingBottom: 20,
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
    padding: 20,
    width: '85%',
    alignItems: 'center',  // Center the form container horizontally
    borderWidth: 2,
    borderColor: '#1f5184', // Border color to match the button style
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',  // Center the form content vertically within the border
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
    backgroundColor: '#',
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
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default SignUpScreen;
