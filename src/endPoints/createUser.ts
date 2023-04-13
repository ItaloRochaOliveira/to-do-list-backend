import express, { Request, Response } from "express";
import { db } from "../database/knex";

export const createUser = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string | undefined;
    const name = req.body.name as string | undefined;
    const email = req.body.email as string | undefined;
    const password = req.body.password as string | undefined;

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

    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("name tem que ser tipo string");
      }
      if (!name.length) {
        res.status(400);
        throw new Error("name tem que ter mais de um caracter");
      }
    }

    if (email !== undefined) {
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("email tem que ser tipo string");
      }
      if (!email.length) {
        res.status(400);
        throw new Error("email tem que ter mais de um caracter");
      }
    }

    if (password !== undefined) {
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("password tem que ser tipo string");
      }
      if (!password.length) {
        res.status(400);
        throw new Error("password tem que ter mais de um caracter");
      }
    }

    const [user] = await db("users").where("id", id).orWhere("email", email);

    if (user) {
      res.status(400);
      throw new Error("Usuário já existe");
    }

    const newUser = {
      id,
      name,
      email,
      password,
    };

    await db("users").insert(newUser);

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
