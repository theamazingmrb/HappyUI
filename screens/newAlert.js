import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useForm } from "react-hook-form";
import AppContext from "../components/AppContext";

export default function NewAlert({ navigation }) {
  const globalState = useContext(AppContext);
  const buildings = globalState.buildings;
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].name);
  const { register, handleSubmit, setValue } = useForm();

  // set up for form w/ useForm values
  useEffect(() => {
    register("message");
    register("building");
  }, [register]);

  const onSubmit = async (data) => {
    // let res = await login(data.username, data.password);
    console.log(data);
    //    if (res) {
    //       setMessage(`Welcome ${res.username}`)

    //       setTimeout(function () {
    //            navigation.navigate('Home')
    //     }, 3000);

    //     }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View>
        <Text>Please enter ticket details</Text>
        <DropDownPicker
          items={buildings.map((building) => {
            return { label: building.name, value: building.name };
          })}
          defaultValue={selectedBuilding}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => {
            setSelectedBuilding(item.name);
            setValue("building", item);
          }}
        />
        <Text>Hey Alert page</Text>
        <TextInput
          label="Message"
          placeholder="Message"
          style={styles.inputStyle}
          onChangeText={(text) => {
            setValue("message", text);
          }}
        />
      </View>
      <Button
        title="SUBMIT"
        color="black"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
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
  inputStyle: {
    backgroundColor: "#ececec",
    padding: 10,
    margin: 10,
  },
});
