import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/home";
import Tickets from "./screens/Tickets";
import TicketDetail from "./screens/TicketDetail";
import LandingScreen from "./screens/landingScreen";

const Stack = createStackNavigator();

export default function App() {
  const [name, setName] = useState("Billie");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buildings, setBuildings] = useState([
    { name: "The Palms in", units: ["1A", "2B", "3C", "4D", "5E", "6F"] },
    { name: "Valley Apts", units: ["1A", "2B", "3C", "4D", "5E", "6F"] },
    { name: "Tower 4", units: ["1A", "2B", "3C", "4D", "5E", "6F"] },
    { name: "Renters palace", units: ["1A", "2B", "3C", "4D", "5E", "6F"] },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tickets" component={Tickets} />
        <Stack.Screen name="TicketDetail" component={TicketDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
