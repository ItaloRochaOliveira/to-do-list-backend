import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const editTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newTitle = req.body.title as string | undefined;
    const newDescription = req.body.description as string | undefined;
    const newStatus = req.body.status as number | undefined;

    if (newTitle !== undefined) {
      if (typeof newTitle !== "string") {
        res.status(400);
        throw new Error("newTitle tem que ser tipo string");
      }
      if (!newTitle.length) {
        res.status(400);
        throw new Error("newTitle tem que ter mais de um caracter");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("newDescription tem que ser tipo string");
      }
      if (!newDescription.length) {
        res.status(400);
        throw new Error("newDescription tem que ter mais de um caracter");
      }
    }

    const [taskExist] = await db("tasks").where("id", id);

    if (!taskExist) {
      res.status(400);
      throw new Error("User inexistente");
    }

    const updateTask = {
      id,
      title: newTitle || taskExist.title,
      description: newDescription || taskExist.description,
      created_at: new Date().toISOString(),
      status: newStatus || taskExist.status,
    };

    await db("tasks").update(updateTask).where("id", id);

    res.status(200).send({ mensage: "User editado com sucesso!" });
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
