// Get items from local storage
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

// Set items from local Storage
export const storeData = async (key, data) => {
  console.log("storing", data);
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Error saving data
    Alert.alert("failed to save data");
  }
};

// Remove items from local Storage
export const removedata = async (key, data) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error saving data
  }
};
