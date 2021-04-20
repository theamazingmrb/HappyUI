import "react-native-gesture-handler";
import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./routes/homeStack";
import About from "./screens/about";
import AppContext from "./components/AppContext";

const Drawer = createDrawerNavigator();

export default function App() {
  const [buildings, setBuildings] = useState([
    { name: "No buildings available", units: ["n/a"] },
  ]);
  const [currentUser, setCurrentUser] = useState("user");
  const [tickets, setTickets] = useState("ticket");

  const globalState = {
    buildings: buildings,
    currentUser: currentUser,
    tickets: tickets,
    setBuildings,
    setCurrentUser,
    setTickets,
  };

  return (
    <NavigationContainer>
      <AppContext.Provider value={globalState}>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}
