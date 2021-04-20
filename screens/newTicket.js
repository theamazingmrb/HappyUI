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
import { newTicket } from "../services/ticket.service";
import { Camera } from "expo-camera";

export default function NewTicket({ navigation }) {
  const globalState = useContext(AppContext);
  const buildings = [
    { name: "Please Select A Value", _id: null },
    ...globalState.buildings,
  ];
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const { register, handleSubmit, setValue } = useForm();
  // set up for form w/ useForm values
  useEffect(() => {
    register("building");
    register("description");
    register("tenantContact");
    register("tenantNotes");
    register("unit");
    register("start");
    register("end");
  }, [register]);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onSubmit = async (data) => {
    console.log("from submit", data);
    // let res = await login(data.username, data.password);
    newTicket(
      data.building,
      data.description,
      data.tenantContact,
      data.tenantNotes,
      data.start,
      data.end,
      data.unit
    ).then((res) => {
      console.log(res);
    });
    //    if (res) {
    //       setMessage(`Welcome ${res.username}`)

    //       setTimeout(function () {
    //            navigation.navigate('Home')
    //     }, 3000);

    //     }
  };
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View>
        <Text>Please enter ticket details</Text>
        <DropDownPicker
          items={buildings.map((building) => {
            return { label: building.name, value: building.name };
          })}
          defaultValue={selectedBuilding.name}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => {
            setSelectedBuilding(
              buildings.filter((building) => building.name == item.value)[0]
            );
            console.log("building here", selectedBuilding);
            setValue("building", selectedBuilding._id);
          }}
        />
        <TextInput
          label="Unit"
          placeholder="Unit"
          style={styles.inputStyle}
          onChangeText={(text) => {
            setValue("unit", text);
          }}
        />
        <TextInput
          label="Contact"
          Type="outlined"
          placeholder="Contact"
          style={styles.inputStyle}
          onChangeText={(text) => {
            setValue("tenantContact", text);
          }}
        />
        <TextInput
          placeholder="description"
          style={styles.inputStyle}
          onChangeText={(text) => {
            setValue("description", text);
          }}
        />
        <TextInput
          placeholder="Notes"
          style={styles.inputStyle}
          onChangeText={(text) => {
            setValue("tenantNotes", text);
          }}
        />
        <TextInput
          placeholder="Maintenance Availablility Start"
          style={styles.inputStyle}
          onChangeText={(text) => {
            setValue("start", text);
          }}
        />
        <TextInput
          placeholder="Maintenance Availablility End"
          style={styles.inputStyle}
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
      <Camera type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
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
