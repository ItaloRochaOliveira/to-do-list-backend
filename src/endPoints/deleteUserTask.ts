import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const deleteUserTask = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const [usersTasksExist] = await db("users_tasks")
      .where("user_id", userId)
      .andWhere("task_id", taskId);

    if (!usersTasksExist) {
      res.status(400);
      throw new Error("task relacionada a user inexistente!");
    }

    await db("users_tasks")
      .del()
      .where("user_id", userId)
      .andWhere("task_id", taskId);

    res.status(200).send({ message: "Task de usuário deletado com sucesso!" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
};
