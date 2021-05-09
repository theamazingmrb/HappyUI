import axios from "axios";
import { Alert } from "react-native";
import {
  storeData,
  retrieveData,
  removeData,
  importData,
} from "../helpers/localStorage.helper";

const API_URL = "https://happy-tenants-dev.herokuapp.com/api/auth/";
const STORAGE_KEY = "@user";
// Function to register User
export const signup = async (username, email, password, building) => {
  try {
    const res = await axios.post(API_URL + "signup", {
      username,
      email,
      password,
      building,
      roles: ["tenant"],
    });
    if (res.data.accessToken) {
      storeData(STORAGE_KEY, res.data);
    }
    return res.data;
  } catch (err) {
    Alert.alert(`Failed to log in. Please check username or password`);
  }
};

// Login the user
export const login = async (username, password) => {
  try {
    let response = await axios.post(API_URL + "signin", {
      // username,
      // password
      username: "manager2",
      password: "          ",
    });

    if (response.data.accessToken) {
      storeData(STORAGE_KEY, response.data);
    }
    return response.data;
  } catch (err) {
    Alert.alert(`Failed to log in. Please check username or password`);
  }
};

// logout the user
export const logout = () => {
  removeData(STORAGE_KEY);
};

// get the current user
export const getCurrentUser = async () => {
  return await retrieveData(STORAGE_KEY);
};
