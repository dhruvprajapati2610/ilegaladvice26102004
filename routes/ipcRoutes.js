const express = require("express");
const {
  getAllIPC,
  getIPCSection,
  searchIPC,
} = require("../controllers/ipcController.js");

const router = express.Router();

router.get("/allipc", getAllIPC);
router.get("/ipc", getIPCSection);
router.get("/search-ipc", searchIPC);

module.exports = router;
