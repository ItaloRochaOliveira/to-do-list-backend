import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [userExist] = await db("users").where("id", idToDelete);

    if (!userExist) {
      res.status(400);
      throw new Error("User inexistente!");
    }

    await db("users").del().where("id", idToDelete);

    res.status(200).send({ message: "Usuário deletado com sucesso!" });
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
