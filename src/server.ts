import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoutes from "./apis/users/routes";
import billsRoutes from "./apis/bills/routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", userRoutes);
app.use("/api", billsRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
