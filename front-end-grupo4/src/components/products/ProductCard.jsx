import { useClients } from "../../context/ProductContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProductCard({ client }) {
  const { deleteClient } = useClients();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{client.name}</h1>
      </header>
      <p className="text-slate-300">
        <span className="text-blue-400 font-bold">RUC:</span> {client.ruc}
      </p>
      <p className="text-slate-300">
        <span className="text-blue-400 font-bold">DIRECCION:</span>{" "}
        {client.direction}
      </p>
      <p className="text-slate-300">
        <span className="text-blue-400 font-bold">TIPO DE CLIENTE:</span>{" "}
        {client.type_client}
      </p>
      <br />
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => deleteClient(client._id)}>Delete</Button>
        <ButtonLink to={`/product/${client._id}`}>Edit</ButtonLink>
      </div>
    </Card>
  );
}
