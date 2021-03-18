import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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

export default function NewTicket({ navigation, route }) {
  const STORAGE_KEY = "@user";
  const [buildings, setBuildings] = useState(route.params.buildings);

  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].name);
  const { register, handleSubmit, setValue } = useForm();
  // used for getting building data
  // useEffect(() => {
  //   axios
  //     .get("https://happy-tenants-dev.herokuapp.com/api/buildings")
  //     .then((res) => {
  //       const data = res.data.buildings;
  //       setBuildings(data);
  //       setSelectedBuilding(data[0].name);
  //     })
  //     .catch(function (error) {
  //       alert(error);
  //     });
  // }, []);
  // set up for form w/ useForm values
  useEffect(() => {
    register("username");
    register("password");
    register("building");
  }, [register]);

  const loginToggle = () => {
    setToggleLogin(!toggleLogin);
  };
  console.log("the route route ", route);
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
            setSelectedBuilding(item);
            setValue("building", item);
          }}
        />
        <TextInput
          placeholder="Unit"
          onChangeText={(text) => {
            setValue("unit", text);
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(text) => {
            setValue("contact", text);
          }}
        />
        <TextInput
          placeholder="details"
          onChangeText={(text) => {
            setValue("details", text);
          }}
        />
        <TextInput
          placeholder="Maintenance Availablility Start"
          onChangeText={(text) => {
            setValue("start", text);
          }}
        />
        <TextInput
          placeholder="Maintenance Availablility End"
          onChangeText={(text) => {
            setValue("end", text);
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
});
