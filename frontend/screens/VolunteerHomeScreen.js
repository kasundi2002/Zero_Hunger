import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the logout icon
import { useNavigation } from "@react-navigation/native";

const VolunteerHomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Loading fonts (this should be called always, no conditions)
  const [fontsLoaded] = useFonts({
    Caveat: require('../assets/fonts/Caveat-Regular.ttf'), // Ensure the path is correct
    Merriweather: require('../assets/fonts/Merriweather-Regular.ttf'),
    OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
  });

  const navigation = useNavigation();

  const slides = [
    {
      image: 'https://www.foodfromtheheart.sg/images/uploads/Food-from-the-Heart-clean-plate-campaign.jpg',
      description: 'Helping feed the needy by reducing food wastage.',
    },
    {
      image: 'https://www.leaders-mena.com/leaders/uploads/2024/07/Hunger.png',
      description: 'Join the fight against hunger by contributing excess food.',
    },
    {
      image: 'https://www.wfpusa.org/wp-content/uploads/2020/04/1_Bn5byGcZ3xuyh-ETX4MQcQ.jpeg',
      description: 'Together, we can end food insecurity one meal at a time.',
    },
  ];

  // Ensure fonts are loaded before rendering
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogout = () => {
    // Here, you can clear any tokens or authentication data if needed
    console.log('Logging out...');
    navigation.navigate('Loginselect'); // Navigate to LoginSelect screen
  };

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

        {/* Top right corner - logout icon */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={40} color="#34495e" />
        </TouchableOpacity>

        {/* Center content - rotating images and descriptions */}
        <Image source={{ uri: slides[currentIndex].image }} style={styles.image} />
        <Text style={styles.description}>{slides[currentIndex].description}</Text>

        {/* Motives of the app */}
        <View style={styles.motivesBox}>
          <Text style={styles.motivesTitle}>Our Motives</Text>
          <View style={styles.motiveItem}>
            <Text style={styles.motiveIcon}>🍽️</Text>
            <Text style={styles.motiveText}>Reduce food wastage by redistributing excess food.</Text>
          </View>
          <View style={styles.motiveItem}>
            <Text style={styles.motiveIcon}>🤝</Text>
            <Text style={styles.motiveText}>Help feed the needy and fight hunger.</Text>
          </View>
          <View style={styles.motiveItem}>
            <Text style={styles.motiveIcon}>🌍</Text>
            <Text style={styles.motiveText}>Build a community that supports food security.</Text>
          </View>
        </View>
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
    backgroundColor: "#7dadb9",
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
    borderRadius: 10,
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
    color: '#34495e',
    fontFamily: 'Caveat', // Custom font
  },
  logoutButton: {
    position: 'absolute',
    top: 40, // Adjust the top position to move it higher
    right: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 25,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#2c3e50',
    fontFamily: 'Merriweather', // Custom font
    marginBottom: 35,
  },
  motivesBox: {
    backgroundColor: '#f0f8ff',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 25,
  },
  motivesTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
    fontFamily: 'Merriweather', // Custom font
  },
  motiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  motiveIcon: {
    fontSize: 28,
    marginRight: 10,
  },
  motiveText: {
    fontSize: 18,
    color: '#34495e',
    fontFamily: 'OpenSans', // Custom font
  },
});

export default VolunteerHomeScreen;
