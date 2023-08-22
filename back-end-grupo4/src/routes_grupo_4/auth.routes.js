import express from 'express';
import { register, login, logout, verifyToken } from '../controlador_grupo_4/auth.controller.js';
import { validateSchema } from '../middlewares_grupo_4/validator.middleware.js';
import { loginSchema, registerSchema } from '../schema_grupo_4/auth.schema.js';

const router = express.Router();

// Rutas para registrarse e iniciar sesión
router.post('/register',validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema),login);
router.post('/logout',logout);
router.get('/verify',verifyToken);

export default router;