import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Modal,Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';


const AdminScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [orphanageCount, setOrphanageCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [contributionLevel, setContributionLevel] = useState('Bronze');
  const [badges, setBadges] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users per page

  // Derived pagination values
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.8.169:5000/api/users/getAllUsers');
        const fetchedUsers = response.data;

        const restaurants = fetchedUsers.filter(user => user.userType === 'restaurantOwner').length;
        const orphanages = fetchedUsers.filter(user => user.userType === 'orphanageOwner').length;
        const volunteers = fetchedUsers.filter(user => user.userType === 'volunteer').length;

        setRestaurantCount(restaurants);
        setOrphanageCount(orphanages);
        setVolunteerCount(volunteers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = async () => {
    try {
      const updatedUser = {
        contributionLevel,
        badges: badges.split(',').map(badge => badge.trim()), // Convert comma-separated badges to array
      };

      const response = await axios.put(`http://192.168.8.169:5000/api/users/updateUser/${selectedUser._id}`, updatedUser);
      alert('Success', 'User updated successfully');
      setUsers(users.map(user => (user._id === selectedUser._id ? response.data : user))); // Update the user list
      setModalVisible(false); // Close the modal after updating
    } catch (error) {
      alert('Error', error.response?.data?.message || 'Failed to update user');
    }
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setContributionLevel(user.contributionLevel || 'Bronze');
    setBadges(user.badges ? user.badges.join(', ') : ''); // Convert badges array to a string for display
    setModalVisible(true); // Open the modal
  };

  // Pagination controls
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userType}>{item.userType}</Text>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{item.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
         style={styles.button}
          title="Update"
          onPress={() => openUpdateModal(item)}
        />
        <Button
        style={styles.button}
          title="Delete"
          onPress={() => confirmDelete(item._id)}
          color="red"
        />
      </View>
    </View>
  );

  const confirmDelete = (userId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.8.169:5000/api/users/deleteUser/${userId}`);
              setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the list
              alert('User deleted successfully');
            } catch (error) {
              alert('Error deleting user', error.response?.data?.message || 'Failed to delete user');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Get users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <View style={styles.container}>
      {/* Top info boxes */}
      <View style={styles.topContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{restaurantCount}</Text>
          <Text style={styles.labelText}>Restaurants</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{orphanageCount}</Text>
          <Text style={styles.labelText}>Orphanages</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{volunteerCount}</Text>
          <Text style={styles.labelText}>Volunteers</Text>
        </View>
      </View>

      {/* Add User Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('addvolunteer', { mode: 'addUser' })}
      >
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>

      {/* User List */}
      <FlatList
        data={currentUsers}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
      />

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <Button style={styles.paginationButton} title="Previous" onPress={prevPage} disabled={currentPage === 1} />
        <Text style={styles.pageNumber}>{`Page ${currentPage} of ${totalPages}`}</Text>
        
        <Button style={styles.paginationButton} title="Next" onPress={nextPage} disabled={currentPage === totalPages} />
        <Button style={styles.paginationButton} title="Last" onPress={goToLastPage} disabled={currentPage === totalPages} />
      </View>

      {/* Modal for updating user */}
      {selectedUser && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Update User</Text>

              <Text style={styles.label2}>Contribution Level</Text>
              <Picker
                selectedValue={contributionLevel}
                style={styles.picker}
                onValueChange={(itemValue) => setContributionLevel(itemValue)}
              >
                <Picker.Item label="Bronze" value="Bronze" />
                <Picker.Item label="Silver" value="Silver" />
                <Picker.Item label="Gold" value="Gold" />
                <Picker.Item label="Platinum" value="Platinum" />
              </Picker>

              <Text style={styles.label2}>Badges</Text>
              <Picker
                selectedValue={badges}
                style={styles.picker}
                onValueChange={(itemValue) => setBadges(itemValue)}
              >
                <Picker.Item label="Hunger Hero" value="Hunger Hero" />
                <Picker.Item label="Top Contributor" value="Top Contributor" />
                <Picker.Item label="Waste Warrior" value="Waste Warrior" />
                <Picker.Item label="Food Guardian" value="Food Guardian" />
                <Picker.Item label="Community Champion" value="Community Champion" />
              </Picker>

              <View style={styles.modalButtonContainer}>
                <Button title="Save" onPress={updateUser} />
                <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  labelText: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 140,
  },
  button: {
    borderRadius: '12px',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageNumber: {
    marginHorizontal: 20,
    fontSize: 16,
  },
  paginationButton: {
    marginRight: '5px'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 40,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AdminScreen;
