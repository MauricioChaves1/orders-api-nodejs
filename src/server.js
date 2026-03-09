import "dotenv/config";
import express from "express";
import authRoutes from "./routes/api.js";
import pool from "./config/database.js";

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

async function startServer() {
  try {
    await pool.connect();
    console.log("Conectado ao banco");

    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
  }
}

startServer();