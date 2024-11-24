import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image,  } from 'react-native';
import Swiper from 'react-native-swiper';
import { Picker } from '@react-native-picker/picker';


//importing advertisements
import adv1 from "./../../assets/images/advertisements/adv1.jpg";
import adv2 from "./../../assets/images/advertisements/adv2.jpg";
import adv3 from "./../../assets/images/advertisements/adv3.jpg";
import adv4 from "./../../assets/images/advertisements/adv4.jpg";
import adv5 from "./../../assets/images/advertisements/adv5.jpg";

//importing badges

import bdg1 from "./../../assets/images/badges/badge1.jpg";
import bdg2 from "./../../assets/images/badges/badge2.jpg";
import bdg3 from "./../../assets/images/badges/badge3.jpg";
import bdg4 from "./../../assets/images/badges/badge4.jpg";
import bdg5 from "./../../assets/images/badges/badge5.jpg";


// Achievement Slideshow Component
const AchievementsSlideshow = () => (
  <Swiper showsButtons autoplay={true} autoplayTimeout={3}>
    <View style={styles.slide}>
      <Image
        source={ adv1 } // Replace with actual image URL or require(local image)
        style={styles.achievementImage}
      />
      <Text style={styles.achievementText}>You have fed 200 people this week!</Text>
    </View>

    <View style={styles.slide}>
      <Image
        source={ adv2 } // Replace with actual image URL or require(local image)
        style={styles.achievementImage}
      />
      <Text style={styles.achievementText}>You achieved the Top Donor badge!</Text>
    </View>

    <View style={styles.slide}>
      <Image
        source={ adv3 } // Replace with actual image URL or require(local image)
        style={styles.achievementImage}
      />
      <Text style={styles.achievementText}>You contributed to waste reduction by 50%</Text>
      </View>

      <View style={styles.slide}>
      <Image
        source={ adv4 } // Replace with actual image URL or require(local image)
        style={styles.achievementImage}
      />
      <Text style={styles.achievementText}>Congratulations</Text>
      </View>

      <View style={styles.slide}>
      <Image
        source={ adv5 } // Replace with actual image URL or require(local image)
        style={styles.achievementImage}
      />
      <Text style={styles.achievementText}>Good Job</Text>
    </View>
    
  </Swiper>
);

// Main Screen Component
const MyReportScreen = ({ navigation }) => {
  const [reportType, setReportType] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  
  const handleGenerateReport = () => {
    console.log(`handle Generate Report`);
    console.log('Navigating to MyReportDisplay with:', reportType, timeFrame);
    if (reportType && timeFrame) {
      // Navigate to MyReportDisplayScreen with the selected reportType and timeFrame
      navigation.navigate('MyReportDisplayScreen', { reportType, timeFrame });
    } else {
      alert('Please select both report type and time frame');
    }
  };

  return (
    <View style={styles.container}>
      {/* Achievements Slideshow */}
      <View style={styles.slideshowContainer}>
        <AchievementsSlideshow />
      </View>

      {/* Report Generation Section */}
      <View style={styles.reportSection}>
        <Text style={styles.reportTitle}>Choose the type of report you want to produce:</Text>
        <Picker
          selectedValue={reportType}
          style={styles.picker}
          onValueChange={(itemValue) => setReportType(itemValue)}
        >
          <Picker.Item label="Select a report" value="" />
          <Picker.Item label="My Food Distribution Summary" value="foodDistributionSummary" />
          <Picker.Item label="My Contributions" value="volunteerContributions" />
          <Picker.Item label="Contribution to Waste Reduction" value="wasteReduction" />
          {/* <Picker.Item label="Contribution to Orphanage Fulfillment" value="orphanageFulfillment" /> */}
        </Picker>

        <Text style={styles.reportTitle}>Would you like the report to cover a weekly, monthly, or yearly period?</Text>
        <Picker
          selectedValue={timeFrame}
          style={styles.picker}
          onValueChange={(itemValue) => setTimeFrame(itemValue)}
        >
          <Picker.Item label="Select a time frame" value="" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
          <Picker.Item label="Yearly" value="yearly" />
        </Picker>

        <Button title="Generate Report" onPress={handleGenerateReport} />
      </View>

      {/* Badges Section */}
      <View style={styles.badgeSection}>
        <Text style={styles.badgeTitle}>Your certificates and badges:</Text>
        <View style={styles.badgesContainer}>
          <Image source={bdg1} style={styles.badgeImage} />
          <Image source={bdg2} style={styles.badgeImage} />
          <Image source={bdg3} style={styles.badgeImage} />
          <Image source={bdg4} style={styles.badgeImage} />
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    padding: 20,
  },
  slideshowContainer: {
    height: 300,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementImage: {
    width: 250,  // Increase width for larger images
    height: 250, // Increase height for larger images
    marginBottom: 10,
  },
  achievementText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reportSection: {
    marginVertical: 20,
  },
  reportTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  badgeSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  badgeImage: {
    width: 60,
    height: 60,
    marginRight:10
  },
});

export default MyReportScreen;
