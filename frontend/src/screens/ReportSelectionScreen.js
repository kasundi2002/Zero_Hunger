import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

import Swiper from 'react-native-swiper';

import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import img4 from '../../assets/images/img4.jpg';
import img5 from '../../assets/images/img5.jpg';

const ImageSlideshow = () => (
  <Swiper showsButtons autoplay={true} autoplayTimeout={3}>
    <View style={styles.slide}>
      <Image
        source={img1} 
        style={styles.achievementImage}
      />
    </View>
    <View style={styles.slide}>
      <Image
        source={img2}
        style={styles.achievementImage}
      />
    </View>
    <View style={styles.slide}>
      <Image
        source={img3}
        style={styles.achievementImage}
      />
    </View>
    <View style={styles.slide}>
      <Image
        source={img4}
        style={styles.achievementImage}
      />
    </View>
    <View style={styles.slide}>
      <Image
        source={img5}
        style={styles.achievementImage}
      />
    </View>
  </Swiper>
);

const ReportSelectionScreen = () => {
  const navigation = useNavigation();
  const [reportType, setReportType] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const generateReport = () => {
    if (reportType && timeFrame) {
      console.log(`In report selection generate report`);
      
      navigation.navigate('ReportDisplay', { reportType, timeFrame });
    } else {
      alert('Please select both report type and time frame.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="add-box"
          size={30}
          color="#000"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Image source={require('./../../assets/images/promotions/promo1.jpg')} style={styles.adImage} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close Ad</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.slideshowContainer}>
        <ImageSlideshow />
      </View>

      <Text style={styles.heading}>Choose the type of the report you want to produce?</Text>
      <Picker selectedValue={reportType} onValueChange={(itemValue) => setReportType(itemValue)}>
        <Picker.Item label="Select Report Type" value="" />
        <Picker.Item label="Food Distribution Summary" value="foodDistributionSummary" />
        <Picker.Item label="Volunteer Contributions Report" value="volunteerContributions" />
        <Picker.Item label="Waste Reduction Report" value="wasteReduction" />
        <Picker.Item label="Orphanage Requests vs. Fulfillment" value="orphanageFulfillment" />
        {/* <Picker.Item label="Event Impact Report" value="eventImpact" /> */}
      </Picker>

      <Text style={styles.heading}>Would you like the report to cover a weekly, monthly, or yearly period?</Text>
      <Picker selectedValue={timeFrame} onValueChange={(itemValue) => setTimeFrame(itemValue)}>
        <Picker.Item label="Select Time Frame" value="" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Yearly" value="yearly" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={generateReport}>
        <Text style={styles.buttonText}>Generate Report</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('MyReportScreen')}>
        <Text style={styles.buttonText}>Go to My Reports Section</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  slideshowContainer: {
    height: 300,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  adImage: {
    width: 300,
    height: 400,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSecondary: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReportSelectionScreen;
