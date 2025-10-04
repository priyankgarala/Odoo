import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getPendingApprovals, decideApproval } from "../controllers/approvalController.js";

const router = express.Router();

// Managers/Admins: view & approve/reject
router.get("/pending", authenticate, authorizeRoles("Manager", "Admin"), getPendingApprovals);

router.post("/:expenseId/decide", authenticate, authorizeRoles("Manager", "Admin"), decideApproval);

export default router;
