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
  return res.data.tickets ? res.data.tickets : null;
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

export const updateTicket = async (
  ticket,
  building,
  description,
  tenantContact,
  tenantNotes,
  start,
  end,
  unit,
  status
) => {
  let accessToken = await authHeader();
  return axios.put(
    API_URL,
    {
      ticket: ticket,
      building: building,
      tenantContact: tenantContact,
      tenantNotes: tenantNotes,
      description: description,
      unit: unit,
      start: start,
      end: end,
      status: status,
    },
    { headers: accessToken }
  );
};

export const deleteTicket = async (id) => {
  let accessToken = await authHeader();
  if (accessToken) {
    console.log("acess token here : ", accessToken);
    return axios.delete(`${API_URL}${id}`, { headers: accessToken });
  }
};
