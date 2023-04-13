import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { getAllUsers } from "./endPoints/getAllUsers";
import { createUser } from "./endPoints/createUser";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/users", getAllUsers);
app.post("/users", createUser);
