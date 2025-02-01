const express = require("express");
const { isuAuthenticated } = require("../middleware/authMiddleware.js");
const {
  loadAdminPage,
  getNotVerifiedLawyers,
  approveLawyer,
  declineLawyer,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get("/", isuAuthenticated, loadAdminPage);
router.get("/notVerifiedLawyers", getNotVerifiedLawyers);
router.post("/approveLawyer/:id", approveLawyer);
router.post("/declineLawyer/:id", declineLawyer);

module.exports = router;
