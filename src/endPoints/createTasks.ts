import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const createTasks = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string | undefined;
    const title = req.body.title as string | undefined;
    const description = req.body.description as string | undefined;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("id tem que ser tipo string");
      }
      if (!id.length) {
        res.status(400);
        throw new Error("id tem que ter mais de um caracter");
      }
    }

    if (title !== undefined) {
      if (typeof title !== "string") {
        res.status(400);
        throw new Error("title tem que ser tipo string");
      }
      if (!title.length) {
        res.status(400);
        throw new Error("title tem que ter mais de um caracter");
      }
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        res.status(400);
        throw new Error("description tem que ser tipo string");
      }
      if (!description.length) {
        res.status(400);
        throw new Error("description tem que ter mais de um caracter");
      }
    }

    const [task] = await db("tasks").where("id", id);

    if (task) {
      res.status(400);
      throw new Error("task com esse id já existe");
    }

    const newTask = {
      id,
      title,
      description,
      created_at: new Date().toISOString(),
      status: 0,
    };

    await db("tasks").insert(newTask);

    res.status(200).send({ message: "Usuário criado com sucesso!" });
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
