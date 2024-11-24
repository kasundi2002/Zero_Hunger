import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('./../../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.appName}>Zero Hunger</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Image source={require('./../../assets/images/img2.jpg')} style={styles.bannerImage} />
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Contribution at a Glance</Text>
          
          {/* Contribution Summary */}
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Meals Distributed</Text>
            <Text style={styles.statValue}>1,245</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>People Served this Month</Text>
            <Text style={styles.statValue}>320</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Waste Reduced</Text>
            <Text style={styles.statValue}>540 kg</Text>
          </View>

          <TouchableOpacity style={styles.myReportButton} onPress={() => navigation.navigate('ReportSelection')}>
            <Text style={styles.myReportButtonText}>Go to Reports Section</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7dadb9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'center',
    backgroundColor: '#3b6a9b',  // Background color for logo and name
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10, 
    marginTop:15,
    marginRight:16,
    marginLeft:16
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  statsSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 16,
    color: '#333',
  },
  myReportButton: {
    marginTop: 20,
    backgroundColor: '#0288D1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  myReportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#3B5998',
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
