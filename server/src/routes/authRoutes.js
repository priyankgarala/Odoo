import express from "express";
const router = express.Router();

import { signup, login } from "../controllers/authController.js";

// Signup -> creates company + admin user
router.post("/signup", signup);

// Login -> returns JWT + user info
router.post("/login", login);

export default router;
