import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getAllUsers, createUser, updateUserRole } from "../controllers/userController.js";

const router = express.Router();

// Only Admin can create and view users
router.use(authenticate);
router.use(authorizeRoles("Admin"));

router.get("/", getAllUsers);           // Get all users in company
router.post("/", createUser);           // Create Employee / Manager
router.patch("/:id/role", updateUserRole); // Change user role

export default router;
