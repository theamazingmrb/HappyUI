import axios from "axios";
import { Alert } from "react-native";
import {
  storeData,
  retrieveData,
  removeData,
} from "../helpers/localStorage.helper";
import authHeader from "../helpers/auth.helper";
const API_URL = "https://happy-tenants-dev.herokuapp.com/api/ticket/";
const API_URL_LOCAL = "https://happy-tenants-dev.herokuapp.com/api/ticket/";
const STORAGE_KEY = "@user";

export const getAllTickets = async () => {
  let res = await axios.get(`${API_URL}all`);
  return res.data.tickets;
};

export const newTicket = async (
  building,
  description,
  tenantContact,
  tenantNotes,
  start,
  end,
  unit
) => {
  let accessToken = await authHeader();
  console.log(accessToken, "Right before take off");
  return axios.post(
    API_URL,
    {
      building: building,
      tenantContact: tenantContact,
      tenantNotes: tenantNotes,
      description: description,
      unit: unit,
      start: start,
      end: end,
    },
    { headers: accessToken }
  );
};

export const snewTicket = async (
  building,
  description,
  tenantContact,
  tenantNotes,
  start,
  end,
  unit
) => {
  console.log(
    "Service Items",
    building,
    description,
    tenantContact,
    tenantNotes,
    start,
    end,
    unit
  );
  console.log(typeof building);
  authHeader().then((resHeader) => {
    console.log(resHeader);
  });
  axios
    .post(
      API_URL,
      {
        building: building,
        tenantContact: tenantContact,
        tenantNotes: tenantNotes,
        description: description,
        unit: unit,
        start: start,
        end: end,
      },
      { headers: authHeader() }
    )
    .then((res) => res.data);
};
