import { Router } from "express";
import {
  createClient,
  updateClient,
  deleteClient,
  getClient,
  getClients
} from "../controlador_grupo_4/client.controllers.js";

import authenticateToken from "../middlewares_grupo_4/auth.token.js";
import { createClientSchema } from "../schema_grupo_4/client.schema.js";

import { validateSchema } from "../middlewares_grupo_4/validator.middleware.js";

const router = Router();

router.get("/",authenticateToken, getClients);
//router.get("/",getStudents);

router.post("/",authenticateToken,validateSchema(createClientSchema), createClient);

router.get("/:id", authenticateToken, getClient);

router.put("/:id", authenticateToken, updateClient);

router.delete("/:id", authenticateToken, deleteClient);

export default router;
