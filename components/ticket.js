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

export default function Ticket({
  ticket: {
    item: {
      building,
      createdBy,
      description,
      maintenance,
      maintenanceWindow,
      status,
      tenant,
      tenantNotes,
      tenantContact,
      unit,
    },
  },
  navigation,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TicketDetail", {
          building,
          createdBy,
          description,
          maintenance,
          maintenanceWindow,
          status,
          tenant,
          tenantNotes,
          tenantContact,
          unit,
        })
      }
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Building: {building}</Text>
        <Text style={styles.title}>Description: {description}</Text>
      </View>

      <Text style={status === "NEW" ? styles.new : null}>{status}</Text>
    </TouchableOpacity>
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
    // fontSize: 20,
    // fontWeight: "bold",
    // color: "#1C5178",
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
