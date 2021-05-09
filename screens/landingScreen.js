import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
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
import { login, signup } from "../services/auth.service";
const logo = require("../assets/HappyTenants-01.jpg");
import AppContext from "../components/AppContext";
import { getAllBuildings } from "../services/building.service";

export default function LandingScreen({ navigation }) {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(
    "No buildings available"
  );
  const { register, handleSubmit, setValue } = useForm();
  const globalState = useContext(AppContext);

  // used for getting building data
  useEffect(() => {
    getAllBuildings().then((buildings) => {
      globalState.setBuildings(buildings);
      setSelectedBuilding(buildings[0].name);
    });
  }, []);
  // set up for form w/ useForm values
  useEffect(() => {
    register("username");
    register("password");
    register("building");
    register("email");
  }, [register]);

  const loginToggle = () => {
    setToggleLogin(!toggleLogin);
  };

  const onSubmit = async (data) => {
    let res = await login(data.username, data.password);

    if (res) {
      setMessage(`Welcome ${res.username}`);

      setTimeout(function () {
        navigation.navigate("Home");
      }, 3000);
    }
  };

  const onSignUpSubmit = async (data) => {
    let thisBuilding = globalState.buildings.filter(
      (building) => building.name == data.building
    );
    let res = await signup(
      data.username,
      data.email,
      data.password,
      thisBuilding[0]._id
    );
    console.log(res);
    if (res.status == "ok") {
      setMessage(`Welcome ${res.username}`);

      setTimeout(function () {
        navigation.navigate("Home");
      }, 3000);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Welcome to</Text>
      <Image style={styles.logo} source={logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={loginToggle} style={styles.toggleLogin}>
          <Text style={styles.toggleText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginToggle} style={styles.toggleSignUp}>
          <Text style={styles.toggleText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={toggleLogin ? styles.hide : styles.toggleBox}>
        <Text>Please Log in</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setValue("username", text);
          }}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            setValue("password", text);
          }}
        />
        <Button
          title="SUBMIT"
          color="black"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={toggleLogin ? styles.toggleBox : styles.hide}>
        <Text>Please Sign up</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setValue("username", text);
          }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            setValue("email", text);
          }}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            setValue("password", text);
          }}
        />
        <TextInput placeholder="Address" />
        <DropDownPicker
          items={globalState.buildings.map((building) => {
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
            console.log(item);
            setSelectedBuilding(item.value);
            setValue("building", item.value);
          }}
        />
        <Button
          title="SUBMIT"
          color="black"
          style={styles.button}
          onPress={handleSubmit(onSignUpSubmit)}
        />
      </View>

      <Text>{message}</Text>
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
