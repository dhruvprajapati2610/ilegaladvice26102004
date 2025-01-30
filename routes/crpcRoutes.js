const express = require("express");
const { getCrpcSection } = require("../controllers/crpcController");

const router = express.Router();

router.get("/crpclist", (req, res) => {
  res.render("crpclist.ejs");
});
router.get("/crpc", getCrpcSection);

module.exports = router;
