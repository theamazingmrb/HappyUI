import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import Tickets from "../screens/Tickets";
import TicketDetail from "../screens/TicketDetail";
import LandingScreen from "../screens/landingScreen";
import NewTicket from "../screens/newTicket";
import NewAlert from "../screens/newAlert";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          gestureEnabled: false,
          headerLeft: "",
        }}
      />
      <Stack.Screen
        name="NewAlert"
        component={NewAlert}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Tickets"
        component={Tickets}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetail}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="NewTicket"
        component={NewTicket}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
