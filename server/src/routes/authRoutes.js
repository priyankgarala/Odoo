import express from "express";
const router = express.Router();

import { createUser, loginUser } from "../controllers/userController.js";
// Signup -> creates company + admin user
router.post("/signup", createUser);

// Login -> returns JWT + user info
router.post("/login", loginUser);

export default router;
