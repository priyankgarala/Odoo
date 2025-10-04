import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createExpense, getExpenses, getExpenseById } from "../controllers/expenseController.js";

const router = express.Router();

// Employee: submit expense
router.post("/", authenticate, authorizeRoles("Employee"), createExpense);

// Employee & Managers/Admins: view expenses
router.get("/", authenticate, authorizeRoles("Employee", "Manager", "Admin"), getExpenses);
router.get("/:id", authenticate, authorizeRoles("Employee", "Manager", "Admin"), getExpenseById);

export default router;
