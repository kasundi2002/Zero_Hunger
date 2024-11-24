import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [input, setInput] = useState("");
  const navigation = useNavigation();

  // Fetch event data
  const fetchEventData = async () => {
    try {
      const response = await axios.get("http://192.168.8.169:5000/events");
      setEvents(response.data);
    } catch (error) {
      console.log("Error fetching event data", error);
    }
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://192.168.8.169:5000/events/${id}`);
      console.log("Event deleted successfully");

      // Refetch the event data after deleting
      fetchEventData();
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  // Refresh event data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchEventData();
    }, [])
  );

  return (
    <ScrollView>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Ionicons
            onPress={() => navigation.navigate("index")}
            style={{ marginLeft: 10 }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              backgroundColor: "white",
              height: 40,
              borderRadius: 4,
            }}
          >
            <Pressable onPress={() => navigation.navigate("addevent")}>
              <AntDesign name="pluscircle" size={24} color="black" />
            </Pressable>
          </Pressable>
        </View>

        <View style={{ padding: 12 }}>
          {events.length > 0 ? (
            <FlatList
              data={events.filter((event) =>
                event.title.toLowerCase().includes(input.toLowerCase())
              )}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 8,
                    marginBottom: 10,
                    padding: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("editevent", { id: item._id })
                    }
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 50,
                      padding: 10, // Added padding for a larger press area
                    }}
                  >
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDeleteEvent(item._id)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      padding: 10, // Added padding for a larger press area
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>

                  <Text
                    style={{ color: "#333", fontSize: 18, fontWeight: "bold" }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ marginTop: 5, color: "#333" }}>
                    {new Date(item.date).toLocaleDateString()} - {item.location}
                  </Text>
                  <Text
                    style={{ marginTop: 5, fontStyle: "italic", color: "#555" }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{ marginTop: 5, fontWeight: "bold", color: "#444" }}
                  >
                    Organized by: {item.organizer.name} (
                    {item.organizer.contactEmail})
                  </Text>
                  <Text style={{ marginTop: 5, color: "blue" }}>
                    Max Participants: {item.maxParticipants}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Data</Text>
              <Text>Press on the plus button to add your Event</Text>
              <Pressable onPress={() => navigation.navigate("addevent")}>
                <AntDesign
                  style={{ marginTop: 30 }}
                  name="pluscircle"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Event;

const styles = StyleSheet.create({});
