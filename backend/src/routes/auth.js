import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = Router();

// POST /register
router.post("/register", registerUser);

// POST /login
router.post("/login", loginUser);

export default router;
