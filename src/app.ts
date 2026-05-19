import cors from "cors";
import express from "express";
import healthRoutes from "./routes/healthRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/", healthRoutes);