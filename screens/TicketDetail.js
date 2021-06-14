import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { deleteTicket } from "../services/ticket.service";
import { Alert } from "react-native";

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
      _id,
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
      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditTicket", {
                building,
                createdBy,
                description,
                maintenance,
                maintenanceWindow,
                status,
                tenantNotes,
                tenantContact,
                unit,
                _id,
              })
            }
            style={styles.editTicket}
          >
            <Text style={styles.toggleText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              deleteTicket(_id).then((res) => {
                if (res.status == 200) {
                  Alert.alert("Ticket Deleted");
                  navigation.navigate("Home");
                }
              })
            }
            style={styles.deleteTicket}
          >
            <Text style={styles.toggleText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
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
    marginTop: 30,
    alignContent: "space-around",
  },
  button: {
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
  editTicket: {
    padding: 20,
    backgroundColor: "#3EA9F5",
  },
  deleteTicket: {
    backgroundColor: "#1C5178",
    padding: 20,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
