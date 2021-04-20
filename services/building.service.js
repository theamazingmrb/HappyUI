import axios from "axios";
import { Alert } from "react-native";
import {
  storeData,
  retrieveData,
  removeData,
} from "../helpers/localStorage.helper";
import { authHeader } from "../helpers/auth.helper";
const API_URL = "https://happy-tenants-dev.herokuapp.com/api/building/";
const STORAGE_KEY = "@user";

export const getAllBuildings = async () => {
  let res = await axios.get(`${API_URL}all`);
  return res.data.buildings;
};

export const newBuilding = async (name, description, units) => {
  console.log(name, description, unit);
  let res = await axios.post(
    API_URL,
    { name, description, units },
    { headers: authHeader() }
  );
  console.los(res.data);
  return res.data;
};
