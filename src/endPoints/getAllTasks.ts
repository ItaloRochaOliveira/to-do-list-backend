import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const result = await db("tasks").select("tasks.*");

    if (!result.length) {
      res.send(400);
      throw new Error("Ainda não há tasks gravadas.");
    }

    res.status(200).send(result);
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
