const express = require("express");
const { authMiddleware, roleCheck } = require("../middlewares/auth");
const adminCtrl = require("../controllers/adminController");

const router = express.Router();

// all admin routes require admin role
router.use(authMiddleware, roleCheck(["admin"]));

router.post("/users", adminCtrl.createUser);
router.get("/users", adminCtrl.listUsers);

router.post("/approval-flows", adminCtrl.createApprovalFlow);
router.get("/approval-flows", adminCtrl.listApprovalFlows);

module.exports = router;
