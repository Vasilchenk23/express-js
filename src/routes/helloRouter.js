import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello Maks" });
});

export default routes;
