import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const createUserTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.body.taskId as string | undefined;
    const userId = req.body.userId as string | undefined;

    if (taskId !== undefined) {
      if (typeof taskId !== "string") {
        res.status(400);
        throw new Error("taskId tem que ser tipo string");
      }
      if (!taskId.length) {
        res.status(400);
        throw new Error("taskId tem que ter mais de um caracter");
      }
    }

    if (userId !== undefined) {
      if (typeof userId !== "string") {
        res.status(400);
        throw new Error("userId tem que ser tipo string");
      }
      if (!userId.length) {
        res.status(400);
        throw new Error("userId tem que ter mais de um caracter");
      }
    }

    const [user] = await db("users").where("id", userId);

    if (!user) {
      res.status(400);
      throw new Error("Usuário não existe");
    }

    const [task] = await db("tasks").where("id", taskId);

    if (!task) {
      res.status(400);
      throw new Error("Task não existe");
    }

    const [userTask] = await db("users_tasks")
      .where("task_id", taskId)
      .orWhere("user_id", userId);

    if (userTask) {
      res.status(400);
      throw new Error("Usuário já tem a task na sua agenda");
    }

    const newUserTask = {
      user_id: userId,
      task_id: taskId,
    };

    await db("users_tasks").insert(newUserTask);

    res.status(200).send({ message: "Task do usuário criado com sucesso!" });
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
