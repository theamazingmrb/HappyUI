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
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm } from "react-hook-form";
import AppContext from "../components/AppContext";
import { updateTicket } from "../services/ticket.service";
// import { Camera } from "expo-camera";

export default function EditTicket({
  route: {
    params: {
      building,
      createdBy,
      description,
      maintenance,
      maintenanceWindow,
      status,
      tenantContact,
      tenantNotes,
      unit,
      _id,
    },
  },
  navigation,
}) {
  const globalState = useContext(AppContext);
  const buildings = [
    { name: "Please Select A Value", _id: null },
    ...globalState.buildings,
  ];
  const [selectedBuilding, setSelectedBuilding] = useState(building);
  const { register, handleSubmit, setValue } = useForm();
  const [formData, setFormData] = useState({
    building,
    createdBy,
    description,
    maintenance,
    maintenanceWindow,
    status,
    tenantContact,
    tenantNotes,
    unit,
    _id,
  });
  // set up for form w/ useForm values
  useEffect(() => {
    register("ticket", _id);
    register("building");
    register("description", description);
    register("tenantContact", createdBy);
    register("tenantNotes", tenantNotes);
    register("unit", unit);
    register("start", maintenanceWindow.start);
    register("status", status);
    register("end", maintenanceWindow.end);
  }, [register]);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  // const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    console.log(
      building,
      createdBy,
      description,
      maintenance,
      maintenanceWindow,
      status,
      tenantContact,
      tenantNotes,
      unit,
      _id
    );
  }, [formData]);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  const onSubmit = (data) => {
    console.log("from submit", data);
    updateTicket(
      _id,
      data.building || buildings.filter((b) => (b.name = building))[0]._id,
      data.description || formData.description,
      data.tenantContact || formData.tenantContact,
      data.tenantNotes || formData.tenantNotes[0],
      data.start || formData.maintenanceWindow.start,
      data.end || formData.maintenanceWindow.end,
      data.unit || formData.unit,
      data.status || formData.status
    ).then((res) => {
      console.log(res);
      res.status != 200
        ? null
        : setTimeout(function () {
            navigation.navigate("Home");
          }, 3000);
    });
  };
  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
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
            let b = buildings.filter(
              (building) => building.name == item.value
            )[0];

            setSelectedBuilding(b);
            setValue("building", b._id);
          }}
        />
        <TextInput
          label="Unit"
          placeholder="Unit"
          style={styles.inputStyle}
          value={formData.unit}
          onChangeText={(text) => {
            setValue("unit", text);
            setFormData((s) => {
              return { ...s, unit: text };
            });
          }}
        />
        <TextInput
          label="Contact"
          Type="outlined"
          placeholder="Contact"
          style={styles.inputStyle}
          value={formData.tenantContact}
          onChangeText={(text) => {
            setValue("tenantContact", text);
            setFormData((s) => {
              return { ...s, tenantContact: text };
            });
          }}
        />
        <TextInput
          placeholder="description"
          style={styles.inputStyle}
          value={formData.description}
          onChangeText={(text) => {
            setValue("description", text);
            setFormData((s) => {
              return { ...s, description: text };
            });
          }}
        />
        <TextInput
          placeholder="Notes"
          style={styles.inputStyle}
          value={formData.tenantNotes[0]}
          onChangeText={(text) => {
            setValue("tenantNotes", text);
            setFormData((s) => {
              return { ...s, tenantNotes: [text] };
            });
          }}
        />
        <TextInput
          placeholder="Availablility Start"
          style={styles.inputStyle}
          value={formData.maintenanceWindow.start}
          onChangeText={(text) => {
            setValue("start", text);
            setFormData((s) => {
              return {
                ...s,
                maintenanceWindow: { ...s.maintenanceWindow, start: text },
              };
            });
          }}
        />
        <TextInput
          placeholder="Availablility End"
          style={styles.inputStyle}
          value={formData.maintenanceWindow.end}
          onChangeText={(text) => {
            setValue("end", text);
            setFormData((s) => {
              return {
                ...s,
                maintenanceWindow: { ...s.maintenanceWindow, end: text },
              };
            });
          }}
        />
        <TextInput
          placeholder="Status"
          style={styles.inputStyle}
          value={formData.status}
          onChangeText={(text) => {
            setValue("status", text);
            setFormData((s) => {
              return { ...s, status: text };
            });
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
    width: 300,
    margin: 10,
  },
});
