import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function TicketDetail({
  route: {
    params: {
      building,
      createdBy,
      description,
      maintenance,
      maintenanceWindow,
      status,
      tenantContact,
      tenantNotes,
      unit,
    },
  },
  navigation,
}) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View>
        <Text style={styles.title}>Ticket Details</Text>
        <Text>Building: {building}</Text>
        <Text>Unit: {unit}</Text>
        <Text>Created By: {createdBy}</Text>
        <Text>Contact: {tenantContact}</Text>
        <Text>Details: {description}</Text>
        <Text>
          Status:
          <Text style={status === "NEW" ? styles.new : null}>{status}</Text>
        </Text>
        <Text>
          {maintenance != null
            ? "Assigned to " + maintenance
            : "No mainenance assigned"}
        </Text>
        <Text>
          Maintenance Window
          {maintenanceWindow != null
            ? `\nStart: ${maintenanceWindow.start}\nEnd: ${maintenanceWindow.end}`
            : "\nNo window set."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30,
    width: Dimensions.get("window").width - 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C5178",
  },
  new: {
    // fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "#516391",
    color: "white",
    letterSpacing: 0,
    textTransform: "none",
    padding: 10,
    letterSpacing: 2,
  },
  hide: {
    display: "none",
  },
  logo: {
    height: "50%",
    width: "100%",
  },
  toggleLogin: {
    padding: 20,
    backgroundColor: "#3EA9F5",
  },
  toggleSignUp: {
    backgroundColor: "#1C5178",
    padding: 20,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
