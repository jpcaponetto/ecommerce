import { Router } from "express";

const socketProductRouter = Router();

socketProductRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

socketProductRouter.get("/products", (req, res) => {
  res.render("formProduct");
});

export default socketProductRouter;
