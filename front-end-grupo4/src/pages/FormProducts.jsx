import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useClients } from "../context/ProductContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function FormProducts() {
  const { createClient, getClient, updateClient } = useClients();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateClient(params.id, {
          ...data,
          name:(data.name),
          ruc:(data.ruc),
          direction:(data.direction),
          type_client:(data.type_client),
          date: dayjs.utc(data.date).format(),
        });
      } else {
        console.log("al grabar:",data)
        createClient({
          ...data,
          name:(data.name),
          ruc:(data.ruc),
          direction:(data.direction),
          type_client:(data.type_client),
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/products");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    console.log(params.id)
    const loadProdct = async () => {
      if (params.id) {
        const client = await getClient(params.id);
        setValue("name", client.name);
        setValue("ruc", client.ruc);
        setValue("direction", client.direction);
        setValue("type_client", client.type_client);
        
      }
    };
    loadProdct();
  }, []);

  return (
     <Card>
       
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">Nombre</Label>
        <Input
          type="text"
          name="name"
          placeholder="Ingrese el Nombre del producto"
          {...register("name",{ required: {value:true,message:"Nombre es requerido"} })}
          autoFocus
        />
        {errors.name && (
          <p className="text-red-500 font-semibold">{errors.name.message}</p>
        )}
        <Label htmlFor="ruc">RUC:</Label>
         <Input 
            type="text"
            name="ruc"
            placeholder="Escriba el ruc..."
            {...register("ruc", { required: {value:true,message:"Ruc es requerido"} })}
          />
          {errors.ruc && (<p className="text-red-500 font-semibold">{errors.ruc.message}</p>)}
         <Label htmlFor="direction">DIRECTION:</Label>
          <Input 
            type="text"
            name="direction"
            placeholder="Escriba el direction..."
            {...register("direction", { required: {value:true,message:"Direction es requerido"} })}
          />
          {errors.direction && (<p className="text-red-500 font-semibold">{errors.direction.message}</p>)}
          <Label htmlFor="type_client">Tipo de CLiente:</Label>
          <Input 
            type="text"
            name="type_client"
            placeholder="Escriba el tipo de cliente..."
            {...register("type_client", { required: {value:true,message:"Tipo de cliente es requerido"} })}
          />
          {errors.type_client && (<p className="text-red-500 font-semibold">{errors.type_client.message}</p>)}
          
        <Button>Grabar Registro</Button>
      </form>
    </Card>
     );
}