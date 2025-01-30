const express = require("express");
const { getAllDowrySectionsJSON, getAllDowrySections, searchDowrySections, getDowrySection } = require("../controllers/dowryController");

const router = express.Router();

router.get("/dowry_sections", getAllDowrySections);
router.get("/dowry_sections/noSearchTerm", getAllDowrySectionsJSON);
router.get("/dowry_section", getDowrySection);
router.get("/dowry_sections/search", searchDowrySections);

module.exports = router;