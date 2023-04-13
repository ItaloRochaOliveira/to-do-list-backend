import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { getAllUsers } from "./endPoints/getAllUsers";
import { createUser } from "./endPoints/createUser";
import { deleteUser } from "./endPoints/deleteUser";
import { getAllTasks } from "./endPoints/getAllTasks";
import { createTasks } from "./endPoints/createTasks";
import { deleteTask } from "./endPoints/deleteTask";
import { editTask } from "./endPoints/editTask";
import { getAllUserTasks } from "./endPoints/getAllUserTasks";
import { createUserTask } from "./endPoints/createUserTask";
import { deleteUserTask } from "./endPoints/deleteUserTask";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

//endpoints users
app.get("/users", getAllUsers);
app.post("/users", createUser);
app.delete("/users/:id", deleteUser);

//endpoints tasks
app.get("/tasks", getAllTasks);
app.post("/tasks", createTasks);
app.put("/tasks/:id", editTask);
app.delete("/tasks/:id", deleteTask);

//endpoints tasks dos users
app.get("/userTasks", getAllUserTasks);
app.post("/userTasks", createUserTask);
app.delete("/task/:taskId/user/:userId", deleteUserTask);
