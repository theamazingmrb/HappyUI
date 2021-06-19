import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getCurrentUser } from "../services/auth.service";
import Ticket from "../components/ticket";
import { getAllTickets } from "../services/ticket.service";
import AppContext from "../components/AppContext";
import { useIsFocused } from "@react-navigation/native";

export default function Home({ navigation, route }) {
  const globalState = useContext(AppContext);
  const [message, setMessage] = useState("No message");
  const [isManager, setIsManager] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [tickets, setTickets] = useState();
  const isFocused = useIsFocused();

  const renderItem = (item) => {
    return <Ticket ticket={item} key={item._id} navigation={navigation} />;
  };
  const getUser = async () => {
    return await getCurrentUser();
  };

  // used for getting building data
  useEffect(() => {
    getUser().then((user) => {
      console.log("user", user);
      setCurrentUser(user);
      setIsManager(true);
      getAllTickets().then((tArray) => {
        let data = tArray.map((ticket) => {
          return {
            ...ticket,
            building:
              globalState.buildings.find((b) => b._id == ticket.building)
                ?.name || "No name available",
          };
        });
        if (user.roles.includes("ROLE_MANAGER")) {
          console.log(data);
          setTickets(data);
        } else if (user.roles.includes("ROLE_MAINTENANCE")) {
          setTickets(
            data.filter((t) => {
              return t.maintenance.includes(user.id);
            })
          );
        } else {
          setTickets(
            data.filter((t) => {
              return t.createdBy[0] == user.id;
            })
          );
        }
        console.log("tickets after setState", tickets);
      });
    });
  }, [isFocused]);

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
      {tickets ? (
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>"No tickets in DB"</Text>
      )}
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
