import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FoodNeedManage = ({ navigation, route }) => {
  const [foodNeeds, setFoodNeeds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    foodItem: "",
    people: "",
    requiredDate: "",
  });

  // Fetch food needs on page load
  const fetchFoodNeeds = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.8.169:5000/api/auth/food",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFoodNeeds(response.data);
    } catch (error) {
      console.error("Error fetching food needs", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFoodNeeds();
    }, [])
  );

  useEffect(() => {
    if (route.params?.refresh) {
      fetchFoodNeeds();
    }
  }, [route.params]);

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`http://192.168.8.169:5000/api/auth/food/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Success", "Food need deleted successfully");
      fetchFoodNeeds(); // Refresh the list
    } catch (error) {
      console.error("Error deleting food need", error);
      Alert.alert("Error", "Failed to delete food need");
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditingItem(item);
    setFormData({
      foodItem: item.foodItem,
      people: item.people.toString(),
      requiredDate: item.requiredDate,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `http://192.168.8.169:5000/api/auth/food/${editingItem._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Food need updated successfully");
      setEditMode(false);
      setEditingItem(null);
      setFormData({ foodItem: "", people: "", requiredDate: "" });
      fetchFoodNeeds(); // Refresh the list
    } catch (error) {
      console.error("Error updating food need", error);
      Alert.alert("Error", "Failed to update food need");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Food Needs</Text>

      {editMode ? (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            placeholder="Food Item"
            value={formData.foodItem}
            onChangeText={(value) =>
              setFormData({ ...formData, foodItem: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Number of People"
            value={formData.people}
            keyboardType="numeric"
            onChangeText={(value) =>
              setFormData({ ...formData, people: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Required Date (YYYY-MM-DD)"
            value={formData.requiredDate}
            onChangeText={(value) =>
              setFormData({ ...formData, requiredDate: value })
            }
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditMode(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={foodNeeds}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }} // Ensure FlatList takes full height
          showsVerticalScrollIndicator={true} // Make scroll indicator visible for web
          renderItem={({ item }) => (
            <View style={styles.foodItem}>
              <Text style={styles.foodText}>Item: {item.foodItem}</Text>
              <Text style={styles.foodText}>People: {item.people}</Text>
              <Text style={styles.foodText}>Date: {item.requiredDate}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#7dadb9" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  foodItem: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  foodText: { fontSize: 16, color: "#333" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: { backgroundColor: "#1f5184", padding: 10, borderRadius: 8 },
  editButtonText: { color: "#fff", fontWeight: "bold" },
  deleteButton: { backgroundColor: "#f44336", padding: 10, borderRadius: 8 },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  editForm: { marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: { marginTop: 10, padding: 15, alignItems: "center" },
  cancelButtonText: { color: "#f44336", fontWeight: "bold" },
});

export default FoodNeedManage;
