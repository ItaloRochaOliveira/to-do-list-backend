import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await db("users");

    if (!result.length) {
      res.send(400);
      throw new Error("Ainda não há usuários gravados.");
    }

    res.status(200).send({ message: "Pong!", result });
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
