import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import clientRoutes from "./src/routes_grupo_4/client.routes.js";
import authRoutes from "./src/routes_grupo_4/auth.routes.js";
import { PORT } from "./config.js";
import { MONGODB_URI } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Pagina Principal");
});

app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB esta Conectado...");
  } catch (error) {
    console.error(error);
  }
};

async function main() {
  try {
    await connectDB();
    app.listen(PORT);
    console.log(`Escuchando el puerto http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

main();
