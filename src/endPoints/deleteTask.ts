import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [taskExist] = await db("tasks").where("id", idToDelete);

    if (!taskExist) {
      res.status(400);
      throw new Error("Task inexistente!");
    }

    await db("tasks").del().where("id", idToDelete);

    res.status(200).send({ message: "Task deletado com sucesso!" });
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
