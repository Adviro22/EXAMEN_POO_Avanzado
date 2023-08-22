import { createContext, useContext, useState } from "react";
import {
  createClientsRequest,
  deleteClientsRequest,
  getClientsRequest,
  getClientRequest,
  updateClientsRequest,
} from "../services/product";

const ClientContext = createContext();

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error("useClients sin Contexto");
  return context;
};

export function ProductProvider({ children }) {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    const res = await getClientsRequest();
    console.log(res.data)
    setClients(res.data);
  };

  const deleteClient = async (id) => {
    try {
      const res = await deleteClientsRequest(id);
      if (res.status === 204) setClients(clients.filter((client) => client._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createClient = async (client) => {
    try {
      const res = await createClientsRequest(client);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClient = async (id) => {
    try {
      const res = await getClientRequest(id);
      console.log(res)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateClient = async (id, client) => {
    try {
      await updateClientsRequest(id, client);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        getClients,
        deleteClient,
        createClient,
        getClient,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
