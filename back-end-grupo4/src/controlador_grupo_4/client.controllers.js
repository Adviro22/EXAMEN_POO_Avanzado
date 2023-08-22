import Client from "../model_grupo_4/client.model.js"

export const getClients = async (req, res) => {
    const productos = await Client.find({user: req.user.userId}).populate();
    console.log(productos)
    res.status(200).json(productos)
    
};

export const createClient = async (req, res) => {
  try {
    const { name, ruc, direction, type_client } = req.body;

    // Validar el formato del RUC utilizando una expresión regular
    const rucRegex = /^[0-9]{13}$/;
    if (!rucRegex.test(ruc)) {
      return res.status(400).json({ message: 'El formato del RUC no es válido' });
    }

    // Verificar si ya existe un registro con el mismo RUC
    const existingEst = await Client.findOne({ ruc });
    if (existingEst) {
      return res.status(400).json({ message: 'Ya existe un registro con el mismo RUC' });
    }

    // Crear el nuevo cliente
    const client = new Client({
      name,
      ruc,
      direction,
      type_client,
      user: req.user.userId
    });

    // Guardar el cliente en la base de datos
    const clientOk = await client.save();

    // Enviar una respuesta al cliente
    res.status(200).json({ status: 'Registro ingresado correctamente', clientOk });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al insertar el registro' });
  }
};




export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
     // Busca un estudiante por su ID y sui lo encuebtra lo elimina
    const client = await Client.findByIdAndDelete(id) ;
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar un Cliente' });
  }
};

export const updateClient = async (req, res) => {
     try {
    const { id } = req.params;
    const { name, ruc , direction, type_client } = req.body;

    // Buscar un estudiante por su ID en la base de datos
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    // Actualizar el los datos del estudiante
    client.name = name;
    client.ruc = ruc;
    client.direction = direction;
    client.type_client = type_client;
    await client.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro actualizado ok",client});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el Producto' });
  }
};

export const getClient = async (req, res) => {
    try {
    const { id } = req.params;
    // Buscar un usuario por su ID en la base de datos
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client no encontrado' });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Cliente' });
    }
};
