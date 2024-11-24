import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.navigate("Loginselect"); // Navigate to the selectlogin screen
  };

  return (
    <ScrollView>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          {/* Header Section */}
  
          {/* Sign-out Icon */}
          <Pressable onPress={handleSignOut} style={styles.signOutIcon}>
            <Ionicons name="log-out-outline" size={30} color="white" />
          </Pressable>

          {/* Event and Donate Buttons */}
          <View style={{ marginTop: 45, flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
            <Pressable style={styles.buttonContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="people-sharp" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Event</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="people-sharp" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Donate</Text>
            </Pressable>
          </View>

          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image source={require("../../assets/images/donate.jpeg")} style={styles.image} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <Pressable onPress={() => navigation.navigate("AddVolunteer")} style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text style={styles.actionText}>SignUp as Volunteer</Text>
              <View style={styles.chevron}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Event")} style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <MaterialIcons name="event" size={24} color="black" />
              </View>
              <Text style={styles.actionText}>Organize Events</Text>
              <View style={styles.chevron}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("ParticipantList")} style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <FontAwesome6 name="people-group" size={24} color="black" />
              </View>
              <Text style={styles.actionText}>Participant List</Text>
              <View style={styles.chevron}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Summary")} style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="newspaper-outline" size={24} color="black" />
              </View>
              <Text style={styles.actionText}>Summary</Text>
              <View style={styles.chevron}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  signOutIcon: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 1, // Ensures the icon is clickable above other components
  },
  buttonContainer: {
    backgroundColor: "#D3CCE3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    marginTop: 7,
    fontWeight: "600",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 6,
    width: 200,
    height: 200,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  actionContainer: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
  actionButton: {
    backgroundColor: "#BE93C5",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  actionIcon: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  chevron: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
