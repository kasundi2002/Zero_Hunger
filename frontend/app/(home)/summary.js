import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DataTable } from "react-native-paper";

const EventSummary = () => {
  const [eventData, setEventData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM YYYY");
  };

  const fetchEventReport = async () => {
    try {
      const response = await axios.get(
        "http://192.168.8.169:5000/event-report",
        {
          params: {
            month: currentDate.month() + 1, // Adjust for zero-indexed months
            year: currentDate.year(),
          },
        }
      );

      setEventData(response.data.events);
    } catch (error) {
      console.log("Error fetching event data", error);
    }
  };

  useEffect(() => {
    fetchEventReport();
  }, [currentDate]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      <View style={{ marginHorizontal: 12 }}>
        {eventData?.map((event, index) => (
          <View key={index} style={{ marginVertical: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#4b6cb7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  {event?.title?.charAt(0)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {event?.title}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {event?.date}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                margin: 5,
                padding: 5,
                backgroundColor: "#A1FFCE",
                borderRadius: 5,
              }}
            >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Participants</DataTable.Title>
                  <DataTable.Title>Max Participants</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{event?.participants}</DataTable.Cell>
                  <DataTable.Cell>{event?.maxParticipants}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default EventSummary;

const styles = StyleSheet.create({});
