// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
// import axios from "axios";

// const FoodNeedsList = () => {
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [foodNeedsList, setFoodNeedsList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load custom fonts
//   const loadFonts = async () => {
//     await Font.loadAsync({
//       ProtestStrike: require("../assets/fonts/ProtestStrike.ttf"), // Replace with your font
//       "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
//     });
//     setFontsLoaded(true);
//   };

//   useEffect(() => {
//     loadFonts(); // Load fonts on component mount

//     const fetchFoodNeedsDetails = async () => {
//       try {
//         // Fetch food needs data from your API
//         const response = await axios.get(
//           "http://192.168.8.169:5000/api/organization/food-needs"
//         ); // Change URL to your endpoint
//         setFoodNeedsList(response.data.data); // Store the data in state
//       } catch (error) {
//         console.error("Error fetching food needs details:", error);
//       } finally {
//         setLoading(false); // Set loading to false once the data is fetched
//       }
//     };

//     fetchFoodNeedsDetails();
//   }, []);

//   // Function to open the organization's address in Google Maps
//   const openGoogleMaps = (address) => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//       address
//     )}`;
//     Linking.openURL(url).catch((err) =>
//       console.error("An error occurred", err)
//     );
//   };

//   // Render a loading spinner if fonts aren't loaded yet
//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#2087f5" />
//       ) : foodNeedsList.length > 0 ? (
//         // Map over the food needs data and render each item
//         foodNeedsList.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <Text style={styles.organizationName}>{item.organizationName}</Text>
//             <Text style={styles.foodItem}>Food Item: {item.foodItem}</Text>
//             <Text style={styles.peopleServed}>
//               People to Serve: {item.peopleToServe}
//             </Text>
//             <Text style={styles.date}>
//               Required Date: {new Date(item.requiredDate).toLocaleDateString()}
//             </Text>
//             <TouchableOpacity onPress={() => openGoogleMaps(item.location)}>
//               <Text style={styles.addressLabel}>Location:</Text>
//               <Text style={styles.link}>{item.location}</Text>
//             </TouchableOpacity>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noDataText}>No food needs available.</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#e0f7fa",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     marginVertical: 15,
//     borderRadius: 15,
//     borderColor: "#00acc1",
//     borderWidth: 1,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   organizationName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#00838f",
//     marginBottom: 10,
//     fontFamily: "ProtestStrike",
//   },
//   foodItem: {
//     fontSize: 18,
//     color: "#6a1b9a",
//     marginBottom: 5,
//     fontFamily: "OpenSans-Regular",
//   },
//   peopleServed: {
//     fontSize: 16,
//     color: "#444",
//     marginVertical: 5,
//     fontFamily: "OpenSans-Regular",
//   },
//   date: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 10,
//     fontFamily: "OpenSans-Regular",
//   },
//   addressLabel: {
//     fontSize: 16,
//     color: "#00838f",
//     fontFamily: "OpenSans-Regular",
//   },
//   link: {
//     fontSize: 16,
//     color: "#0277bd",
//     textDecorationLine: "underline",
//     fontFamily: "OpenSans-Regular",
//   },
//   noDataText: {
//     fontSize: 18,
//     color: "#00796b",
//     textAlign: "center",
//     marginTop: 20,
//     fontFamily: "OpenSans-Regular",
//   },
// });

// export default FoodNeedsList;
