import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerUser,
    isAuthenticated,
    errors: registerErrors,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated]);

  const submitRegister = handleSubmit((body) => {
    registerUser(body);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-white max-w-md w-full p-10 rounded-md">
        <ul className="bg-red-700 text-white rounded-md text-center">
          {registerErrors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold text-violet-800 uppercase text-center">
          Registro de Usuario
        </h2>
        <form onSubmit={submitRegister} className="bg-violet-300">
          <label htmlFor="username:" className="text-md block my-1 text-black">
            Username:
          </label>
          <input
            className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="text"
            name="username"
            placeholder="Escriba su username..."
            {...register("username", {
              required: { value: true, message: "Mail es requerido" },
            })}
          />
          {errors.username && (
            <p className="text-red-500 font-semibold">{errors.username.message}</p>
          )}
          <label htmlFor="cedula:" className="text-md block my-1 text-black">
            Cedula:
          </label>
          <input
            className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="string"
            name="cedula"
            placeholder="Escriba su mail..."
            {...register("cedula", {
              required: { value: true, message: "Cedula es requerido" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 font-semibold">{errors.email.message}</p>
          )}
          <label htmlFor="email:" className="text-md block my-1 text-black">
            Email:
          </label>
          <input
            className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="email"
            name="email"
            placeholder="Escriba su mail..."
            {...register("email", {
              required: { value: true, message: "Mail es requerido" },
            })}
          />
          {errors.email && (
            <p className="text-red-500 font-semibold">{errors.email.message}</p>
          )}
          <label htmlFor="password" className="text-md block my-1 text-black">
            Password:
          </label>
          <input
            className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="password"
            name="password"
            placeholder="Escriba su password..."
            {...register("password", {
              required: { value: true, message: "Password es requerido" },
            })}
          />
          {errors.password && (
            <p className="text-red-500 font-semibold">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-indigo-500 px-4 py-1 rounded-md my-2"
          >
            Registrarse
          </button>
        </form>

        <p className="flex gap-x-2 justify-between text-violet-700">
          Ya tienes una cuenta...?{" "}
          <Link to="/login" className="text-sky-500 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
