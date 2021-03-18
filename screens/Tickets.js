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

export default function Tickets({ navigation }) {
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
    <View style={styles.container}>
      <StatusBar style="light" />
      <Button
        title="Back Home"
        onPress={() => navigation.navigate("Home", { name: "Jane" })}
      />
    </View>
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

{
  /* <FlatList 
data={buildings}
keyExtractor={item=> item.name}
renderItem={({item}) => <Text>{item.name}</Text>}
/> */
}
