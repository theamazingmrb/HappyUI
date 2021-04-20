import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { getCurrentUser } from "../services/auth.service";
import Ticket from "../components/ticket";
import { getAllTickets } from "../services/ticket.service";
const logo = require("../assets/HappyTenants-01.jpg");

export default function Home({ navigation, route }) {
  const [message, setMessage] = useState("No message");
  const [isManager, setIsManager] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [tickets, setTickets] = useState([
    {
      building: "Building 1",
      createdBy: "Jason Bourne",
      description: "leaky sink",
      maintenance: null,
      status: "NEW",
      tenantContact: "Jason B.",
      tenantNotes: "This issue started last week.",
      unit: "1A",
      maintenanceWindow: {
        start: "10:00 am",
        end: "12:00 PM",
      },
    },
    {
      building: "Building 1",
      createdBy: "Bruce Wayne",
      description: "Shower water always cold",
      maintenance: null,
      status: "NEW",
      tenantContact: "Bruce W.",
      tenantNotes: "This issue started today.",
      unit: "2A",
      maintenanceWindow: {
        start: "03:00 am",
        end: "05:00 PM",
      },
    },
    {
      building: "Building 1",
      createdBy: "Peter Parker",
      description: "Window will not close",
      maintenance: ["Hank Hill", "Bobby Hill"],
      status: "IN PROGRESS",
      tenantContact: "Mary J.",
      tenantNotes: "This issue started last week.",
      unit: "3A",
      maintenanceWindow: {
        start: "03:00 am",
        end: "05:00 PM",
      },
    },
  ]);

  const renderItem = (item) => <Ticket ticket={item} navigation={navigation} />;

  const getUser = async () => {
    let res = await getCurrentUser();
    let user = JSON.parse(res);
    return user;
  };

  const gatherTickets = async () => {
    let res = await getAllTickets;
    let tickets = JSON.parse(res);
    console.log("Tickets from tickets response", tickets);
    return tickets;
  };
  // used for getting building data
  useEffect(() => {
    getUser().then((user) => {
      setCurrentUser(user);
      if (user.roles.includes("ROLE_MANAGER")) {
        setIsManager(true);
      }
    });
    getAllTickets().then((tickets) => {
      console.log(tickets);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Welcome {currentUser.username}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewTicket")}
          style={styles.createTicket}
        >
          <Text style={styles.toggleText}>Create New Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewAlert")}
          style={styles.createAlert}
        >
          <Text style={styles.toggleText}>Create New Alert</Text>
        </TouchableOpacity>
      </View>
      <Text>Tickets quick view</Text>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        keyExtractor={(item) => item.description}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C5178",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    marginTop: 50,
  },

  hide: {
    display: "none",
  },
  logo: {
    height: "50%",
    width: "100%",
  },
  createTicket: {
    padding: 20,
    backgroundColor: "#5F7D8E",
    margin: 20,
  },
  createAlert: {
    backgroundColor: "#7F4FC9",
    padding: 20,
    margin: 20,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
