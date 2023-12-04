import { Router } from "express";
import {
  checkPassword,
  createPayload,
  createUser,
  findEmail,
} from "../dao/userAdapater.js";
import bcrypt from "bcrypt";

const sessionsRouter = Router();
sessionsRouter.post("/sessions/register", async (req, res) => {
  const { body } = req;
  const { password } = body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  body.password = hash;

  try {
    const user = await createUser(body);
    res.redirect("/login");
  } catch (error) {
    res.json(error.message);
  }
});

sessionsRouter.post("/sessions/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findEmail(email);
    if (user) {
      const check = bcrypt.compareSync(password, user.password);
      if (check) {
        const payload = createPayload(user);
        req.session.user = payload;
        res.redirect("/profile");
      }
    }
  } catch (error) {}
});

sessionsRouter.get("/sessions/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/login");
    }
  });
});

export default sessionsRouter;
