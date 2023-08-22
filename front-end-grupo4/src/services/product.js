import axios from "./axios";

export const getClientsRequest = async () => axios.get("/client");

export const createClientsRequest = async (client) => axios.post("/client", client);

export const updateClientsRequest = async (id,client) =>
  axios.put(`/client/${id}`, client);

export const deleteClientsRequest = async (id) => axios.delete(`/client/${id}`);

export const getClientRequest = async (id) => axios.get(`/client/${id}`);
