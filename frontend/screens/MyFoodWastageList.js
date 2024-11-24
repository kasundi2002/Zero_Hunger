import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused

const MyFoodWastageList = () => {
  const [foodWastageList, setFoodWastageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // This will return true if the screen is focused

  useEffect(() => {
    const fetchMyFoodWastageDetails = async () => {
      try {
        // Get the token from AsyncStorage (assuming it's stored after login)
        const token = await AsyncStorage.getItem('token');

        // Fetch food wastage details added by the logged-in user
        const response = await axios.get('http://192.168.8.169:5000/api/auth/foodwastage/mywastage', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFoodWastageList(response.data.data);
      } catch (error) {
        console.error('Error fetching user-specific food wastage details:', error);
      } finally {
        setLoading(false);
      }
    };

    // Refetch data when screen is focused
    if (isFocused) {
      fetchMyFoodWastageDetails();
    }
  }, [isFocused]); // Refetch data when isFocused changes

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top left corner - logo and app name */}
        <View style={styles.topLeft}>
          <Image source={require('../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.appName}>Zero Hunger</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2087f5" />
        ) : foodWastageList.length > 0 ? (
          foodWastageList.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.hotelName}>{item.hotelname}</Text>
              <Text style={styles.ownerName}>Owner: {item.hotelowner}</Text>
              <Text style={styles.peopleServed}>People Served: {item.people}</Text>
              <Text style={styles.foodDescription}>Food Description: {item.foodDescription}</Text>
              <Text style={styles.date}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>You have not added any food wastage details.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#7dadb9',
    paddingHorizontal: 16,
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
    backgroundColor: '#3b6a9b',  // Background color for logo and name
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,  // Rounded corners for aesthetics
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
    color: '#fff',
    fontFamily: 'Caveat', // Custom font
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
  hotelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00838f',
    marginBottom: 10,
  },
  ownerName: {
    fontSize: 18,
    color: '#4f4f4f',
    marginBottom: 5,
  },
  peopleServed: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
  },
  foodDescription: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6a1b9a',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#00796b',
    textAlign: 'center',
    marginTop: 20,
  },
  status: {
    fontSize: 16,
    color: '#ff9800',
    marginVertical: 5,
  },
});

export default MyFoodWastageList;
