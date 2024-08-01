import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";

//Ruta para poder loguearse o registrarse
router.post(
  "/signup",
  [verifySignup.checkDuplicatedUser, verifySignup.checkRolesExisted],
  authController.signUp
);

//Ruta para ingresar
router.post("/signin", authController.signIn);

export default router;
