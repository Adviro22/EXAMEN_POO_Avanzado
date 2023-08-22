import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: "Username es requerido" }).min(3, { message: "Username minimo 3 caracteres" }),
  cedula: z.string()
    .refine(value => value.length === 10, { message: "Cedula debe ser un string válido de 10 caracteres" }),
  email: z.string({ required_error: "Email es requerido" }).email({ message: "Email no es valido" }),
  password: z.string({ required_error: "Password es requerido" }).min(7, { message: "Password minimo 7 caracteres" }),
});

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
