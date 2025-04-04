const express = require("express");
const { isuAuthenticated } = require("../middleware/authMiddleware.js");
const {
  loadAdminPage,
  getNotVerifiedLawyers,
  approveLawyer,
  declineLawyer,
  getNotVerifiedClients,
  approveClient,
  declineClient,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get("/", isuAuthenticated, loadAdminPage);
router.get("/notVerifiedLawyers", getNotVerifiedLawyers);
router.post("/approveLawyer/:id", approveLawyer);
router.post("/declineLawyer/:id", declineLawyer);
router.get("/notVerifiedClients", getNotVerifiedClients);
router.post("/approveClient/:id", approveClient);
router.post("/declineClient/:id", declineClient);

module.exports = router;
